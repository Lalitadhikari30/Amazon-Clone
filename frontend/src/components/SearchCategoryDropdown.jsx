import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

const OPTIONS = [
  { label: 'All Categories', value: 'All' },
  { label: 'Alexa Skills', value: 'All' },
  { label: 'Amazon Devices', value: 'Electronics' },
  { label: 'Amazon Fashion', value: 'Fashion' },
  { label: 'Amazon Fresh', value: 'All' },
  { label: 'Amazon Pharmacy', value: 'All' },
  { label: 'Appliances', value: 'Electronics' },
  { label: 'Apps & Games', value: 'All' },
  { label: 'Audible Audiobooks', value: 'Books' },
  { label: 'Baby', value: 'All' },
  { label: 'Beauty', value: 'All' },
  { label: 'Books', value: 'Books' },
  { label: 'Car & Motorbike', value: 'All' },
  { label: 'Clothing & Accessories', value: 'Fashion' },
  { label: 'Collectibles', value: 'All' },
  { label: 'Computers & Accessories', value: 'Electronics' },
  { label: 'Deals', value: 'All' },
  { label: 'Electronics', value: 'Electronics' },
  { label: 'Furniture', value: 'Home & Kitchen' },
  { label: 'Garden & Outdoors', value: 'Home & Kitchen' },
]

export default function SearchCategoryDropdown({ value, label, onChange }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  const buttonLabel = useMemo(() => {
    if (label) return label === 'All Categories' ? 'All' : label
    const v = value || 'All'
    return v === 'All' ? 'All' : v
  }, [label, value])

  useEffect(() => {
    if (!open) return

    function onDocMouseDown(e) {
      if (!rootRef.current) return
      if (rootRef.current.contains(e.target)) return
      setOpen(false)
    }

    function onKeyDown(e) {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onDocMouseDown)
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('mousedown', onDocMouseDown)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  function pick(opt) {
    onChange?.(opt)
    setOpen(false)
  }

  return (
    <div ref={rootRef} className="amz-cat">
      <button type="button" className="amz-cat-btn" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <span className="amz-cat-label">{buttonLabel}</span>
        <ChevronDown size={14} />
      </button>

      {open ? (
        <div className="amz-cat-panel" role="listbox" aria-label="All categories">
          {OPTIONS.map((opt) => (
            <button
              key={opt.label}
              type="button"
              className={`amz-cat-item ${opt.label === (label || (value === 'All' ? 'All Categories' : value)) ? 'active' : ''}`}
              onClick={() => pick(opt)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
