import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../store/authContext.jsx'

export default function RequireAuth({ children }) {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="container page">
        <div className="panel">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace state={{ from: location.pathname + location.search }} />
  }

  return children
}
