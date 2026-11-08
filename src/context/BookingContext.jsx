import { createContext, useContext, useState } from 'react'

const BookingContext = createContext()

export function BookingProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [initialData, setInitialData] = useState(null)

  const openBooking = (data = null) => {
    setInitialData(data)
    setIsOpen(true)
  }

  const closeBooking = () => {
    setIsOpen(false)
    setInitialData(null)
  }

  return (
    <BookingContext.Provider value={{ isOpen, openBooking, closeBooking, initialData }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return context
}
