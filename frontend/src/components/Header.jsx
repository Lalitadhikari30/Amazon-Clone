import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ShoppingCart, Search, MapPin, Menu, ChevronDown } from 'lucide-react'
import { useCart } from '../store/cartContext.jsx'
import { useAuth } from '../store/authContext.jsx'
import AllMenuDrawer from './AllMenuDrawer.jsx'
import SearchCategoryDropdown from './SearchCategoryDropdown.jsx'

export default function Header() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { quantity } = useCart()
  const { isAuthenticated, user, logout } = useAuth()
  const [allOpen, setAllOpen] = useState(false)

  const q = searchParams.get('q') || ''
  const cat = searchParams.get('cat') || ''
  const catLabel = searchParams.get('catLabel') || ''
  const [searchCat, setSearchCat] = useState({ label: 'All Categories', value: 'All' })

  useEffect(() => {
    if (!cat) {
      setSearchCat({ label: 'All Categories', value: 'All' })
      return
    }
    setSearchCat({ label: catLabel || cat, value: cat })
  }, [cat, catLabel])

  function onSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const query = String(form.get('q') || '').trim()
    const category = searchCat.value
    const next = new URLSearchParams()
    if (query) next.set('q', query)
    if (category && category !== 'All') {
      next.set('cat', category)
      if (searchCat.label && searchCat.label !== 'All Categories') next.set('catLabel', searchCat.label)
    }
    const s = next.toString()
    navigate(s ? `/?${s}` : '/')
  }

  return (
    <header className="amz-header">
      <AllMenuDrawer open={allOpen} onClose={() => setAllOpen(false)} />
      <div className="amz-top">
        <div className="amz-top-inner">
          <Link className="amz-logo" to="/" aria-label="Amazon Home">
            <span className="amz-logo-text">amazon</span>
            <span className="amz-logo-in">.in</span>
          </Link>

          <button type="button" className="amz-location" aria-label="Update location">
            <MapPin size={18} />
            <div className="amz-location-text">
              <div className="amz-small">Delivering to Agra 282005</div>
              <div className="amz-strong">Update location</div>
            </div>
          </button>

          <form className="amz-search" onSubmit={onSubmit}>
            <SearchCategoryDropdown value={searchCat.value} label={searchCat.label} onChange={setSearchCat} />
            <input type="hidden" name="cat" value={searchCat.value} />
            <input name="q" defaultValue={q} placeholder="Search Amazon.in" aria-label="Search Amazon" />

            <button type="submit" className="amz-search-btn" aria-label="Search">
              <Search size={20} />
            </button>
          </form>

          <button type="button" className="amz-lang" aria-label="Language">
            <span className="amz-flag">🇮🇳</span>
            <span className="amz-strong">EN</span>
            <ChevronDown size={14} />
          </button>

          {isAuthenticated ? (
            <div className="amz-nav-item">
              <div className="amz-small">Hello, {user?.name || 'User'}</div>
              <button className="amz-strong linklike" type="button" onClick={logout}>Sign Out</button>
            </div>
          ) : (
            <Link className="amz-nav-item" to="/signin">
              <div className="amz-small">Hello, sign in</div>
              <div className="amz-strong">Account & Lists <ChevronDown size={14} /></div>
            </Link>
          )}

          <Link className="amz-nav-item" to="/orders">
            <div className="amz-small">Returns</div>
            <div className="amz-strong">& Orders</div>
          </Link>

          <Link className="amz-cart" to="/cart" aria-label="Cart">
            <div className="amz-cart-icon">
              <span className="amz-cart-count">{quantity}</span>
              <ShoppingCart size={28} />
            </div>
            <div className="amz-strong">Cart</div>
          </Link>
        </div>
      </div>

      <div className="amz-bottom">
        <div className="amz-bottom-inner">
          <button className="amz-all" type="button" aria-label="All" onClick={() => setAllOpen(true)}>
            <Menu size={18} />
            <span className="amz-strong">All</span>
          </button>

          <nav className="amz-links" aria-label="Primary">
            <Link to="#">Fresh</Link>
            <Link to="#">MX Player</Link>
            <Link to="#">Sell</Link>
            <Link to="#">Bestsellers</Link>
            <Link to="#">Mobiles</Link>
            <Link to="/deals">Today\'s Deals</Link>
            <Link to="#">Customer Service</Link>
            <Link to="#">Prime</Link>
            <Link to="#">New Releases</Link>
            <Link to="#">Amazon Pay</Link>
            <Link to="/?cat=Fashion">Fashion</Link>
            <Link to="/?cat=Electronics">Electronics</Link>
          </nav>

          <a className="amz-promo" href="#">Great Republic Day Sale | Live Now</a>
        </div>
      </div>
    </header>
  )
}
