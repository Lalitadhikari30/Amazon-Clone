import { useAuth } from '../store/authContext.jsx'

export default function AccountPage() {
  const { user, role } = useAuth()

  return (
    <div className="container page">
      <div className="page-head">
        <div>
          <div className="title">Your Account</div>
          <div className="muted">Role: {role}</div>
        </div>
      </div>

      <div className="panel">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div>
            <div className="muted">Name</div>
            <div className="strong">{user?.name || '—'}</div>
          </div>
          <div>
            <div className="muted">Email</div>
            <div className="strong">{user?.email || '—'}</div>
          </div>
        </div>

        <div className="muted" style={{ marginTop: 12 }}>
          This page is ready for address book, profile edits, and admin links.
        </div>
      </div>
    </div>
  )
}
