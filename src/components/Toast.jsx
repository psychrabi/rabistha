import { useEffect } from 'react'
import { Info, X } from 'lucide-react'

export default function Toast({ message, isVisible, onClose }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (

    <div className="fixed top-18 right-4 z-50">
      <div className="alert alert-info text-lg font-bold" role="alert">
        <Info />
        <span>{message}</span>
        <button onClick={onClose} className="ml-2 hover:text-gray-200" type="button">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
} 