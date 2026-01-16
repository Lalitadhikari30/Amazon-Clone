import { Link } from 'react-router-dom'
import RatingStars from './RatingStars.jsx'
import { formatINR } from '../lib/currency.js'

export default function ProductCard({ product }) {
  const discount = product.mrp && product.mrp > product.price ? Math.round((1 - product.price / product.mrp) * 100) : 0

  return (
    <div className="card">
      <Link className="card-media" to={`/product/${product.id}`}>
        <img src={product.imageUrl} alt={product.title} loading="lazy" />
      </Link>

      <div className="card-body">
        <Link className="card-title" to={`/product/${product.id}`}>{product.title}</Link>

        <div className="card-meta">
          <RatingStars rating={product.rating} />
          <span className="reviews">{product.reviewsCount.toLocaleString()} reviews</span>
        </div>

        <div className="price-row">
          <div className="price">{formatINR(product.price)}</div>
          {product.mrp ? <div className="mrp">{formatINR(product.mrp)}</div> : null}
          {discount ? <div className="discount">-{discount}%</div> : null}
        </div>

        <div className="badge-row">
          {product.prime ? <span className="badge prime">Prime</span> : null}
          {product.stock <= 10 ? <span className="badge low">Low stock</span> : <span className="badge ok">In stock</span>}
        </div>
      </div>
    </div>
  )
}
