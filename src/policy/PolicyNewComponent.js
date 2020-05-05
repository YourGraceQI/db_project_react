import React, { useState } from 'react';
import {
  Form, Input, Button, DatePicker, Spin, Checkbox, Select, message, InputNumber,
} from 'antd';
import moment from 'moment';
import { withRouter, Link } from 'react-router-dom';
import Paths from 'common/paths';
import {
  API_POST_POLICY, requestWithJsonBody,
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

const PolicyNewComponent = ({ history }) => {
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [policyType, setPolicyType] = useState('A');
  const onFinish = values => {
    const payload = {
      startdate: values.startdate,
      enddate: values.enddate,
      policy_type: values.policy_type,
      auto: {
        vin: values.vin,
        model_year: moment(values.model_year).format('YYYY'),
        vehiclestatus: values.vehiclestatus,
        driver: {
          driver_licence: values.driver_licence,
          d_firstname: values.d_firstname,
          d_lastname: values.d_lastname,
          d_birthdate: moment(values.d_birthdate).format('YYYY-MM-DD'),
        },
      },
      home: {
        home_id: values.home_id,
        purchase_date: moment(values.purchase_date).format('YYYY-MM-DD'),
        purchase_value: values.purchase_value,
        homearea: values.homearea,
        hometype: values.hometype,
        auto_fire_notification: values.auto_fire_notification,
        home_security_system: values.home_security_system,
        swimming_pool: values.swimming_pool,
        basement: values.basement,
      },
    };
    if (payload.startdate) {
      payload.startdate = moment(payload.startdate).format('YYYY-MM-DD');
    }
    if (payload.enddate) {
      payload.enddate = moment(payload.enddate).format('YYYY-MM-DD');
    }
    if (policyType === 'H') {
      delete payload.auto;
    }
    if (policyType === 'A') {
      delete payload.home;
    }
    setIsLoadingData(true);
    requestWithJsonBody(API_POST_POLICY, payload, 'post').then((result) => {
      if (result.error_code === 0) {
        message.success('Post new policy successfully!');
        setIsLoadingData(false);
        history.push(Paths.POLICY_VIEW);
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
            Please input following info
          </div>
        </div>
        <Form
          {...layout}
          name="basic"
          onFinish={onFinish}
        >
          <Form.Item
            label="Start Date"
            name="startdate"
            rules={[
              { required: true, message: 'Please choose new policy start date' },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="End Date"
            name="enddate"
            rules={[
              { required: true, message: 'Please choose new policy end date' },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Policy Type"
            name="policy_type"
            rules={[
              { required: true, message: 'Please choose policy type' },
            ]}
          >
            <Select onSelect={(type) => {
              setPolicyType(type);
            }}
            >
              <Select.Option value="A">Autopolicy</Select.Option>
              <Select.Option value="H">Homepolicy</Select.Option>
            </Select>
          </Form.Item>
          {policyType === 'A' && (
            <>
              <Form.Item
                label="Vehicle Identification Number"
                name="vin"
                rules={[
                  { required: true, message: 'Please input your vin!' },
                  { len: 12, message: '12 characters.' },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Model Make Year"
                name="model_year"
                rules={[
                  { required: true, message: 'Please choose model make year' },
                ]}
              >
                <DatePicker picker="year" />
              </Form.Item>
              <Form.Item
                label="Vehicle Status"
                name="vehiclestatus"
                rules={[
                  { required: true, message: 'Please choose vehicle status' },
                ]}
              >
                <Select>
                  <Select.Option value="L">leased</Select.Option>
                  <Select.Option value="F">financed</Select.Option>
                  <Select.Option value="O">owned</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Driver Licence"
                name="driver_licence"
                rules={[
                  { required: true, message: 'Please input driver licence!' },
                  { len: 15, message: '15 characters.' },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Driver Firstname"
                name="d_firstname"
                rules={[
                  { required: true, message: 'Please input driver firstname!' },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Driver Lastname"
                name="d_lastname"
                rules={[
                  { required: true, message: 'Please input driver lastname!' },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Driver Birthdate"
                name="d_birthdate"
                rules={[
                  { required: true, message: 'Please choose driver birthdate' },
                ]}
              >
                <DatePicker />
              </Form.Item>
            </>
          )}
          {policyType === 'H' && (
            <>
              <Form.Item
                label="Home ID"
                name="home_id"
                rules={[
                  { required: true, message: 'Please input your homeid!' },
                  { len: 14, message: '14 characters.' },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Purchase Date"
                name="purchase_date"
                rules={[
                  { required: true, message: 'Please choose home purchase date' },
                ]}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                label="Purchase Value"
                name="purchase_value"
                rules={[
                  { required: true, message: 'Please input home purchase value' },
                ]}
              >
                <InputNumber step={0.01} />
              </Form.Item>
              <Form.Item
                label="Home Area"
                name="homearea"
                rules={[
                  { required: true, message: 'Please input home area' },
                ]}
              >
                <InputNumber step={0.01} />
              </Form.Item>
              <Form.Item
                label="Home Type"
                name="hometype"
                rules={[
                  { required: true, message: 'Please choose home type' },
                ]}
              >
                <Select>
                  <Select.Option value="S">singlefamily</Select.Option>
                  <Select.Option value="M">multifamily</Select.Option>
                  <Select.Option value="C">condominium</Select.Option>
                  <Select.Option value="T">townhouse</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Swimming Pool Type"
                name="swimming_pool"
                rules={[
                  { required: true, message: 'Please choose swimming pool type' },
                ]}
              >
                <Select>
                  <Select.Option value="U">underground</Select.Option>
                  <Select.Option value="O">overground</Select.Option>
                  <Select.Option value="I">indoor</Select.Option>
                  <Select.Option value="M">multiple</Select.Option>
                  <Select.Option value="N">nopool</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                valuePropName="checked"
                label="Auto Fire Notification"
                name="auto_fire_notification"
              >
                <Checkbox />
              </Form.Item>
              <Form.Item
                valuePropName="checked"
                label="Security System"
                name="home_security_system"
              >
                <Checkbox />
              </Form.Item>
              <Form.Item
                valuePropName="checked"
                label="Basement"
                name="basement"
              >
                <Checkbox />
              </Form.Item>
            </>
          )}

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            &nbsp;
            <Button>
              <Link to={Paths.POLICY_VIEW}>
                Cancel
              </Link>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
};

export default withRouter(PolicyNewComponent);
