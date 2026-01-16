import { Star } from 'lucide-react'

export default function RatingStars({ rating }) {
  const full = Math.floor(rating)
  const half = rating - full >= 0.5

  const stars = Array.from({ length: 5 }).map((_, idx) => {
    const fill = idx < full ? 'currentColor' : 'none'
    const opacity = idx < full ? 1 : 0.35
    return (
      <Star
        key={idx}
        size={16}
        style={{ opacity }}
        strokeWidth={2}
        fill={fill}
      />
    )
  })

  return (
    <div className="rating">
      <div className="stars">{stars}</div>
      {half ? <span className="half">½</span> : null}
    </div>
  )
}
