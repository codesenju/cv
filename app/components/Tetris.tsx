'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { X, Play, Pause, RotateCw } from 'lucide-react'

const BOARD_WIDTH = 10
const BOARD_HEIGHT = 20
const SKILLS = ['AWS', 'K8s', 'Docker', 'Python', 'Java', 'JS', 'DevOps', 'SRE', 'Git', 'Linux', 'React', 'Node']

const TETROMINOS = {
  I: { shape: [[1,1,1,1]], color: '#1f2937', textColor: '#ffffff' },
  O: { shape: [[1,1],[1,1]], color: '#374151', textColor: '#ffffff' },
  T: { shape: [[0,1,0],[1,1,1]], color: '#4b5563', textColor: '#ffffff' },
  S: { shape: [[0,1,1],[1,1,0]], color: '#6b7280', textColor: '#ffffff' },
  Z: { shape: [[1,1,0],[0,1,1]], color: '#9ca3af', textColor: '#000000' },
  J: { shape: [[1,0,0],[1,1,1]], color: '#d1d5db', textColor: '#000000' },
  L: { shape: [[0,0,1],[1,1,1]], color: '#e5e7eb', textColor: '#000000' }
}

export default function Tetris({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [board, setBoard] = useState(() => Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null)))
  const [currentPiece, setCurrentPiece] = useState<any>(null)
  const [nextPiece, setNextPiece] = useState<any>(null)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [lines, setLines] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout>()

  const playSound = (type: 'move' | 'rotate' | 'line' | 'drop') => {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    const frequencies = { move: 200, rotate: 300, line: 500, drop: 150 }
    osc.frequency.value = frequencies[type]
    gain.gain.setValueAtTime(0.1, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.1)
  }

  const createPiece = () => {
    const pieces = Object.keys(TETROMINOS)
    const randomPiece = pieces[Math.floor(Math.random() * pieces.length)]
    const randomSkill = SKILLS[Math.floor(Math.random() * SKILLS.length)]
    return {
      shape: TETROMINOS[randomPiece as keyof typeof TETROMINOS].shape,
      color: TETROMINOS[randomPiece as keyof typeof TETROMINOS].color,
      textColor: TETROMINOS[randomPiece as keyof typeof TETROMINOS].textColor,
      skill: randomSkill,
      x: Math.floor(BOARD_WIDTH / 2) - 1,
      y: 0
    }
  }

  const isValidMove = (piece: any, newX: number, newY: number, newShape?: number[][]) => {
    const shape = newShape || piece.shape
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const boardX = newX + x
          const boardY = newY + y
          if (boardX < 0 || boardX >= BOARD_WIDTH || boardY >= BOARD_HEIGHT || (boardY >= 0 && board[boardY][boardX])) {
            return false
          }
        }
      }
    }
    return true
  }

  const rotatePiece = (shape: number[][]) => {
    return shape[0].map((_, i) => shape.map(row => row[i]).reverse())
  }

  const placePiece = () => {
    if (!currentPiece) return
    const newBoard = [...board]
    currentPiece.shape.forEach((row: number[], y: number) => {
      row.forEach((cell: number, x: number) => {
        if (cell && currentPiece.y + y >= 0) {
          newBoard[currentPiece.y + y][currentPiece.x + x] = {
            color: currentPiece.color,
            textColor: currentPiece.textColor,
            skill: currentPiece.skill
          }
        }
      })
    })
    
    const clearedLines = newBoard.filter(row => row.some(cell => cell === null))
    const linesCleared = BOARD_HEIGHT - clearedLines.length
    
    if (linesCleared > 0) {
      playSound('line')
      setLines(prev => prev + linesCleared)
      setScore(prev => prev + linesCleared * 100 * level)
      setLevel(Math.floor((lines + linesCleared) / 10) + 1)
      
      const emptyRows = Array(linesCleared).fill(null).map(() => Array(BOARD_WIDTH).fill(null))
      setBoard([...emptyRows, ...clearedLines])
    } else {
      setBoard(newBoard)
    }
    
    playSound('drop')
    setCurrentPiece(nextPiece)
    setNextPiece(createPiece())
  }

  const movePiece = useCallback((dx: number, dy: number) => {
    if (!currentPiece || gameOver) return
    const newX = currentPiece.x + dx
    const newY = currentPiece.y + dy
    
    if (isValidMove(currentPiece, newX, newY)) {
      setCurrentPiece(prev => ({ ...prev, x: newX, y: newY }))
      if (dx !== 0) playSound('move')
    } else if (dy > 0) {
      placePiece()
    }
  }, [currentPiece, board, gameOver])

  const rotatePieceHandler = useCallback(() => {
    if (!currentPiece || gameOver) return
    const rotated = rotatePiece(currentPiece.shape)
    if (isValidMove(currentPiece, currentPiece.x, currentPiece.y, rotated)) {
      setCurrentPiece(prev => ({ ...prev, shape: rotated }))
      playSound('rotate')
    }
  }, [currentPiece, board, gameOver])

  const startGame = () => {
    setBoard(Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null)))
    setCurrentPiece(createPiece())
    setNextPiece(createPiece())
    setScore(0)
    setLevel(1)
    setLines(0)
    setGameOver(false)
    setIsPlaying(true)
  }

  const pauseGame = () => {
    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    if (isPlaying && !gameOver) {
      intervalRef.current = setInterval(() => {
        movePiece(0, 1)
      }, Math.max(50, 500 - (level - 1) * 50))
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [isPlaying, gameOver, level, movePiece])

  useEffect(() => {
    if (currentPiece && !isValidMove(currentPiece, currentPiece.x, currentPiece.y)) {
      setGameOver(true)
      setIsPlaying(false)
    }
  }, [currentPiece, board])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return
      e.preventDefault()
      switch (e.key) {
        case 'ArrowLeft': movePiece(-1, 0); break
        case 'ArrowRight': movePiece(1, 0); break
        case 'ArrowDown': movePiece(0, 1); break
        case 'ArrowUp': rotatePieceHandler(); break
        case ' ': pauseGame(); break
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isOpen, movePiece, rotatePieceHandler])

  const renderBoard = () => {
    const displayBoard = board.map(row => [...row])
    
    if (currentPiece) {
      currentPiece.shape.forEach((row: number[], y: number) => {
        row.forEach((cell: number, x: number) => {
          if (cell && currentPiece.y + y >= 0 && currentPiece.y + y < BOARD_HEIGHT) {
            displayBoard[currentPiece.y + y][currentPiece.x + x] = {
              color: currentPiece.color,
              textColor: currentPiece.textColor,
              skill: currentPiece.skill,
              active: true
            }
          }
        })
      })
    }
    
    return displayBoard.map((row, y) => (
      <div key={y} className="flex">
        {row.map((cell, x) => {
          const isActive = cell?.active
          const skill = cell?.skill || ''
          const color = cell?.color || 'transparent'
          const textColor = cell?.textColor || '#ffffff'
          
          return (
            <div
              key={x}
              className={`w-6 h-6 border flex items-center justify-center text-[8px] font-bold overflow-hidden ${
                isActive ? 'animate-pulse shadow-lg border-white/50' : 'border-gray-800'
              }`}
              style={{ 
                backgroundColor: color,
                color: cell ? textColor : 'transparent',
                textShadow: cell ? (textColor === '#ffffff' ? '0 0 2px rgba(0,0,0,0.8)' : '0 0 2px rgba(255,255,255,0.8)') : 'none',
                borderColor: cell ? 'rgba(156,163,175,0.8)' : 'rgba(75,85,99,0.3)'
              }}
            >
              {skill && (
                <span className="transform scale-90 leading-none whitespace-nowrap">
                  {skill.length > 5 ? skill.slice(0,4) : skill}
                </span>
              )}
            </div>
          )
        })}
      </div>
    ))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="glass-card rounded-2xl p-6 max-w-md w-full mx-4 bounce-card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold gradient-text">🎮 Skills Tetris</h2>
          <button onClick={onClose} className="p-2 hover:bg-primary/10 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="bg-black p-2 rounded-lg mb-4 border-2 border-gray-600" style={{backgroundColor: '#000000'}}>
              {renderBoard()}
            </div>
            
            <div className="flex gap-2 mb-4">
              <button
                onClick={startGame}
                className="flex-1 px-4 py-2 bg-primary/20 hover:bg-primary/30 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Play size={16} /> Start
              </button>
              <button
                onClick={pauseGame}
                disabled={!currentPiece}
                className="flex-1 px-4 py-2 bg-primary/20 hover:bg-primary/30 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Pause size={16} /> Pause
              </button>
              <button
                onClick={rotatePieceHandler}
                disabled={!currentPiece || gameOver}
                className="px-4 py-2 bg-primary/20 hover:bg-primary/30 rounded-lg transition-colors disabled:opacity-50"
              >
                <RotateCw size={16} />
              </button>
            </div>
          </div>
          
          <div className="w-24 space-y-4">
            <div className="glass-card p-3 rounded-lg text-center">
              <div className="text-xs text-muted-foreground">Score</div>
              <div className="font-bold text-primary">{score}</div>
            </div>
            <div className="glass-card p-3 rounded-lg text-center">
              <div className="text-xs text-muted-foreground">Level</div>
              <div className="font-bold text-primary">{level}</div>
            </div>
            <div className="glass-card p-3 rounded-lg text-center">
              <div className="text-xs text-muted-foreground">Lines</div>
              <div className="font-bold text-primary">{lines}</div>
            </div>
            {nextPiece && (
              <div className="glass-card p-3 rounded-lg">
                <div className="text-xs text-muted-foreground mb-2 text-center">Next</div>
                <div className="flex justify-center">
                  <div className="grid gap-0" style={{gridTemplateColumns: `repeat(${Math.max(...nextPiece.shape.map((row: number[]) => row.length))}, 1fr)`}}>
                    {nextPiece.shape.map((row: number[], y: number) => 
                      row.map((cell: number, x: number) => (
                        <div
                          key={`${y}-${x}`}
                          className="w-3 h-3 border border-gray-700"
                          style={{
                            backgroundColor: cell ? nextPiece.color : 'transparent',
                            borderColor: cell ? 'rgba(156,163,175,0.5)' : 'transparent'
                          }}
                        />
                      ))
                    )}
                  </div>
                </div>
                <div className="text-center mt-1">
                  <span className="text-[8px] font-bold" style={{color: nextPiece.textColor}}>
                    {nextPiece.skill}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {gameOver && (
          <div className="text-center mt-4 p-4 bg-red-500/20 rounded-lg border border-red-500/30">
            <div className="text-red-400 font-bold">Game Over!</div>
            <div className="text-sm text-muted-foreground mt-1">Final Score: {score}</div>
          </div>
        )}
        
        <div className="text-xs text-muted-foreground mt-4 text-center">
          Use arrow keys to move, ↑ to rotate, Space to pause
        </div>
      </div>
    </div>
  )
}