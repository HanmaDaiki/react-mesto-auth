import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import InfoTooltip from "./InfoTooltip";

function Register({handleRegistrationUser, isOpen, onClose, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleRegistrationUser(email, password);
  }

  return (
    <main className='main main_form'>
      <form noValidate onSubmit={handleSubmit} className='form'>
        <h1 className='form__title'>Регистрация</h1>
        <input onChange={handleChangeEmail} type='email' autoComplete="username" className='form__input' placeholder='Email'/>
        <input onChange={handleChangePassword} type='password' autoComplete="new-password" className='form__input' placeholder='Пароль'/>
        <button type='submit' className='form__button'>Зарегистрироваться</button>
        <Link to='/sing-up' className='form__link'>Уже зарегистрированы? Войти</Link>
      </form>

      <InfoTooltip isOpen={isOpen} onClose={onClose} error={error} />
    </main>
  );
}

export default Register;