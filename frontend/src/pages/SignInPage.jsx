import { useMemo, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../store/authContext.jsx'

export default function SignInPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [params] = useSearchParams()
  const { login } = useAuth()

  const nextFromQuery = params.get('next')
  const nextFromState = location.state?.from
  const next = useMemo(() => nextFromQuery || nextFromState || '/', [nextFromQuery, nextFromState])

  const [email, setEmail] = useState('demo@amazonclone.dev')
  const [password, setPassword] = useState('demo123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate(next)
    } catch (err) {
      setError(err?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container page auth">
      <div className="auth-card">
        <div className="auth-logo">
          <span className="logo-mark">a</span>
          <span className="logo-text">mazon</span>
          <span className="logo-dot">.clone</span>
        </div>

        <div className="panel">
          <div className="title">Sign in</div>
          <form className="form" onSubmit={onSubmit}>
            <label>
              <div className="label">Email</div>
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </label>
            <label>
              <div className="label">Password</div>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </label>

            {error ? <div className="alert">{error}</div> : null}

            <button className="btn primary full" type="submit" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'}
            </button>

            <div className="muted" style={{ marginTop: 10, fontSize: 12 }}>
              If your backend is not configured, demo sign-in will be used automatically.
            </div>
          </form>
        </div>

        <div className="panel" style={{ marginTop: 12 }}>
          <div className="muted" style={{ fontSize: 12 }}>
            By continuing, you agree to the clone\'s Conditions of Use and Privacy Notice.
          </div>
        </div>

        <div className="muted" style={{ marginTop: 12, textAlign: 'center' }}>
          New here? <Link to="/register">Create your account</Link>
        </div>
      </div>
    </div>
  )
}
