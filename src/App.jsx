import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [points, setPoints] = useState([])
  const [history, setHistory] = useState([])

  const handleUndo = (event) => {
    event.preventDefault()
    setPoints(points => {
      const newPoints = [...points]
      const deleted = newPoints.pop()
      setHistory(history => {
        const newHistory = deleted ? [...history, deleted] : [...history]
        return newHistory
      })
      return newPoints
    })
  }

  const handleRedo = (event) => {
    event.preventDefault()
    setHistory(history => {
      const newHistory = [...history]
      const deleted = newHistory.pop()
      setPoints(points => {
        const newPoints = deleted ? [...points, deleted] : [...points]
        return newPoints
      })

      return newHistory
    })
  }

  useEffect(() => {

    const handleClick = (event) => {
      if (event.target.className === 'main-canvas') {
        const { clientX, clientY } = event
        const position = { x: clientX, y: clientY }

        setPoints(points => {
          const newPoints = [...points, position]
          return newPoints
        })
      }
    }
    window.addEventListener('click', handleClick)

    return () => window.removeEventListener('click', handleClick)

  }, [])

  return (
    <>
      <div className="options">
        <button disabled={!points.length} onClick={handleUndo}>Undo</button>
        <button disabled={!history.length} onClick={handleRedo}>Redo</button>
      </div>
      <div className='main-canvas'>
        {points.map((point, index) => (
          <div key={index}
            className='circle'
            style={{ transform: `translate(${point.x}px, ${point.y}px)` }}
          >
          </div>
        ))}
      </div>
    </>
  )
}

export default App
