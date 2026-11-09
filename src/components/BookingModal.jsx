import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Users, BedDouble, Phone, User, CheckCircle2, Sparkles, ShieldCheck, ChevronRight } from 'lucide-react'
import { useBooking } from '../context/BookingContext'

const roomTypes = [
  { id: 'super-deluxe', name: 'Super Deluxe Room', price: '₹2,800', capacity: '2-3 Guests' },
  { id: 'deluxe', name: 'Deluxe Room', price: '₹2,200', capacity: '2 Guests' },
  { id: 'standard', name: 'Standard Room', price: '₹1,500', capacity: '1-2 Guests' },
  { id: 'triple-sharing', name: 'Triple Sharing Room', price: '₹3,200', capacity: '3-4 Guests' },
]

export default function BookingModal() {
  const { isOpen, closeBooking, initialData } = useBooking()

  const [step, setStep] = useState(1) // 1: Reservation Details, 2: Confirmation
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState(() => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const dayAfter = new Date(today)
    dayAfter.setDate(dayAfter.getDate() + 2)
    const formatDate = (d) => d.toISOString().split('T')[0]

    return {
      name: '',
      phone: '',
      email: '',
      roomType: 'Super Deluxe Room',
      checkIn: formatDate(tomorrow),
      checkOut: formatDate(dayAfter),
      adults: '2',
      children: '0',
      specialRequests: '',
    }
  })
  const [confirmationCode, setConfirmationCode] = useState('')

  // Sync initialData if provided when opening
  useEffect(() => {
    if (initialData?.roomType) {
      setFormData((prev) => ({ ...prev, roomType: initialData.roomType }))
    }
  }, [initialData])

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate luxury reservation processing
    setTimeout(() => {
      const randomCode = 'HSJ-' + Math.floor(100000 + Math.random() * 900000)
      setConfirmationCode(randomCode)
      setLoading(false)
      setStep(2)
    }, 1200)
  }

  const selectedRoom = roomTypes.find((r) => r.name === formData.roomType) || roomTypes[0]

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeBooking}
          className="fixed inset-0 bg-[#07182B]/80 backdrop-blur-md"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-[#07182B] border border-[#c9a84c]/40 rounded-2xl shadow-2xl overflow-hidden my-auto depth-shadow"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Banner */}
          <div className="relative bg-gradient-to-r from-[#10243A] via-[#07182B] to-[#10243A] p-6 border-b border-[#c9a84c]/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles size={14} className="text-[#ffd875]" />
                  <span className="text-[11px] font-semibold text-[#ffd875] uppercase tracking-widest">
                    Direct Booking • Best Rate Guarantee
                  </span>
                </div>
                <h2
                  className="text-white text-xl sm:text-2xl font-bold tracking-wide"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Reserve Your Stay at Hotel Sonajhuri
                </h2>
                <p className="text-white/60 text-xs mt-0.5">New Digha, West Bengal</p>
              </div>

              <button
                onClick={closeBooking}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/15 flex items-center justify-center transition-colors duration-200"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
            {step === 1 ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Room Selection */}
                <div>
                  <label className="block text-white/80 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-2">
                    <BedDouble size={14} className="text-[#ffd875]" /> Select Room Type
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {roomTypes.map((room) => {
                      const isChosen = formData.roomType === room.name
                      return (
                        <div
                          key={room.id}
                          onClick={() => setFormData((p) => ({ ...p, roomType: room.name }))}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-200 flex items-center justify-between ${
                            isChosen
                              ? 'bg-[#10243A] border-[#ffd875] ring-1 ring-[#ffd875] shadow-md'
                              : 'bg-[#10243A]/40 hover:bg-[#10243A]/80 border-white/10'
                          }`}
                        >
                          <div>
                            <div className="text-white text-sm font-medium">{room.name}</div>
                            <div className="text-white/50 text-[11px]">{room.capacity}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-[#ffd875] font-semibold text-sm">{room.price}</div>
                            <div className="text-white/40 text-[10px]">/ night</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Dates & Guests Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/80 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Calendar size={13} className="text-[#ffd875]" /> Check-In Date
                    </label>
                    <input
                      type="date"
                      name="checkIn"
                      required
                      value={formData.checkIn}
                      onChange={handleChange}
                      className="w-full bg-[#10243A] border border-white/15 focus:border-[#ffd875] rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Calendar size={13} className="text-[#ffd875]" /> Check-Out Date
                    </label>
                    <input
                      type="date"
                      name="checkOut"
                      required
                      value={formData.checkOut}
                      onChange={handleChange}
                      className="w-full bg-[#10243A] border border-white/15 focus:border-[#ffd875] rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-colors duration-200"
                    />
                  </div>
                </div>

                {/* Guests */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/80 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Users size={13} className="text-[#ffd875]" /> Adults
                    </label>
                    <select
                      name="adults"
                      value={formData.adults}
                      onChange={handleChange}
                      className="w-full bg-[#10243A] border border-white/15 focus:border-[#ffd875] rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-colors duration-200"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num} className="bg-[#07182B]">
                          {num} {num === 1 ? 'Adult' : 'Adults'}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/80 text-xs font-semibold uppercase tracking-wider mb-2">
                      Children
                    </label>
                    <select
                      name="children"
                      value={formData.children}
                      onChange={handleChange}
                      className="w-full bg-[#10243A] border border-white/15 focus:border-[#ffd875] rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-colors duration-200"
                    >
                      {[0, 1, 2, 3, 4].map((num) => (
                        <option key={num} value={num} className="bg-[#07182B]">
                          {num} {num === 1 ? 'Child' : 'Children'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Guest Contact Details */}
                <div className="space-y-4 pt-2 border-t border-white/10">
                  <div className="text-white/80 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <User size={13} className="text-[#ffd875]" /> Guest Information
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Full Name *"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-[#10243A] border border-white/15 focus:border-[#ffd875] rounded-xl px-4 py-2.5 text-white placeholder-white/40 text-sm outline-none transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="Phone Number * (e.g. 093326-56724)"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-[#10243A] border border-white/15 focus:border-[#ffd875] rounded-xl px-4 py-2.5 text-white placeholder-white/40 text-sm outline-none transition-colors duration-200"
                      />
                    </div>
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address (optional for confirmation)"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#10243A] border border-white/15 focus:border-[#ffd875] rounded-xl px-4 py-2.5 text-white placeholder-white/40 text-sm outline-none transition-colors duration-200"
                    />
                  </div>

                  <div>
                    <textarea
                      name="specialRequests"
                      rows={2}
                      placeholder="Special Requests (e.g., Early check-in, Ground floor, Sea breeze view)"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      className="w-full bg-[#10243A] border border-white/15 focus:border-[#ffd875] rounded-xl px-4 py-2.5 text-white placeholder-white/40 text-sm outline-none transition-colors duration-200 resize-none"
                    />
                  </div>
                </div>

                {/* Price summary & Submit */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-white/70 text-xs">
                    <ShieldCheck size={16} className="text-[#ffd875]" />
                    <span>Pay at hotel on check-in • Free cancellation</span>
                  </div>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-gold-shimmer w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#c9a84c] hover:bg-[#d4b870] text-[#07182B] font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg shadow-[#c9a84c]/25 transition-all duration-300 disabled:opacity-50 cursor-pointer"
                    >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#07182B] border-t-transparent rounded-full animate-spin" />
                        <span>Confirming Reservation...</span>
                      </>
                    ) : (
                      <>
                        <span>Confirm Instant Booking</span>
                        <ChevronRight size={16} />
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            ) : (
              /* Step 2: Instant Booking Confirmation Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-[#ffd875]/20 border border-[#ffd875] flex items-center justify-center mx-auto text-[#ffd875]">
                  <CheckCircle2 size={36} />
                </div>

                <div>
                  <h3
                    className="text-white text-2xl font-bold mb-1"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Booking Request Confirmed!
                  </h3>
                  <p className="text-white/70 text-sm max-w-md mx-auto">
                    Thank you, <span className="text-[#ffd875] font-semibold">{formData.name}</span>. Your stay reservation has been registered with Hotel Sonajhuri.
                  </p>
                </div>

                {/* Booking Summary Ticket */}
                <div className="bg-[#10243A] rounded-xl p-5 border border-[#ffd875]/30 text-left max-w-md mx-auto space-y-3 depth-shadow">
                  <div className="flex justify-between items-center pb-2.5 border-b border-white/10">
                    <span className="text-white/50 text-xs">Booking ID</span>
                    <span className="text-[#ffd875] font-mono font-bold">{confirmationCode}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/60">Room Type:</span>
                    <span className="text-white font-medium">{formData.roomType}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/60">Dates:</span>
                    <span className="text-white font-medium">{formData.checkIn} to {formData.checkOut}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/60">Guests:</span>
                    <span className="text-white font-medium">{formData.adults} Adults, {formData.children} Children</span>
                  </div>
                  <div className="flex justify-between items-center pt-2.5 border-t border-white/10 text-sm">
                    <span className="text-white/60">Total Estimated:</span>
                    <span className="text-[#ffd875] font-bold text-base">{selectedRoom.price} / night</span>
                  </div>
                </div>

                <div className="text-white/60 text-xs max-w-sm mx-auto">
                  Our front desk manager will contact you at <span className="text-white">{formData.phone}</span> shortly to coordinate your arrival.
                </div>

                <div className="flex flex-wrap gap-3 justify-center pt-2">
                  <a
                    href="tel:09332656724"
                    className="inline-flex items-center gap-2 bg-[#c9a84c] hover:bg-[#d4b870] text-[#07182B] font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-md"
                  >
                    <Phone size={15} /> Call Front Desk
                  </a>
                  <button
                    onClick={closeBooking}
                    className="inline-flex items-center gap-2 border border-white/30 hover:border-white text-white text-xs sm:text-sm px-6 py-3 rounded-xl transition-all"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
