import React from 'react';
import { NavLink } from 'react-router-dom';

import ChartImage from '../images/chart.png';
import ListImage from '../images/list.png';
import MessageImage from '../images/message.png';
import SettingsImage from '../images/settings.png';
import HelpImage from '../images/help.png';

import './Sidebar.css';

const Sidebar = props => {
  return (
    <aside className="sidebar">
      <div>
        <h1 className="sidebar__title">Logo</h1>
        <ul className="sidebar__list">
          <NavLink
            to="/admin"
            exact
            activeClassName="sidebar__active"
            className="sidebar__item"
          >
            <li>
              <img src={ChartImage} alt="Dashboard" className="sidebar__icon" />
              <span>Dashboard</span>
            </li>
          </NavLink>
          <NavLink
            to="/admin/categories"
            activeClassName="sidebar__active"
            className="sidebar__item"
          >
            <li>
              <img src={ListImage} alt="Categories" className="sidebar__icon" />
              <span>Categories</span>
            </li>
          </NavLink>
          <NavLink
            to="/admin/products"
            activeClassName="sidebar__active"
            className="sidebar__item"
          >
            <li>
              <img src={ListImage} alt="Products" className="sidebar__icon" />
              <span>Products</span>
            </li>
          </NavLink>
          <NavLink
            to="/admin/messages"
            activeClassName="sidebar__active"
            className="sidebar__item"
          >
            <li>
              <img
                src={MessageImage}
                alt="Messages"
                className="sidebar__icon"
              />
              <span>Messages</span>
            </li>
          </NavLink>
          <NavLink
            to="/admin/settings"
            activeClassName="sidebar__active"
            className="sidebar__item"
          >
            <li>
              <img
                src={SettingsImage}
                alt="Settings"
                className="sidebar__icon"
              />
              <span>Settings</span>
            </li>
          </NavLink>
        </ul>
      </div>
      <div className="sidebar__help">
        <NavLink to="/admin/help" className="sidebar__item">
          <li>
            <img src={HelpImage} alt="Help" className="sidebar__icon" />{' '}
            <span>Help</span>
          </li>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
