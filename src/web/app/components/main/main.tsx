import React from 'react';
// import PropTypes from 'prop-types';

import Navbar from './navbar';
import Sidebar from './sidebar';

function Main() {
  return (
    <div>
      <Navbar />
      <Sidebar />
    </div>
  );
}

Main.propTypes = {

};

export default Main;