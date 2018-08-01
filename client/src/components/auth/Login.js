import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import InputItem from '../../common/InputItem';
import Button from '../../common/Button';
import { loginUser } from '../../actions/authActions';
import './Auth.css';

export class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {},
    passwordType: 'password',
    passwordClicked: false
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/admin');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/admin');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(user);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleToggle = () => {
    this.setState({
      passwordType:
        this.state.passwordType === 'password' ? 'text' : 'password',
      passwordClicked: !this.state.passwordClicked
    });
  };

  render() {
    const { errors } = this.state;
    let divStyle = {
      display: 'flex'
    };
    return (
      <main className="full-screen full-centralize auth">
        <div className="auth__form">
          <h1 className="auth__title">Login</h1>
          <form onSubmit={this.onSubmit}>
            <InputItem
              label="email"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
            />
            <InputItem
              label="password"
              name="password"
              type={this.state.passwordType}
              value={this.state.password}
              onChange={this.onChange}
              handleToggle={this.handleToggle}
              passwordClicked={this.state.passwordClicked}
              error={errors.password}
            />
            <div style={divStyle}>
              <Button type="submit" text="Continue" desc="auth" />
            </div>
          </form>
          <p className="auth__message">
            Don't have an account?{' '}
            <Link to="/register" className="auth__link">
              Sign Up
            </Link>
          </p>
        </div>
      </main>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
