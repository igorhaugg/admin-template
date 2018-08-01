import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutUser } from '../../../actions/authActions';

import './Header.css';

class Header extends Component {
  handleLogout = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    return (
      <header className="header-admin">
        <span className="header-admin__visible" />
        <h1 className="header-admin__title header-admin__visible">
          <Link to="/">LOGO</Link>
        </h1>
        <h1 className="header-admin__title">{this.props.title}</h1>
        <ul className="header-admin__list">
          <a onClick={this.handleLogout}>
            <li className="header-admin__item">Logout</li>
          </a>
        </ul>
      </header>
    );
  }
}

Header.defaultProps = {
  title: 'Dashboard'
};

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Header);
