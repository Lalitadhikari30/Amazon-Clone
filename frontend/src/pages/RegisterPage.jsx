import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function onSubmit(e) {
    e.preventDefault()
    navigate('/signin')
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
          <div className="title">Create account</div>
          <form className="form" onSubmit={onSubmit}>
            <label>
              <div className="label">Your name</div>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />
            </label>
            <label>
              <div className="label">Email</div>
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </label>
            <label>
              <div className="label">Password</div>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </label>

            <button className="btn primary full" type="submit">
              Create your account
            </button>

            <div className="muted" style={{ marginTop: 10, fontSize: 12 }}>
              This is a UI placeholder. Wire it to your Auth microservice `/auth/register` when ready.
            </div>
          </form>
        </div>

        <div className="muted" style={{ marginTop: 12, textAlign: 'center' }}>
          Already have an account? <Link to="/signin">Sign in</Link>
        </div>
      </div>
    </div>
  )
}
