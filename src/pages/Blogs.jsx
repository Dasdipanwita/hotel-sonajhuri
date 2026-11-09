import { motion } from 'framer-motion'
import { Calendar, ArrowRight, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useScrollReveal, fadeUp, staggerContainer } from '../hooks/useScrollReveal'

const blogs = [
  {
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80&auto=format&fit=crop',
    date: 'October 15, 2024',
    title: 'Top 5 Things to Do in New Digha',
    excerpt: 'New Digha is more than just a beach destination. Discover the best activities, local food, and hidden gems this coastal town has to offer.',
    readTime: '5 min read',
  },
  {
    img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80&auto=format&fit=crop',
    date: 'September 28, 2024',
    title: 'Why Hotel Sonajhuri is Perfect for Your Family Vacation',
    excerpt: "Planning a family trip to the sea? Here's why Hotel Sonajhuri in New Digha should be your top choice for a comfortable and memorable stay.",
    readTime: '4 min read',
  },
  {
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80&auto=format&fit=crop',
    date: 'September 10, 2024',
    title: 'Exploring the Coastal Cuisine of West Bengal',
    excerpt: 'From fresh seafood to traditional Bengali sweets, the food culture of coastal West Bengal is a gastronomic journey worth taking.',
    readTime: '6 min read',
  },
  {
    img: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800&q=80&auto=format&fit=crop',
    date: 'August 22, 2024',
    title: 'The Best Season to Visit New Digha',
    excerpt: 'Wondering when to plan your Digha trip? We break down the best times to visit based on weather, crowd, and local festivals.',
    readTime: '4 min read',
  },
  {
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80&auto=format&fit=crop',
    date: 'August 05, 2024',
    title: 'A Complete Guide to Digha: History, Culture & Travel Tips',
    excerpt: 'Everything you need to know before visiting Digha — from its rich history and culture to practical travel tips and local highlights.',
    readTime: '8 min read',
  },
  {
    img: 'https://images.unsplash.com/photo-1565073182887-6bcefbe225b1?w=800&q=80&auto=format&fit=crop',
    date: 'July 18, 2024',
    title: 'Rooftop Dining and Poolside Relaxation at Hotel Sonajhuri',
    excerpt: 'Discover the joy of rooftop dining with sea breeze and a refreshing dip in our rooftop pool — a signature experience at Sonajhuri.',
    readTime: '3 min read',
  },
]

function PageHero() {
  return (
    <section className="relative h-72 md:h-96 flex items-center justify-center overflow-hidden bg-[#07182B]">
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=70&auto=format&fit=crop"
        alt="Blogs"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="relative z-10 text-center px-4">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-label mb-3">
          Our Blog
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-white font-bold"
          style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}
        >
          Travel Stories &amp; Tips
        </motion.h1>
        <div className="gold-line mx-auto mt-4" />
      </div>
    </section>
  )
}

function BlogCard({ blog, index }) {
  const { ref, isInView } = useScrollReveal()

  return (
    <motion.article
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.08 }}
      className="bg-[#07182B] rounded-2xl overflow-hidden border border-white/5 hover:border-[#c9a84c]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-black/40 group flex flex-col"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={blog.img}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07182B]/70 to-transparent" />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-4 text-white/40 text-xs mb-4">
          <span className="flex items-center gap-1.5">
            <Calendar size={12} className="text-[#c9a84c]" />
            {blog.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={12} className="text-[#c9a84c]" />
            {blog.readTime}
          </span>
        </div>
        <h3 className="text-white font-semibold text-lg mb-3 leading-snug flex-1" style={{ fontFamily: 'Playfair Display, serif' }}>
          {blog.title}
        </h3>
        <p className="text-white/55 text-sm leading-relaxed mb-5">{blog.excerpt}</p>
        <button className="flex items-center gap-2 text-[#c9a84c] text-sm font-medium hover:text-[#d4b870] transition-colors duration-200 group/btn mt-auto">
          Read More <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.article>
  )
}

export default function Blogs() {
  const { ref: titleRef, isInView: titleIn } = useScrollReveal()

  return (
    <main>
      <PageHero />

      <section className="bg-[#10243A] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={titleRef}
            variants={fadeUp}
            initial="hidden"
            animate={titleIn ? 'visible' : 'hidden'}
            className="text-center mb-14"
          >
            <p className="section-label mb-3">Latest Posts</p>
            <div className="gold-line mx-auto" />
            <h2 className="text-white font-bold"
                style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Travel Stories &amp; Guides
            </h2>
            <p className="text-white/60 max-w-xl mx-auto mt-4 text-sm leading-relaxed">
              Explore our travel guides, local tips, and hotel stories to make the most of your New Digha visit.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {blogs.map((blog, i) => (
              <BlogCard key={blog.title} blog={blog} index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
