import React, { Component } from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import { Layout, Affix } from 'antd';
import NavBarComponent from './navBarComponent';
import routerList from './routerList';
import 'antd/dist/antd.css';
import Paths from 'common/paths';
import history from './appHistory';
import UserContext, { getInitUserContext } from 'common/utils';

const PrivateRoute = ({
  component: AppComponent, user, path, ...rest
}) => {
  const isLoginComponent = path === Paths.SIGNIN || path.includes(Paths.SIGNIN);

  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (user && isLoginComponent) {
          return (
            <Redirect to={{
              pathname: Paths.PROFILE,
              state: { from: props.location },
            }}
            />
          );
        }
        if (user || isLoginComponent) {
          return <AppComponent {...props} />;
        }

        return (
          <Redirect to={{
            pathname: Paths.SIGNIN,
            state: { from: props.location },
          }}
          />
        );
      }}
    />
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: getInitUserContext(),
    };
  }

  setUser = (newUser) => {
    this.setState({
      user: newUser,
    });
  }

  render() {
    const { user } = this.state;
    const navBarPath = [
      Paths.ROOT,
    ];

    return (
      <UserContext.Provider
        value={{
          user,
          setUser: (newUser) => this.setUser(newUser),
        }}
      >
        <div style={{ height: '100%' }}>
          <Router history={history}>
            <Layout style={{ height: '100%', background: 'white' }}>
              <Affix>
                <Route
                  exactly={false}
                  path={navBarPath}
                  component={NavBarComponent}
                />
              </Affix>
              {
                routerList.map(route => {
                  return (
                    <PrivateRoute
                      user={user}
                      key={route.path}
                      path={route.path}
                      exact={route.exactPath}
                      component={route.component}
                    />
                  );
                })
              }
            </Layout>
          </Router>
        </div>
      </UserContext.Provider>
    );
  }
}

export default App;
