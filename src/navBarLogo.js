import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Paths from 'common/paths';

const imageUrl = '/favicon.ico';

class NavBarLogo extends Component {
  render() {
    return (
      <Link to={Paths.HOME} className="row" style={{ cursor: 'pointer' }}>
        <img
          style={{
            float: 'left',
            width: '25px',
            height: '25px',
            marginTop: '1rem',
          }}
          alt="logo"
          src={imageUrl}
        />
        <span
          style={{
            float: 'left',
            fontSize: '20px',
            fontWeight: 45,
            color: 'rgba(255,255,255,0.85)',
            lineHeight: '50px',
            marginLeft: '1rem',
            marginRight: '1.25rem',
            paddingTop: 0,
            marginTop: 0,
          }}
        >
          WDS&nbsp;
        </span>
      </Link>
    );
  }
}

export default NavBarLogo;
