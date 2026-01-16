const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

async function request(path, options = {}) {
  if (!API_BASE_URL) {
    const err = new Error('API base URL is not configured. Set VITE_API_BASE_URL in your env.')
    err.code = 'NO_API_BASE_URL'
    throw err
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  if (!res.ok) {
    let payload = null
    try {
      payload = await res.json()
    } catch {
      payload = null
    }

    const err = new Error(payload?.message || `Request failed: ${res.status}`)
    err.status = res.status
    err.payload = payload
    throw err
  }

  if (res.status === 204) return null
  return res.json()
}

export const api = {
  auth: {
    login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
    register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
    me: (token) => request('/auth/me', { headers: { Authorization: `Bearer ${token}` } }),
  },
  catalog: {
    listProducts: (query = '') => request(`/catalog/products${query}`),
    getProduct: (id) => request(`/catalog/products/${id}`),
  },
  orders: {
    myOrders: (token) => request('/orders/my', { headers: { Authorization: `Bearer ${token}` } }),
    createOrder: (token, body) => request('/orders', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify(body) }),
  },
}
