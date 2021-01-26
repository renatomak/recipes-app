import React from 'react';

function Login() {
  return (
    <div>
      <form>
        <input
          type="text"
          name="email"
          data-testid="email-input"
          placeholder="user@trybe.com"
        />
        <input
          type="text"
          name="password"
          data-testid="password-input"
          placeholder="password"
        />
        <button type="button" data-testid="login-submit-btn">Entrar</button>
      </form>
    </div>
  );
}
export default Login;
