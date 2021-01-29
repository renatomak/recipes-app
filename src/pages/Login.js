import React, { useState } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkedPassword, setCheckedPassword] = useState(true);

  const validatesEmail = () => {
    const emailRegex = /[\w.-]+@[\w-]+\.[\w-.]+/gi;
    return emailRegex.test(email);
  };

  const handleChangeEmail = ({ target: { value } }) => {
    setEmail(value);
  };

  const handleChangePassword = ({ target: { value } }) => {
    setPassword(value);
    console.log(password.length);
    const limitSize = 6;
    if (password.length >= limitSize) setCheckedPassword(false);
  };

  const submit = () => {
    const { history } = props;

    const emilObject = { email };
    console.log(emilObject);
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify(emilObject));
    history.push('/comidas');
  };

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
          disabled={ checkedPassword || !validatesEmail() }
          onClick={ submit }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
/** FONTE: https://www.npmjs.com/package/react-router-prop-types */
Login.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default Login;
