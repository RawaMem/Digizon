import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import { Home } from './components/Home';
import { Profile } from './components/Profile';
import { ProductPage } from './components/ProductPage';
import LoggedInNav from './components/LoggedInNavBar';
import { Cart } from './components/cart';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' exact={true}>
          <NavBar />
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <NavBar />
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <LoggedInNav />
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <LoggedInNav />
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/profile/:profileId' exact={true} >
          <LoggedInNav />
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path='/products/:productId' exact={true} >
          <LoggedInNav />
          <ProductPage />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <LoggedInNav />
          <Home />
        </ProtectedRoute>
        <ProtectedRoute path='/cart' exact={true} >
          <LoggedInNav />
          <Cart />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
