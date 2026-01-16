import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../store/cartContext.jsx'
import { useAuth } from '../store/authContext.jsx'
import { formatINR } from '../lib/currency.js'

export default function CartPage() {
  const navigate = useNavigate()
  const { items, subtotal, quantity, setQuantity, removeItem } = useCart()
  const { isAuthenticated } = useAuth()

  function checkout() {
    if (!isAuthenticated) {
      navigate('/signin?next=/checkout')
      return
    }
    navigate('/checkout')
  }

  return (
    <div className="container page">
      <div className="page-split">
        <div>
          <div className="title">Shopping Cart</div>
          <div className="muted">{quantity} items</div>

          {items.length === 0 ? (
            <div className="panel empty" style={{ marginTop: 14 }}>
              <div className="title">Your cart is empty</div>
              <div className="muted">Browse products and add them to your cart.</div>
              <div style={{ marginTop: 12 }}>
                <Link className="btn primary" to="/">Continue shopping</Link>
              </div>
            </div>
          ) : (
            <div className="cart-list">
              {items.map((it) => (
                <div key={it.id} className="cart-item">
                  <img className="cart-img" src={it.imageUrl} alt={it.title} />
                  <div className="cart-info">
                    <Link className="cart-title" to={`/product/${it.id}`}>{it.title}</Link>
                    <div className="muted">{it.brand} · {it.category}</div>
                    <div className="row" style={{ marginTop: 8, justifyContent: 'space-between' }}>
                      <div className="price">{formatINR(it.price)}</div>
                      <div className="row" style={{ gap: 10 }}>
                        <select value={it.quantity} onChange={(e) => setQuantity(it.id, e.target.value)}>
                          {Array.from({ length: 10 }).map((_, idx) => (
                            <option key={idx + 1} value={idx + 1}>Qty {idx + 1}</option>
                          ))}
                        </select>
                        <button className="linklike danger" type="button" onClick={() => removeItem(it.id)}>Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="sidebar">
          <div className="panel">
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <div className="muted">Subtotal ({quantity} items)</div>
              <div className="strong">{formatINR(subtotal)}</div>
            </div>
            <button className="btn primary full" type="button" disabled={items.length === 0} onClick={checkout} style={{ marginTop: 12 }}>
              Proceed to checkout
            </button>
            <div className="muted" style={{ marginTop: 10, fontSize: 12 }}>
              Checkout flow is UI-first; wire it to your Orders microservice when ready.
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
