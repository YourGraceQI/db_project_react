import React, { useState } from 'react';
import {
  Form, Input, Button, DatePicker, Spin, Checkbox, Select, message,
} from 'antd';
import moment from 'moment';
import { withRouter, Link } from 'react-router-dom';
import Paths from 'common/paths';
import {
  API_SIGNUP, API_CHECK_USERNAME, requestWithJsonBody,
} from 'common/apis';

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

const SignupComponent = ({ history }) => {
  let checkUsernameCounter = null;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isExistingCustomer, setIsExistingCustomer] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(null);
  const onFinish = values => {
    if (!isUsernameValid) return;
    const payload = values;
    if (payload.c_birthdate) {
      payload.c_birthdate = moment(payload.c_birthdate).format('YYYY-MM-DD');
    }
    setIsLoadingData(true);
    requestWithJsonBody(API_SIGNUP, payload, 'post').then((result) => {
      if (result.error_code === 0) {
        message.success('Signup successfully! Please signin.');
        setIsLoadingData(false);
        history.push(Paths.SIGNIN);
      } else {
        message.error(result.error_reason);
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
            Please sign up
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
            <Input
              onChange={(e) => {
                const inputValue = e.target.value;
                clearTimeout(checkUsernameCounter);
                checkUsernameCounter = setTimeout(() => {
                  requestWithJsonBody(API_CHECK_USERNAME, { username: inputValue }, 'post').then(result => {
                    setIsUsernameValid(result.error_code === 0);
                  });
                }, 2000);
              }}
              suffix={(
                <span>
                  {isUsernameValid === true && <span style={{ color: 'green' }}>Available</span>}
                  {isUsernameValid === false && <span style={{ color: 'red' }}>Taken</span>}
                </span>
              )}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                min: 6,
                message: 'At least 6 characters.',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
              {
                // eslint-disable-next-line no-useless-escape
                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Please input a valid email address',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Do you have a customer ID"
            name="have_customer_id"
          >
            <Checkbox onChange={(e) => {
              setIsExistingCustomer(e.target.checked);
            }}
            />
          </Form.Item>
          {isExistingCustomer && (
            <Form.Item
              label="Customer ID"
              name="customerid"
              rules={[
                { required: true, message: 'Please input your customer id!' },
                { len: 10, message: '10 characters.' },
              ]}
            >
              <Input />
            </Form.Item>
          )}
          <Form.Item
            label="Firstname"
            name="c_firstname"
            rules={[
              {
                required: true,
                message: 'Please input your firstname!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Lastname"
            name="c_lastname"
            rules={[
              { required: true, message: 'Please input your lastname!' },
            ]}
          >
            <Input />
          </Form.Item>
          {!isExistingCustomer && (
            <>
              <Form.Item
                label="Birthday"
                name="c_birthdate"
                rules={[
                  { required: true, message: 'Please input your birthday' },
                ]}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                label="Street"
                name="c_street"
                rules={[
                  { required: true, message: 'Please input your street!' },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="City"
                name="c_city"
                rules={[
                  { required: true, message: 'Please input your city!' },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="State"
                name="c_state"
                rules={[
                  { required: true, message: 'Please input your state!' },
                  { len: 2, message: '2 characters.' },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Zipcode"
                name="c_zipcode"
                rules={[
                  { required: true, message: 'Please input your zipcode!' },
                  { len: 5, message: '5 characters.' },
                  { pattern: /^[0-9]+$/, message: 'Must be numbers' },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Gender"
                name="c_gender"
                rules={[
                  { required: true, message: 'Please input your gender!' },
                ]}
              >
                <Select>
                  <Select.Option value="M">Male</Select.Option>
                  <Select.Option value="F">Female</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Marital Status"
                name="c_maritalstatus"
                rules={[
                  { required: true, message: 'Please input your marital status!' },
                ]}
              >
                <Select>
                  <Select.Option value="S">Single</Select.Option>
                  <Select.Option value="M">Married</Select.Option>
                  <Select.Option value="W">Widow/Widower</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Customer Type"
                name="c_customertype"
                rules={[
                  { required: true, message: 'Please input your marital type!' },
                ]}
              >
                <Select>
                  <Select.Option value="A">Auto Customer</Select.Option>
                  <Select.Option value="H">House Customer</Select.Option>
                  <Select.Option value="AH">All</Select.Option>
                </Select>
              </Form.Item>
            </>
          )}

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            &nbsp;
            <Button>
              <Link to={Paths.SIGNIN}>
                Cancel
              </Link>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
};

export default withRouter(SignupComponent);
