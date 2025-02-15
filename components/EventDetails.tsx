import { Calendar, Clock, MapPin } from "lucide-react"

export default function EventDetails({ eventDate }: { eventDate: Date }) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-SG", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Singapore",
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-SG", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Singapore",
    })
  }

  const endTime = new Date(eventDate.getTime() + 2.5 * 60 * 60 * 1000) // Event lasts 2.5 hours

  return (
    <div className="bg-alt-bg p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Event Details</h2>
      <ul className="space-y-4">
        <li className="flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-text" />
          <span>{formatDate(eventDate)}</span>
        </li>
        <li className="flex items-center">
          <Clock className="mr-2 h-5 w-5 text-text" />
          <span>
            {formatTime(eventDate)} - {formatTime(endTime)}
          </span>
        </li>
        <li className="flex items-center">
          <MapPin className="mr-2 h-5 w-5 text-text" />
          <span>STB L01 Training Center</span>
        </li>
      </ul>
      <p className="mt-4">
        Join us for a 2.5-hour unique and fun hands-on experience in making your very own custom mechanical keyboard!
      </p>
    </div>
  )
}

