import React from 'react';
import { useState } from "react";

function Login({handleLoginUser}) {
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
    handleLoginUser(email, password);
  }

  return (
    <main className='main main_form'>
      <form noValidate onSubmit={handleSubmit} className='form'>
        <h1 className='form__title'>Вход</h1>
        <input onChange={handleChangeEmail} type='email'  autoComplete="username" className='form__input' placeholder='Email'/>
        <input onChange={handleChangePassword} type='password' autoComplete="current-password" className='form__input' placeholder='Пароль'/>
        <button type='submit' className='form__button'>Войти</button>
      </form>
    </main>
  );
}

export default Login;