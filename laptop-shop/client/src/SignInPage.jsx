import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Eye,
  EyeOff,
  Laptop,
  LockKeyhole,
  Mail,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
} from 'lucide-react'
import './App.css'

function SignInPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: '',
    password: '',
    remember: true,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const errors = useMemo(() => {
    const nextErrors = {}

    if (!form.email.trim()) {
      nextErrors.email = 'Email is required'
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = 'Enter a valid email'
    }

    if (!form.password) {
      nextErrors.password = 'Password is required'
    } else if (form.password.length < 6) {
      nextErrors.password = 'Use at least 6 characters'
    }

    return nextErrors
  }, [form.email, form.password])

  const isValid = Object.keys(errors).length === 0

  function updateField(event) {
    const { name, type, checked, value } = event.target
    setSubmitted(false)
    setLoginError('')
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
    setLoginError('')

    if (!isValid) {
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:9000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('customer', JSON.stringify(data.customer))
        navigate('/home')
        return
      }

      const data = await response.json()
      setLoginError(data.message || 'No account found')
    } catch {
      setLoginError('Unable to connect to the server')
    } finally {
      setIsLoading(false)
    }
  }

  function handleDemoLogin() {
    setForm((current) => ({
      ...current,
      email: 'nissan@gmail.com',
      password: '11111111',
    }))
    setSubmitted(false)
    setLoginError('')
  }

  function handleBrandClick(event) {
    event.preventDefault()
    if (!isLoading) {
      navigate('/')
    }
  }

  function handleForgotPassword(event) {
    event.preventDefault()
    setLoginError('Password reset is not available yet')
  }

  function handleRegister(event) {
    event.preventDefault()
    setLoginError('Account registration is not available yet')
  }

  function handleCartClick() {
    if (!isLoading) {
      navigate('/home')
    }
  }

  return (
    <main className="login-shell">
      <section className="shop-panel" aria-label="Laptop shop highlights">
        <nav className="topbar" aria-label="Store navigation">
          <a className="brand" href="/" onClick={handleBrandClick}>
            <span className="brand-mark">
              <Laptop size={22} strokeWidth={2.2} />
            </span>
            LaptopShop
          </a>
          <button
            className="cart-button"
            type="button"
            aria-label="Open cart"
            onClick={handleCartClick}
          >
            <ShoppingBag size={19} />
            <span>3</span>
          </button>
        </nav>

        <div className="showcase">
          <div className="device" aria-hidden="true">
            <div className="screen">
              <div className="screen-header">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="product-lines">
                <strong>UltraBook Pro 14</strong>
                <span>Intel Core Ultra • 32GB RAM • OLED</span>
                <div className="stock-row">
                  <span>Ready to ship</span>
                  <b>$1,499</b>
                </div>
              </div>
            </div>
            <div className="keyboard"></div>
          </div>

          <div className="shop-copy">
            <span className="eyebrow">
              <Sparkles size={16} />
              Customer portal
            </span>
            <h1>Sign in and keep your setup moving.</h1>
            <p>
              Track laptop orders, compare saved picks, manage warranties, and
              checkout faster on your next upgrade.
            </p>
          </div>

          <div className="trust-strip" aria-label="Customer benefits">
            <span>
              <ShieldCheck size={17} />
              Secure checkout
            </span>
            <span>2 year warranty</span>
            <span>Fast delivery</span>
          </div>
        </div>
      </section>

      <section className="login-panel" aria-labelledby="login-title">
        <div className="login-card">
          <div className="login-heading">
            <span className="mini-logo">
              <LockKeyhole size={22} />
            </span>
            <div>
              <p>Welcome back</p>
              <h2 id="login-title">Customer Login</h2>
            </div>
          </div>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <label className="field">
              <span>Email address</span>
              <div className="input-wrap">
                <Mail size={19} />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={updateField}
                  placeholder="customer@example.com"
                  autoComplete="email"
                  aria-invalid={submitted && Boolean(errors.email)}
                />
              </div>
              {submitted && errors.email ? (
                <small className="error">{errors.email}</small>
              ) : null}
            </label>

            <label className="field">
              <span>Password</span>
              <div className="input-wrap">
                <LockKeyhole size={19} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={updateField}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  aria-invalid={submitted && Boolean(errors.password)}
                />
                <button
                  className="icon-button"
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
              {submitted && errors.password ? (
                <small className="error">{errors.password}</small>
              ) : null}
            </label>

            <div className="form-row">
              <label className="check">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={updateField}
                />
                Remember me
              </label>
              <a href="/forgot-password" onClick={handleForgotPassword}>
                Forgot password?
              </a>
            </div>

            {loginError ? (
              <div className="login-alert" role="alert">
                {loginError}
              </div>
            ) : null}

            <button className="submit-button" type="submit" disabled={isLoading}>
              {isLoading ? 'Checking account...' : 'Sign in'}
            </button>

            <button
              className="demo-button"
              type="button"
              onClick={handleDemoLogin}
              disabled={isLoading}
            >
              Use Nissan test account
            </button>
          </form>

          <p className="signup-text">
            New customer?{' '}
            <a href="/register" onClick={handleRegister}>
              Create an account
            </a>
          </p>
        </div>
      </section>
    </main>
  )
}

export default SignInPage
