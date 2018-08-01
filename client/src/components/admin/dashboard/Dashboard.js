import React, { Fragment } from 'react';

import Sidebar from '../layout/Sidebar';
import Header from '../layout/Header';

import SlideMenu from './SlideMenu';

import './Dashboard.css';

const Dashboard = props => {
  return (
    <Fragment>
      <div id="outer-container ">
        <SlideMenu
          pageWrapId={'page-wrap'}
          outerContainerId={'outer-container'}
        />
        <div id="page-wrap">
          <main className="dashboard">
            <Sidebar />
            <div className="dashboard__main">
              <Header title={props.title} />
              <section className={props.componentClass}>
                {props.children}
              </section>
            </div>
          </main>
        </div>
      </div>
    </Fragment>
  );
};

Dashboard.defaultProps = {
  componentClass: ''
};

export default Dashboard;
