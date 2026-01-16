import { Link, useParams } from 'react-router-dom'
import RatingStars from '../components/RatingStars.jsx'
import { mockProducts } from '../data/mockProducts.js'
import { useCart } from '../store/cartContext.jsx'
import { formatINR } from '../lib/currency.js'

export default function ProductPage() {
  const { id } = useParams()
  const { addItem } = useCart()

  const product = mockProducts.find((p) => p.id === id)

  if (!product) {
    return (
      <div className="container page">
        <div className="panel">
          <div className="title">Product not found</div>
          <div className="muted">Try going back to the home page.</div>
          <div style={{ marginTop: 12 }}>
            <Link className="btn" to="/">Back to Home</Link>
          </div>
        </div>
      </div>
    )
  }

  const discount = product.mrp && product.mrp > product.price ? Math.round((1 - product.price / product.mrp) * 100) : 0

  return (
    <div className="container page">
      <div className="breadcrumbs">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to={`/?cat=${encodeURIComponent(product.category)}`}>{product.category}</Link>
      </div>

      <div className="product">
        <div className="product-media">
          <img src={product.imageUrl} alt={product.title} />
        </div>

        <div className="product-info">
          <div className="title">{product.title}</div>
          <div className="muted">Brand: <span className="strong">{product.brand}</span></div>

          <div className="row" style={{ marginTop: 8 }}>
            <RatingStars rating={product.rating} />
            <span className="muted">({product.reviewsCount.toLocaleString()} reviews)</span>
          </div>

          <div className="price-block">
            <div className="price big">{formatINR(product.price)}</div>
            {product.mrp ? <div className="mrp">{formatINR(product.mrp)}</div> : null}
            {discount ? <div className="discount">Save {discount}%</div> : null}
          </div>

          <div className="panel" style={{ marginTop: 16 }}>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <div>
                <div className="muted">Delivery</div>
                <div className="strong">Tomorrow</div>
              </div>
              <div>
                <div className="muted">Stock</div>
                <div className={product.stock <= 10 ? 'strong danger' : 'strong'}>
                  {product.stock <= 10 ? 'Low stock' : 'In stock'}
                </div>
              </div>
            </div>

            <div className="row" style={{ marginTop: 12, gap: 10 }}>
              <button className="btn primary" type="button" onClick={() => addItem(product, 1)}>
                Add to Cart
              </button>
              <Link className="btn" to="/cart">Go to Cart</Link>
            </div>
          </div>

          <div className="panel" style={{ marginTop: 16 }}>
            <div className="title" style={{ fontSize: 16 }}>About this item</div>
            <ul className="list">
              <li>High-quality listing data and UI state</li>
              <li>Built for microservices + JWT auth integration</li>
              <li>Supabase storage ready for product images</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
