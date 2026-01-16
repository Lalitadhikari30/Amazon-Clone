import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './layout/AppLayout.jsx'
import RequireAuth from './routes/RequireAuth.jsx'
import HomePage from './pages/HomePage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import CartPage from './pages/CartPage.jsx'
import SignInPage from './pages/SignInPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import OrdersPage from './pages/OrdersPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import AccountPage from './pages/AccountPage.jsx'
import DealsPage from './pages/DealsPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/orders"
          element={(
            <RequireAuth>
              <OrdersPage />
            </RequireAuth>
          )}
        />
        <Route
          path="/checkout"
          element={(
            <RequireAuth>
              <CheckoutPage />
            </RequireAuth>
          )}
        />
        <Route
          path="/account"
          element={(
            <RequireAuth>
              <AccountPage />
            </RequireAuth>
          )}
        />

        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
