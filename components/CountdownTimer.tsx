"use client"

import { useState, useEffect } from "react"
import Confetti from 'react-confetti'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface WindowSize {
  width: number
  height: number
}

export default function CountdownTimer({ targetDate, windowSize }: { targetDate: Date, windowSize: WindowSize }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isTimeUp, setIsTimeUp] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        }
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft()
      setTimeLeft(newTimeLeft)
      
      // Check if timer just hit zero
      if (!isTimeUp && newTimeLeft.days === 0 && newTimeLeft.hours === 0 && 
          newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
        setIsTimeUp(true)
        setShowConfetti(true)
      }
    }, 1000)
    
    setTimeLeft(calculateTimeLeft()) // Initial calculation

    return () => clearInterval(timer)
  }, [targetDate, isTimeUp])

  return (
    <>
      {showConfetti && (
        <>
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={50}
            recycle={true}
            confettiSource={{x: 0, y: 0, w: windowSize.width * 0.2, h: windowSize.height}}
            opacity={0.6}
          />
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={50}
            recycle={true}
            confettiSource={{x: windowSize.width * 0.8, y: 0, w: windowSize.width * 0.2, h: windowSize.height}}
            opacity={0.6}
          />
        </>
      )}
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .pulse-animation {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
      <div className={`bg-alt-bg p-8 rounded-lg shadow-lg max-w-4xl mx-auto ${isTimeUp ? 'pulse-animation' : ''}`}>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">{isTimeUp ? "It's Time!" : "Coming Soon!"}</h2>
        <div className="grid grid-cols-4 gap-2 md:gap-6 text-center">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="bg-main-bg p-3 md:p-6 rounded-md">
              <div className="text-3xl md:text-5xl font-bold mb-1 md:mb-2">{value}</div>
              <div className="text-sm md:text-xl uppercase">{unit}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

