import React, { Component } from 'react';
import {
  Layout, Menu, message,
} from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import NavBarLogo from './navBarLogo';
import Paths, { geneartePolicyManagementPath } from 'common/paths';
import POLICY_MANAGEMENT_TYPE from 'common/constant';
import UserContext from 'common/utils';
import { API_SIGNOUT, requestWithJsonBody } from 'common/apis';

const { Header } = Layout;

class NavBarComponent extends Component {
  // eslint-disable-next-line react/static-property-placement
  static contextType = UserContext;

  logout() {
    const { setUser } = this.context;

    requestWithJsonBody(API_SIGNOUT, {}, 'post').then(result => {
      if (result.error_code === 0) {
        message.success('Signout successfully');
        setUser(null);
        localStorage.removeItem('user');
      }
    });
  }

  getMenuLinkItem(text, link, key, redirect = false, disable = false) {
    return (
      <Menu.Item key={key} disabled={disable}>
        {redirect ? (
          <a
            href={link}
            onClick={() => { window.location.href = link; }}
            style={{ fontSize: '15pt' }}
          >
            {text}
          </a>
        ) : (
          <Link to={link}>
            <div className="nav-bar-links">
              {text}
            </div>
          </Link>
        )}
      </Menu.Item>
    );
  }

  render() {
    const { user } = this.context;
    const loggedinMenu = [
      this.getMenuLinkItem('Home', Paths.PROFILE, 'home'),
      this.getMenuLinkItem('Policy', Paths.POLICY_VIEW, 'policy'),
    ];

    return (
      <div>
        <Header style={{ height: '50px' }}>
          <NavBarLogo />
          <Menu
            mode="horizontal"
            theme="dark"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '50px' }}
            selectable={false}
          >
            {user && (
              <Menu.Item
                disabled
                key="user"
                style={{
                  float: 'right',
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}
              >
                <div>
                  <LogoutOutlined
                    onClick={() => { this.logout(); }}
                    style={{ fontSize: 20, color: 'white', cursor: 'pointer' }}
                  />
                </div>
              </Menu.Item>
            )}
            {user && loggedinMenu}
          </Menu>
        </Header>
      </div>
    );
  }
}

export default withRouter(NavBarComponent);
