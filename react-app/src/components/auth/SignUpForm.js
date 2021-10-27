import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(first_name, last_name, username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateFirst_name = (e) => {
    setFirst_name(e.target.value);
  };

  const updateLast_name = (e) => {
    setLast_name(e.target.value);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="login-page-container">
      <h1 className="digizon-login-logo">Digizon</h1>
      <div className="login-form-container">
      <form onSubmit={onSignUp}>
        <h2 className="signin-text">Sign-Up</h2>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <div className="login-label-container">
            <label htmlFor='first_name'>First Name</label>
          </div>
          <input
            type='text'
            className='login-input'
            name='first_name'
            placeholder='First Name'
            onChange={updateFirst_name}
            value={first_name}
          ></input>
        </div>
        <div>
          <div className="login-label-container">
            <label htmlFor='last_name'>Last Name</label>
          </div>
          <input
            type='text'
            className='login-input'
            name='last_name'
            placeholder='Last Name'
            onChange={updateLast_name}
            value={last_name}
          ></input>
        </div>
        <div>
          <div className="login-label-container">
            <label htmlFor='username'>User Name</label>
          </div>
          <input
            type='text'
            className='login-input'
            name='username'
            placeholder='Username'
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div>
          <div className="login-label-container">
            <label htmlFor='email'>Email</label>
          </div>
          <input
            type='text'
            className='login-input'
            name='email'
            placeholder='Email'
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>
          <div className="login-label-container">
          <label htmlFor='password'>Password</label>
          </div>
          <input
            type='password'
            className='login-input'
            name='password'
            placeholder='Password'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          <div className="login-label-container">
          <label htmlFor='repeat_password'>Repeat Password</label>
          </div>
          <input
            type='password'
            className='login-input'
            name='repeat_password'
            placeholder='Repeat Password to Confirm'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <button type='submit' className='user-login-btn'>Sign Up</button>
      </form>
      </div>
      <fieldset className='line'>
        <legend className='new-to-digizon'>Already have a Digizon Account?</legend>
      </fieldset>
      <div className="btn-to-signup-container">
        <Link to='/login' exact={true}>
          <button className="btn-to-signup">Log in to your Digizon Account</button>
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

export default SignUpForm;
