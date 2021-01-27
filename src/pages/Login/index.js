import React, { useContext } from 'react';
import { RecipeAppContext } from '../../context/Provider';

function Login() {
  const { user, handleChangeUser } = useContext(RecipeAppContext);
  const { email, password } = user;
  return (
    <div>
      <form>
        <input
          type="text"
          name="email"
          value={ email }
          data-testid="email-input"
          placeholder="user@trybe.com"
          onChange={ (e) => handleChangeUser(e) }
        />
        <input
          type="text"
          name={ password }
          data-testid="password-input"
          placeholder="password"
          onChange={ (e) => handleChangeUser(e) }
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
