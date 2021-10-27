import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleDemo = () => {
    setEmail('demo@aa.io');
    setPassword('password');
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="login-page-container">
      <h1 className="digizon-login-logo">Digizon</h1>
      <div className="login-form-container">
        <form onSubmit={onLogin}>
          <h2 className="signin-text">Log-In</h2>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            {/* <div className="login-label-container">
              <label htmlFor='email'>Email</label>
            </div> */}
            <input
              className='login-input'
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            {/* <div className="login-label-container">
              <label htmlFor='password'>Password</label>
            </div> */}
            <input
              className='login-input'
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
            <div className="login-btn-container">
            <button className='user-login-btn' type='submit'>Login</button>
            </div>
            <button className='user-login-btn' type="submit" onClick={handleDemo}>Demo User</button>

          </div>
        </form>
      </div>
      <fieldset className='line'>
        <legend className='new-to-digizon'>New to Digizon?</legend>
      </fieldset>
      <div className="btn-to-signup-container">
        <Link to='/sign-up' exact={true}>
          <button className="btn-to-signup">Create your Digizon Account</button>
        </Link>
      </div>
      <div className="footer-container">
        <p className="about-me"> Designed by Rawaha Memon</p>
        <div className="personal-link-container">
          <a href="https://github.com/RawaMem" target="_blank" className="social-link">
            <img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-social-github-1024.png" alt="" className="social-link-img" />
          </a>
          <a href="https://linkedin.com/in/rawaha-m-b280a4204 " target="_blank" className="social-link">
            <img src="https://cdn3.iconfinder.com/data/icons/unicons-vector-icons-pack/32/linkedin-1024.png" alt="" className="social-link-img" />
          </a>
        </div>
      </div>
    </div>

  );
};

export default LoginForm;
