"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Volume2, X, Info, MapPin } from "lucide-react"
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
    actuation: "2.2mm",
    travel: "4.0mm",
    force: "50gf",
    sound: "/audio/black-switch.mp3"
  },
  {
    name: "Blue",
    image: "/image/Blue.png?height=150&width=150",
    type: "Clicky",
    actuation: "2.2mm",
    travel: "4.0mm",
    force: "50gf",
    sound: "/audio/blue-switch.mp3"
  },
  {
    name: "Brown",
    image: "/image/Brown.png?height=150&width=150",
    type: "Tactile",
    actuation: "2.0mm",
    travel: "3.0mm",
    force: "40gf",
    sound: "/audio/brown-switch.mp3"
  },
  {
    name: "Red",
    image: "/image/Red.png?height=150&width=150",
    type: "Linear",
    actuation: "2.0mm",
    travel: "3.7mm",
    force: "45gf",
    sound: "/audio/red-switch.mp3"
  },
  {
    name: "White",
    image: "/image/White.png?height=150&width=150",
    type: "Linear (Light)",
    actuation: "2.0mm",
    travel: "3.7mm",
    force: "37gf",
    sound: "/audio/white-switch.mp3"
  },
]

interface ExpandedImageProps {
  src: string
  alt: string
  onClose: () => void
}

const ExpandedImage: FC<ExpandedImageProps> = ({ src, alt, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 hidden md:flex items-center justify-center" onClick={onClose}>
      <div className="relative max-w-4xl max-h-[80vh] bg-alt-bg p-4 rounded-lg" onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-alt-bg rounded-full p-2 hover:bg-accent transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <Image
          src={src}
          alt={alt}
          width={800}
          height={800}
          className="w-auto h-auto object-contain rounded-lg"
        />
        <h3 className="text-2xl font-semibold text-center mt-4">{alt}</h3>
      </div>
    </div>
  )
}

interface InfoBoxProps {
  children: React.ReactNode
}

const InfoBox: FC<InfoBoxProps> = ({ children }) => {
  return (
    <div className="flex flex-col bg-accent/5 border border-accent/10 rounded-2xl p-4 mb-6 shadow-sm">
      <div className="flex items-center gap-2">
        <Info className="w-5 h-5 text-accent/70 flex-shrink-0" />
        <p className="text-lg text-accent/80">{children}</p>
      </div>
    </div>
  )
}

interface SwitchDetailsModalProps {
  switchOption: SwitchOption
  onClose: () => void
}

const SwitchDetailsModal: FC<SwitchDetailsModalProps> = ({ switchOption, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="relative max-w-md w-full bg-alt-bg p-6 rounded-lg mx-4" onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-alt-bg rounded-full p-2 hover:bg-accent transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <h3 className="text-2xl font-semibold mb-4">{switchOption.name} Switch Details</h3>
        <ul className="space-y-3">
          <li>
            <strong>Type:</strong> {switchOption.type}
          </li>
          <li>
            <strong>Pre-Travel:</strong> {switchOption.actuation}
          </li>
          <li>
            <strong>Total Travel:</strong> {switchOption.travel}
          </li>
          <li>
            <strong>Actuation Force:</strong> {switchOption.force}
          </li>
        </ul>
      </div>
    </div>
  )
}

const OptionsPage: FC = () => {
  const [playingSound, setPlayingSound] = useState<string | null>(null);
  const [expandedKeycap, setExpandedKeycap] = useState<KeycapOption | null>(null);
  const [selectedSwitch, setSelectedSwitch] = useState<SwitchOption | null>(null);
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
        <ArrowLeft className="mr-2" /> Back ⌛
      </Link>
      <h1 className="text-4xl font-bold mb-12 text-center">Keyboard Customization Options</h1>

      {expandedKeycap && (
        <ExpandedImage
          src={expandedKeycap.image}
          alt={expandedKeycap.name}
          onClose={() => setExpandedKeycap(null)}
        />
      )}

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">Keycap Options</h2>
        <InfoBox>For illustration purposes only 🎨</InfoBox>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {keycapOptions.map((keycap, index) => (
            <div key={index} className="bg-alt-bg p-6 rounded-lg shadow-lg">
              <div 
                className="cursor-pointer transition-transform hover:scale-105 relative hidden md:block"
                onClick={() => setExpandedKeycap(keycap)}
              >
                <Image
                  src={keycap.image || "/placeholder.svg"}
                  alt={keycap.name}
                  width={200}
                  height={200}
                  className="mx-auto mb-4"
                />
              </div>
              <div className="md:hidden">
                <Image
                  src={keycap.image || "/placeholder.svg"}
                  alt={keycap.name}
                  width={200}
                  height={200}
                  className="mx-auto mb-4"
                />
              </div>
              <h3 className="text-xl font-semibold text-center">{keycap.name}</h3>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6">Switch Options</h2>
        <InfoBox>
          Click image for sound 🔊
          <br />
        </InfoBox>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {switchOptions.map((switchOption, index) => (
            <div key={index} className="bg-alt-bg p-6 rounded-lg shadow-lg flex flex-col">
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
              <div className="flex flex-col flex-1 justify-between">
                <h3 className="text-xl font-semibold mb-4 text-center">{switchOption.name}</h3>
                <div className="flex justify-center">
                  <button
                    onClick={() => setSelectedSwitch(switchOption)}
                    className="w-fit px-6 py-1.5 bg-main-bg hover:bg-main-bg text-accent rounded-full transition-all hover:scale-105 shadow-md"
                  >
                    {switchOption.type}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedSwitch && (
        <SwitchDetailsModal
          switchOption={selectedSwitch}
          onClose={() => setSelectedSwitch(null)}
        />
      )}
    </div>
  )
}

export default OptionsPage

