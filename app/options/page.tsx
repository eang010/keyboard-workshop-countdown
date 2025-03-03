"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Volume2 } from "lucide-react"
import { FC, useCallback, useState, useEffect, useRef } from 'react'

interface KeycapOption {
  name: string
  image: string
}

interface SwitchOption {
  name: string
  image: string
  type: string
  actuation: string
  travel: string
  force: string
  sound: string
}

const keycapOptions: KeycapOption[] = [
  { name: "Bowser", image: "/image/Bowser.png?height=200&width=200" },
  { name: "Cinnamon Blue", image: "/image/CinnamonBlue.png?height=200&width=200" },
  { name: "Coder", image: "/image/Coder.png?height=200&width=200" },
  { name: "Honey & Milk", image: "/image/honeymilk.png?height=200&width=200" },
  { name: "InitialD", image: "/image/InitialD.png?height=200&width=200" },
  { name: "Mario", image: "/image/Mario.png?height=200&width=200" },
  { name: "Marshmallow", image: "/image/Marshmallow.png?height=200&width=200" },
  { name: "Matcha", image: "/image/Matcha.png?height=200&width=200" },
  { name: "Shimmer", image: "/image/Shimmer.png?height=200&width=200" },
  { name: "Weather", image: "/image/Weather.png?height=200&width=200" },
]

const switchOptions: SwitchOption[] = [
  {
    name: "Black",
    image: "/image/Black.png?height=150&width=150",
    type: "Linear (Heavy)",
    actuation: "2mm",
    travel: "4mm",
    force: "45g",
    sound: "/audio/black-switch.mp3"
  },
  {
    name: "Blue",
    image: "/image/Blue.png?height=150&width=150",
    type: "Clicky (Loud)",
    actuation: "2.2mm",
    travel: "4mm",
    force: "50g",
    sound: "/audio/blue-switch.mp3"
  },
  {
    name: "Brown",
    image: "/image/Brown.png?height=150&width=150",
    type: "Tactile",
    actuation: "2mm",
    travel: "4mm",
    force: "55g",
    sound: "/audio/brown-switch.mp3"
  },
  {
    name: "Red",
    image: "/image/Red.png?height=150&width=150",
    type: "Linear",
    actuation: "1.8mm",
    travel: "3.6mm",
    force: "50g",
    sound: "/audio/red-switch.mp3"
  },
  {
    name: "White",
    image: "/image/White.png?height=150&width=150",
    type: "Linear (Light)",
    actuation: "2mm",
    travel: "4mm",
    force: "45g",
    sound: "/audio/white-switch.mp3"
  },
]

const OptionsPage: FC = () => {
  const [playingSound, setPlayingSound] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.switch-image-container')) {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          setPlayingSound(null);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const playSound = useCallback((soundUrl: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click from bubbling to document
    
    // Stop previous sound if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Play new sound
    const audio = new Audio(soundUrl);
    audioRef.current = audio;
    setPlayingSound(soundUrl);
    
    audio.play()
      .catch(error => console.error('Error playing sound:', error))
      .finally(() => {
        audio.addEventListener('ended', () => {
          setPlayingSound(null);
          audioRef.current = null;
        });
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-main-bg to-main-bg-end text-text p-8">
      <Link href="/" className="inline-flex items-center mb-8 text-lg hover:underline">
        <ArrowLeft className="mr-2" /> Back to Home
      </Link>
      <h1 className="text-4xl font-bold mb-12 text-center">Keyboard Customization Options</h1>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">Keycap Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {keycapOptions.map((keycap, index) => (
            <div key={index} className="bg-alt-bg p-6 rounded-lg shadow-lg">
              <Image
                src={keycap.image || "/placeholder.svg"}
                alt={keycap.name}
                width={200}
                height={200}
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-center">{keycap.name}</h3>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6">Switch Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {switchOptions.map((switchOption, index) => (
            <div key={index} className="bg-alt-bg p-6 rounded-lg shadow-lg">
              <div 
                className="cursor-pointer transition-transform hover:scale-105 relative switch-image-container"
                onClick={(e) => playSound(switchOption.sound, e)}
              >
                <Image
                  src={switchOption.image || "/placeholder.svg"}
                  alt={switchOption.name}
                  width={150}
                  height={150}
                  className="mx-auto mb-4"
                />
                {playingSound === switchOption.sound && (
                  <div className="absolute top-0 right-0 bg-alt-bg rounded-full p-2 animate-pulse">
                    <Volume2 className="w-6 h-6 text-accent animate-bounce" />
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">{switchOption.name}</h3>
              <ul className="space-y-2">
                <li>
                  <strong>Type:</strong> {switchOption.type}
                </li>
                <li>
                  <strong>Actuation:</strong> {switchOption.actuation}
                </li>
                <li>
                  <strong>Travel:</strong> {switchOption.travel}
                </li>
                <li>
                  <strong>Force:</strong> {switchOption.force}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default OptionsPage

