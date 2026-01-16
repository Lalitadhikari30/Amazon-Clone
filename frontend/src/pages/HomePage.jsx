import { Link, useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { mockProducts } from '../data/mockProducts.js'
import { formatINR } from '../lib/currency.js'

function normalize(s) {
  return String(s || '').toLowerCase().trim()
}

export default function HomePage() {
  const [params] = useSearchParams()
  const q = params.get('q') || ''
  const cat = params.get('cat') || ''

  const nq = normalize(q)
  const ncat = normalize(cat)

  const products = mockProducts
    .filter((p) => (!ncat ? true : normalize(p.category) === ncat))
    .filter((p) => {
      if (!nq) return true
      return normalize(p.title).includes(nq) || normalize(p.brand).includes(nq) || normalize(p.category).includes(nq)
    })

  return (
    <div className="amz-home">
      <section className="amz-hero" aria-label="Hero">
        <div className="amz-hero-inner">
          <div className="amz-hero-slide">
            <div className="amz-hero-overlay" aria-hidden="true" />
            <div className="amz-hero-controls" aria-hidden="true">
              <button type="button" className="amz-hero-arrow left">‹</button>
              <button type="button" className="amz-hero-arrow right">›</button>
            </div>
          </div>

          <div className="amz-hero-cards">
            <div className="amz-card">
              <div className="amz-card-title">Deals related to your views</div>
              <div className="amz-card-grid">
                {mockProducts.slice(0, 4).map((p) => (
                  <Link key={p.id} className="amz-tile" to={`/product/${p.id}`}>
                    <img src={p.imageUrl} alt={p.title} />
                    <div className="amz-tile-caption">Republic Day Deal</div>
                  </Link>
                ))}
              </div>
              <Link className="amz-card-link" to="/deals">See all deals</Link>
            </div>

            <div className="amz-card">
              <div className="amz-card-title">Shop by brand | Deals on top smartphones</div>
              <div className="amz-card-grid">
                {mockProducts.filter((p) => p.category === 'Electronics').slice(0, 4).map((p) => (
                  <Link key={p.id} className="amz-tile" to={`/product/${p.id}`}>
                    <img src={p.imageUrl} alt={p.title} />
                    <div className="amz-tile-caption">Starting {formatINR(p.price)}</div>
                  </Link>
                ))}
              </div>
              <Link className="amz-card-link" to="/?cat=Electronics">Shop now</Link>
            </div>

            <div className="amz-card">
              <div className="amz-card-title">Garden & Outdoors recommendations for you</div>
              <div className="amz-card-grid">
                {mockProducts.filter((p) => p.category === 'Home & Kitchen').slice(0, 4).map((p) => (
                  <Link key={p.id} className="amz-tile" to={`/product/${p.id}`}>
                    <img src={p.imageUrl} alt={p.title} />
                    <div className="amz-tile-caption">Republic Day Deal</div>
                  </Link>
                ))}
              </div>
              <Link className="amz-card-link" to="/?cat=Home%20%26%20Kitchen">See more</Link>
            </div>

            <div className="amz-card">
              <div className="amz-card-title">Up to 75% off | Electronics & Accessories</div>
              <div className="amz-card-feature">
                <img src={mockProducts[1]?.imageUrl} alt="Featured" />
              </div>
              <Link className="amz-card-link" to="/?cat=Electronics">See more</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container page">
        <div className="page-head">
          <div>
            <div className="title">{cat ? cat : 'Featured'} Products</div>
            <div className="muted">{products.length} results {q ? `for "${q}"` : ''}</div>
          </div>
          <div className="chips">
            <Link className={`chip ${!cat ? 'active' : ''}`} to={q ? `/?q=${encodeURIComponent(q)}` : '/'}>All</Link>
            <Link className={`chip ${cat === 'Electronics' ? 'active' : ''}`} to="/?cat=Electronics">Electronics</Link>
            <Link className={`chip ${cat === 'Home & Kitchen' ? 'active' : ''}`} to="/?cat=Home%20%26%20Kitchen">Home & Kitchen</Link>
            <Link className={`chip ${cat === 'Fashion' ? 'active' : ''}`} to="/?cat=Fashion">Fashion</Link>
            <Link className={`chip ${cat === 'Books' ? 'active' : ''}`} to="/?cat=Books">Books</Link>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="panel empty">
            <div className="title">No results</div>
            <div className="muted">Try a different search term or category.</div>
          </div>
        ) : (
          <div className="grid">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
