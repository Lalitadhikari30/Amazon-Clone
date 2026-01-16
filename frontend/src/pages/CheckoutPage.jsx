import { Link } from 'react-router-dom'
import { useCart } from '../store/cartContext.jsx'
import { formatINR } from '../lib/currency.js'

export default function CheckoutPage() {
  const { subtotal, quantity } = useCart()

  return (
    <div className="container page">
      <div className="page-head">
        <div>
          <div className="title">Checkout</div>
          <div className="muted">Shipping & payment are UI placeholders (wire to services next).</div>
        </div>
      </div>

      <div className="page-split">
        <div className="panel">
          <div className="title" style={{ fontSize: 16 }}>1. Delivery address</div>
          <div className="muted" style={{ marginTop: 6 }}>Add address management after Auth service integration.</div>

          <div style={{ height: 12 }} />

          <div className="title" style={{ fontSize: 16 }}>2. Payment method</div>
          <div className="muted" style={{ marginTop: 6 }}>Integrate Stripe/Razorpay later, or keep as COD in portfolio.</div>

          <div style={{ height: 12 }} />

          <div className="title" style={{ fontSize: 16 }}>3. Review items</div>
          <div className="muted" style={{ marginTop: 6 }}>Cart items review will be expanded in the next step.</div>

          <div style={{ marginTop: 14 }}>
            <Link className="btn" to="/cart">Back to cart</Link>
          </div>
        </div>

        <aside className="sidebar">
          <div className="panel">
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <div className="muted">Items</div>
              <div className="strong">{quantity}</div>
            </div>
            <div className="row" style={{ justifyContent: 'space-between', marginTop: 8 }}>
              <div className="muted">Order total</div>
              <div className="strong">{formatINR(subtotal)}</div>
            </div>
            <button className="btn primary full" type="button" style={{ marginTop: 12 }} disabled>
              Place your order (coming soon)
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}
