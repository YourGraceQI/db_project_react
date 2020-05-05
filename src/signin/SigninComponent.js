import React, { useState, useContext } from 'react';
import {
  Form, Input, Button, message, Spin,
} from 'antd';
import { Link } from 'react-router-dom';
import Paths from 'common/paths';
import {
  API_SIGNIN, requestWithJsonBody,
} from 'common/apis';
import UserContext from 'common/utils';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 10,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 10,
  },
};

const SigninComponent = () => {
  const context = useContext(UserContext);
  const { setUser } = context;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const onFinish = values => {
    const payload = {
      username: values.username,
      password: values.password,
    };
    setIsLoadingData(true);
    requestWithJsonBody(API_SIGNIN, payload, 'post').then((result) => {
      if (result.error_code === 0) {
        message.success('Login successfully!');
        setIsLoadingData(false);
        setUser(result.data);
        localStorage.setItem('user', JSON.stringify(result.data));
      } else {
        message.error('Login failed, please check your username and password.');
        setIsLoadingData(false);
      }
    });
  };

  return (
    <Spin spinning={isLoadingData}>
      <div style={{ marginTop: '2rem', paddingLeft: 200, paddingRight: 200 }}>
        <div style={{ fontSize: '4rem', textAlign: 'center', marginBottom: '1rem' }}>
          <div style={{ fontSize: '4rem' }}>
            WDS
          </div>
          <div style={{ fontSize: 13 }}>
            Please log in
          </div>
        </div>
        <Form
          {...layout}
          name="basic"
          onFinish={onFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            &nbsp;
            <Button>
              <Link to={Paths.SIGNUP}>
                Sign up
              </Link>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
};

export default SigninComponent;
