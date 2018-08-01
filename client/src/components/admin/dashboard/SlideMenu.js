import React from 'react';
import { pushRotate as Menu } from 'react-burger-menu';
import { NavLink } from 'react-router-dom';

import ChartImage from '../images/chart.png';
import ListImage from '../images/list.png';
import MessageImage from '../images/message.png';
import SettingsImage from '../images/settings.png';
import HelpImage from '../images/help.png';

import './SlideMenu.css';

const SlideMenu = () => {
  return (
    <Menu menuClassName={'slide-menu'}>
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
          <img src={MessageImage} alt="Messages" className="sidebar__icon" />
          <span>Messages</span>
        </li>
      </NavLink>
      <NavLink
        to="/admin/settings"
        activeClassName="sidebar__active"
        className="sidebar__item"
      >
        <li>
          <img src={SettingsImage} alt="Settings" className="sidebar__icon" />
          <span>Settings</span>
        </li>
      </NavLink>
      <NavLink to="/admin" className="sidebar__item">
        <li>
          <img src={HelpImage} alt="Help" className="sidebar__icon" />{' '}
          <span>Help</span>
        </li>
      </NavLink>
    </Menu>
  );
};

export default SlideMenu;
