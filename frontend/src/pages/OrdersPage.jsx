import { Link } from 'react-router-dom'
import { useAuth } from '../store/authContext.jsx'

export default function OrdersPage() {
  const { user } = useAuth()

  return (
    <div className="container page">
      <div className="page-head">
        <div>
          <div className="title">Your Orders</div>
          <div className="muted">Signed in as {user?.email || 'user'}</div>
        </div>
      </div>

      <div className="panel empty">
        <div className="title">No orders yet</div>
        <div className="muted">Once your Orders microservice is connected, completed checkouts will appear here.</div>
        <div style={{ marginTop: 12 }}>
          <Link className="btn primary" to="/">Start shopping</Link>
        </div>
      </div>
    </div>
  )
}
