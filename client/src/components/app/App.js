import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import Loadable from 'react-loadable';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import PrivateRoute from './PrivateRoute';
import setAuthToken from '../../utils/token';
import store from '../../store/store';
import { setCurrentUser, logoutUser } from '../../actions/authActions';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}

// Loading component

const Loading = () => <h1>Loading...</h1>;

// Public components

const Login = Loadable({
  loader: () => import('../auth/Login'),
  loading: () => <Loading />
});

const Register = Loadable({
  loader: () => import('../auth/Register'),
  loading: () => <Loading />
});

const Home = Loadable({
  loader: () => import('../site/home/Home'),
  loading: () => <Loading />
});

// Private components
// extends dashboard?????
const Dashboard = Loadable({
  loader: () => import('../admin/dashboard/Dashboard'),
  loading: () => <Loading />
});

const Category = Loadable({
  loader: () => import('../admin/category/Category'),
  loading: () => <Loading />
});

const CategoryForm = Loadable({
  loader: () => import('../admin/category/CategoryForm'),
  loading: () => <Loading />
});

const Product = Loadable({
  loader: () => import('../admin/product/Product'),
  loading: () => <Loading />
});

const ProductForm = Loadable({
  loader: () => import('../admin/product/ProductForm'),
  loading: () => <Loading />
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/admin" component={Dashboard} />
            <PrivateRoute exact path="/admin/categories" component={Category} />
            <PrivateRoute
              exact
              path="/admin/categories/add"
              component={CategoryForm}
            />
            <PrivateRoute
              exact
              path="/admin/categories/edit/:id"
              component={CategoryForm}
            />
            <PrivateRoute exact path="/admin/products" component={Product} />
            <PrivateRoute
              exact
              path="/admin/products/add"
              component={ProductForm}
            />
            <PrivateRoute
              exact
              path="/admin/products/edit/:id"
              component={ProductForm}
            />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
