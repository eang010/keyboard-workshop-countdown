"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import CountdownTimer from "../components/CountdownTimer"
import EventDetails from "../components/EventDetails"
import WorkshopExpectations from "../components/WorkshopExpectations"
import AudioPlayer from "../components/AudioPlayer"
import { ChevronDown, Keyboard, Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Confetti from 'react-confetti'

export default function Home() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  const [isExpanded, setIsExpanded] = useState(false)
  const eventDate = new Date("2025-03-21T19:11:00+08:00")

  useEffect(() => {
    // Update window size
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial size
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main className="min-h-screen text-text flex flex-col">
      <AudioPlayer />
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-3">
            <span className="block">IS Division FY24</span>
            <span className="block">Team Bonding Event</span>
          </h1>
          <h2 className="text-xl mb-2 text-text/80 flex items-center justify-center gap-2">
            Custom mechanical keyboard workshop
            <Keyboard className="w-5 h-5" />
          </h2>
          <p className="text-sm mb-8 flex gap-2 justify-center">
            <span className="bg-alt-bg px-3 py-1 rounded-full text-text/60">#ISWellness</span>
          </p>
          <CountdownTimer targetDate={eventDate} windowSize={windowSize} />
          <Link
              href="/options"
              className="inline-flex items-center mt-8 bg-alt-bg text-text px-6 py-3 rounded-lg shadow-md hover:bg-opacity-80 transition-colors duration-200"
            >
              <Search className="mr-2" />
              View Keyboard Options
            </Link>
        </div>
      </div>
      <div className="text-center pb-4">
        {!isExpanded && (
          <p className="text-sm text-text/60 mb-1">More info</p>
        )}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-alt-bg p-2 rounded-full hover:bg-opacity-80 transition-colors duration-200"
          aria-label={isExpanded ? "Hide event details" : "Show event details"}
        >
          <ChevronDown
            className={`w-8 h-8 transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
          />
        </button>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: "auto", 
              opacity: 1,
              transition: { duration: 0.3 }
            }}
            exit={{ height: 0, opacity: 0 }}
            onAnimationComplete={() => {
              window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth'
              })
            }}
            className="overflow-hidden"
          >
            <div className="container mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
              <EventDetails eventDate={eventDate} />
              <WorkshopExpectations />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="mt-auto p-4 text-center text-sm text-gray-500">
        Created by <a 
          href="https://www.linkedin.com/in/emilyang20/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-gray-700 underline"
        >
          Emily Ang
        </a>
      </div>
    </main>
  )
}

