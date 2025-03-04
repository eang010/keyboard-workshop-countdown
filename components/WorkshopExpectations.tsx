import { CheckCircle } from "lucide-react"

export default function WorkshopExpectations() {
  const expectations = [
    "Introduction to mechanical keyboards",
    "Tips & tricks for building a mechanical keyboard",
    "Assemble your custom keyboard",
    "Test and fine-tune your creation",
    "Take home your custom mechanical keyboard; 68-keys keyboard (Tri-mode)",
  ]

  return (
    <div className="bg-alt-bg p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">What to Expect</h2>
      <ul className="space-y-2">
        {expectations.map((item, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="mr-2 h-5 w-5 text-text mt-1 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4">
        No prior experience is necessary. Our expert instructors will guide you through every step of the process.
      </p>
    </div>
  )
}

