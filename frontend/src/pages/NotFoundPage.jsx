import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="container page">
      <div className="panel empty">
        <div className="title">Page not found</div>
        <div className="muted">The page you\'re looking for doesn\'t exist.</div>
        <div style={{ marginTop: 12 }}>
          <Link className="btn primary" to="/">Go home</Link>
        </div>
      </div>
    </div>
  )
}
