import { Link } from 'react-router-dom'

export default function DealsPage() {
  return (
    <div className="container page">
      <div className="page-head">
        <div>
          <div className="title">Today\'s Deals</div>
          <div className="muted">Placeholder deals page (wire to your catalog/promotions service).</div>
        </div>
      </div>

      <div className="panel empty">
        <div className="title">Deals coming soon</div>
        <div className="muted">Add a Promotions microservice and connect it here.</div>
        <div style={{ marginTop: 12 }}>
          <Link className="btn primary" to="/">Back to shopping</Link>
        </div>
      </div>
    </div>
  )
}
