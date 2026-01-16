import { useEffect } from 'react'
import { X, UserCircle, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../store/authContext.jsx'

function DrawerItem({ children, to = '#', rightChevron = false, onClick }) {
  return (
    <Link className="amz-drawer-item" to={to} onClick={onClick}>
      <span>{children}</span>
      {rightChevron ? <ChevronRight size={16} className="amz-drawer-chev" /> : null}
    </Link>
  )
}

export default function AllMenuDrawer({ open, onClose }) {
  const { isAuthenticated, user } = useAuth()

  useEffect(() => {
    if (!open) return

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKeyDown(e) {
      if (e.key === 'Escape') onClose?.()
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="amz-drawer-root" role="dialog" aria-modal="true">
      <button type="button" className="amz-drawer-overlay" aria-label="Close menu" onClick={onClose} />

      <aside className="amz-drawer" aria-label="All menu">
        <div className="amz-drawer-top">
          <div className="amz-drawer-top-left">
            <UserCircle size={22} />
            <div className="amz-drawer-top-text">
              <div className="amz-drawer-top-hello">
                Hello{isAuthenticated ? `, ${user?.name || 'User'}` : ', sign in'}
              </div>
            </div>
          </div>

          <button type="button" className="amz-drawer-close" aria-label="Close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="amz-drawer-body">
          <div className="amz-drawer-section">
            <div className="amz-drawer-title">Trending</div>
            <DrawerItem rightChevron>Best Sellers</DrawerItem>
            <DrawerItem rightChevron>New Releases</DrawerItem>
            <DrawerItem rightChevron>Movers and Shakers</DrawerItem>
          </div>

          <div className="amz-drawer-section">
            <div className="amz-drawer-title">Digital Content and Devices</div>
            <DrawerItem rightChevron>Echo & Alexa</DrawerItem>
            <DrawerItem rightChevron>Fire TV</DrawerItem>
            <DrawerItem rightChevron>Kindle E-Readers & eBooks</DrawerItem>
            <DrawerItem rightChevron>Audible Audiobooks</DrawerItem>
            <DrawerItem rightChevron>Amazon Prime Video</DrawerItem>
            <DrawerItem rightChevron>Amazon Prime Music</DrawerItem>
          </div>

          <div className="amz-drawer-section">
            <div className="amz-drawer-title">Shop by Category</div>
            <DrawerItem rightChevron to="/?cat=Electronics" onClick={onClose}>Mobiles, Computers</DrawerItem>
            <DrawerItem rightChevron to="/?cat=Electronics" onClick={onClose}>TV, Appliances, Electronics</DrawerItem>
            <DrawerItem rightChevron to="/?cat=Fashion" onClick={onClose}>Men's Fashion</DrawerItem>
            <DrawerItem rightChevron to="/?cat=Fashion" onClick={onClose}>Women's Fashion</DrawerItem>
            <DrawerItem>See all</DrawerItem>
          </div>

          <div className="amz-drawer-section">
            <div className="amz-drawer-title">Programs & Features</div>
            <DrawerItem rightChevron>Gift Cards & Mobile Recharges</DrawerItem>
            <DrawerItem rightChevron>Amazon Launchpad</DrawerItem>
            <DrawerItem rightChevron>Amazon Business</DrawerItem>
            <DrawerItem rightChevron>Handloom and Handicrafts</DrawerItem>
            <DrawerItem>See all</DrawerItem>
          </div>

          <div className="amz-drawer-section">
            <div className="amz-drawer-title">Help & Settings</div>
            <DrawerItem rightChevron to="/account" onClick={onClose}>Your Account</DrawerItem>
            <DrawerItem rightChevron>Customer Service</DrawerItem>
            <DrawerItem to="/signin" onClick={onClose}>Sign in</DrawerItem>
          </div>
        </div>
      </aside>
    </div>
  )
}
