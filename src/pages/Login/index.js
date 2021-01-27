import React, { useContext } from 'react';
import { RecipeAppContext } from '../../context/Provider';

function Login() {
  const {
    email,
    password,
    handleChangeEmail,
    handleChangePassword,
  } = useContext(RecipeAppContext);

  return (
    <div>
      <form>
        <input
          type="text"
          name="email"
          value={ email }
          data-testid="email-input"
          placeholder="user@trybe.com"
          onChange={ ({ target }) => handleChangeEmail(target.value) }
        />
        <input
          type="text"
          name={ password }
          data-testid="password-input"
          placeholder="password"
          onChange={ ({ target }) => handleChangePassword(target.value) }
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
