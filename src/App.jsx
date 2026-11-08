import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ScrollProgressBar from './components/ScrollProgressBar'
import SmoothScroll from './components/SmoothScroll'
import BackToTop from './components/BackToTop'
import FloatingActions from './components/FloatingActions'
import BookingModal from './components/BookingModal'
import { BookingProvider } from './context/BookingContext'
import Home from './pages/Home'
import About from './pages/About'
import Rooms from './pages/Rooms'
import Amenities from './pages/Amenities'
import Gallery from './pages/Gallery'
import Blogs from './pages/Blogs'
import Contact from './pages/Contact'

export default function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <SmoothScroll />
        <ScrollToTop />
        <ScrollProgressBar />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/amenities" element={<Amenities />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
        <FloatingActions />
        <BackToTop />
        <BookingModal />
      </BookingProvider>
    </BrowserRouter>
  )
}
