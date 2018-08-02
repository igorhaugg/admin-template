import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import InputItem from '../../common/InputItem';
import Button from '../../common/Button';
import Spinner from '../../common/Spinner';
import { registerUser } from '../../actions/authActions';
import './Auth.css';

export class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {},
    passwordType: 'password',
    passwordClicked: false,
    password2Type: 'password',
    password2Clicked: false,
    show: false
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

    this.setState({ show: true });

    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(user, this.props.history);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleToggle = name => {
    if (name === 'password') {
      this.setState({
        passwordClicked: !this.state.passwordClicked,
        passwordType:
          this.state.passwordType === 'password' ? 'text' : 'password'
      });
    } else {
      this.setState({
        password2Clicked: !this.state.password2Clicked,
        password2Type:
          this.state.password2Type === 'password' ? 'text' : 'password'
      });
    }
  };

  render() {
    const { errors } = this.state;
    let divStyle = {
      display: 'flex'
    };
    return (
      <main className="full-screen full-centralize auth">
        <div className="auth__form">
          <h1 className="auth__title">Register</h1>
          <form onSubmit={this.onSubmit}>
            <InputItem
              label="name"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              error={errors.name}
            />
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
            <InputItem
              label="confirm password"
              name="password2"
              type={this.state.password2Type}
              value={this.state.password2}
              onChange={this.onChange}
              handleToggle={this.handleToggle}
              passwordClicked={this.state.password2Clicked}
              error={errors.password2}
            />
            {this.state.show && <Spinner />}
            <div style={divStyle}>
              <Button type="submit" text="Continue" desc="auth" />
            </div>
          </form>
          <p className="auth__message">
            Already have an account?{' '}
            <Link to="/login" className="auth__link">
              Sign In
            </Link>
          </p>
        </div>
      </main>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
