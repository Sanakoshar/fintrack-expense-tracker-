import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../AuthForm.css';

export const AuthForm = () => {
  const { login, register, error, setError } = useContext(AuthContext);

  // Signup page opens first.
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    setError(null);

    if (!isLogin && !name.trim()) {
      setError('Please enter your name.');
      return;
    }

    if (isLogin) {
      login(email.trim(), password);
    } else {
      register(name.trim(), email.trim(), password);
    }
  };

  const switchMode = () => {
    setIsLogin(previous => !previous);
    setError(null);
    setPassword('');
    setShowPassword(false);
  };

  return (
    <main className="ft-auth">
      <div className="ft-auth-glow ft-auth-glow-one" aria-hidden="true" />
      <div className="ft-auth-glow ft-auth-glow-two" aria-hidden="true" />

      <div className="ft-auth-card">
        <section className="ft-brand-panel">
          <div className="ft-logo">
            <span className="ft-logo-icon" aria-hidden="true">
              F
            </span>
            <span>
              FinTrack<span className="ft-logo-dot">.</span>
            </span>
          </div>

          <div className="ft-brand-copy">
            <span className="ft-eyebrow">SMART EXPENSE TRACKER</span>

            <h1>
              Your money.
              <br />
              <span>Your control.</span>
            </h1>

            <p>
              Track your expenses, understand your spending, and take your next
              step towards better money habits.
            </p>

            <div className="ft-feature-list">
              <span>✓ Track income and expenses</span>
              <span>✓ Understand spending patterns</span>
              <span>✓ Plan your monthly budget</span>
            </div>
          </div>

          <div className="ft-money-scene" aria-hidden="true">
            <span className="ft-currency ft-currency-dollar">$</span>
            <span className="ft-currency ft-currency-rupee">₹</span>
            <span className="ft-currency ft-currency-small">$</span>

            <div className="ft-preview-card">
              <div className="ft-preview-top">
                <span>Financial overview</span>
                <span className="ft-preview-badge">PREVIEW</span>
              </div>

              <p className="ft-preview-title">See the bigger picture.</p>
              <p className="ft-preview-subtitle">
                Every transaction tells a story.
              </p>

              <div className="ft-preview-chart">
                {[36, 56, 44, 72, 60, 90, 76].map((height, index) => (
                  <span key={index} style={{ height: `${height}%` }} />
                ))}
              </div>

              <div className="ft-preview-labels">
                <span>TRACK</span>
                <span>PLAN</span>
                <span>GROW</span>
              </div>
            </div>
          </div>

          <p className="ft-brand-footer">
            Small habits. Better financial clarity.
          </p>
        </section>

        <section className="ft-form-panel">
          <div className="ft-form-heading">
            <span className="ft-form-tag">
              {isLogin ? 'WELCOME BACK' : 'YOUR NEXT CHAPTER'}
            </span>

            <h2>{isLogin ? 'Good to see you again' : 'Create your account'}</h2>

            <p>
              {isLogin
                ? 'Log in to continue your financial journey.'
                : 'A fresh start for you and your finances.'}
            </p>
          </div>

          {error && (
            <div className="ft-auth-error" role="alert">
              {String(error)}
            </div>
          )}

          <form className="ft-form" onSubmit={onSubmit}>
            {!isLogin && (
              <div className="ft-field">
                <label htmlFor="ft-name">Full name</label>
                <input
                  id="ft-name"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                />
              </div>
            )}

            <div className="ft-field">
              <label htmlFor="ft-email">Email address</label>
              <input
                id="ft-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="ft-field">
              <label htmlFor="ft-password">Password</label>

              <div className="ft-password-wrap">
                <input
                  id="ft-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder={
                    isLogin ? 'Enter your password' : 'Create a password'
                  }
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                  minLength={isLogin ? undefined : 6}
                  aria-describedby={isLogin ? undefined : 'ft-password-help'}
                  required
                />

                <button
                  type="button"
                  className="ft-password-toggle"
                  onClick={() => setShowPassword(previous => !previous)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              {!isLogin && (
                <small id="ft-password-help">Use at least 6 characters.</small>
              )}
            </div>

            <button type="submit" className="ft-submit">
              {isLogin ? 'Log in' : 'Create account'}
            </button>
          </form>

          <p className="ft-switch">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button type="button" className="ft-link" onClick={switchMode}>
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </section>
      </div>
    </main>
  );
};
