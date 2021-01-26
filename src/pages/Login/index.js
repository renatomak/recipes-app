import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = ({ target: { value } }) => setEmail(value);

  const handleChangePassword = ({ target: { value } }) => setPassword(value);

  return (
    <div>
      <form>
        <input
          type="text"
          name="email"
          value={ email }
          data-testid="email-input"
          placeholder="user@trybe.com"
          onChange={ (e) => handleChangeEmail(e) }
        />
        <input
          type="text"
          name={ password }
          data-testid="password-input"
          placeholder="password"
          onChange={ (e) => handleChangePassword(e) }
        />
        <button
          type="button"
          data-testid="login-submit-btn"

        >
          Entrar
        </button>
      </form>
    </div>
  );
}
export default Login;
