import React from 'react';
import { Link } from 'react-router-dom';

import FacebookLogo from './images/facebook.png';
import InstagramLogo from './images/instagram.png';
import TwitterLogo from './images/twitter.png';
import ArrowDown from './images/arrow-down.png';

import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <nav className="header__nav">
        <div className="header__logo">
          <Link to="/">Logo</Link>
        </div>
        <ul className="header__items">
          <li className="header__item">
            <Link to="/">Home</Link>
          </li>
          <li className="header__item">
            <Link to="/">Contact</Link>
          </li>
          <li className="header__item">
            <Link to="/">About</Link>
          </li>
        </ul>
        <div className="header__icons">
          <a href="http://www.facebook.com/" className="header__icon">
            <img src={FacebookLogo} alt="Facebook logo" />
          </a>
          <a href="https://www.instagram.com/" className="header__icon">
            <img src={InstagramLogo} alt="Instagram logo" />
          </a>
          <a href="https://twitter.com/" className="header__icon">
            <img src={TwitterLogo} alt="Twitter logo" />
          </a>
        </div>
        <div>
          <li className="header__account dropdown">
            Account
            <img src={ArrowDown} alt="Arrow down" className="header__arrow" />
            <ul className="header__dropdown">
              <Link to="/register">
                <li>Sing up</li>
              </Link>
              <Link to="/login">
                <li>Login</li>
              </Link>
            </ul>
          </li>
        </div>
      </nav>
    </header>
  );
};

export default Header;
