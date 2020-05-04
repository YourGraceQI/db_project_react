import React, { useEffect, useState } from 'react';
import {
  message, Spin, Descriptions,
} from 'antd';
import { API_GET_CUSOTMER, getJsonWithQuery } from 'common/apis';

const ProfileComponent = () => {
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [customerInfo, setcustomerInfo] = useState({});
  useEffect(() => {
    setIsLoadingData(true);
    getJsonWithQuery(API_GET_CUSOTMER, {}).then(result => {
      if (result.error_code === 0) {
        setcustomerInfo(result.data[0]);
        setIsLoadingData(false);
      } else {
        message.error('Error, please contact administrator.');
        setIsLoadingData(false);
      }
    });
  }, []);

  return (
    <Spin spinning={isLoadingData}>
      <div style={{ paddingLeft: 200, paddingRight: 200, paddingTop: 30 }}>
        <Descriptions title="Customer Info" layout="vertical" bordered>
          <Descriptions.Item label="Customer ID">{customerInfo.c_id}</Descriptions.Item>
          <Descriptions.Item label="First Name">{customerInfo.c_firstname}</Descriptions.Item>
          <Descriptions.Item label="Last Name">{customerInfo.c_lastname}</Descriptions.Item>
          <Descriptions.Item label="Gender">{customerInfo.c_gender}</Descriptions.Item>
          <Descriptions.Item label="Birthday">{customerInfo.c_birthdate}</Descriptions.Item>
          <Descriptions.Item label="Customer Type">{customerInfo.c_customertype}</Descriptions.Item>
          <Descriptions.Item label="Marital Status">{customerInfo.c_maritalstatus}</Descriptions.Item>
          <Descriptions.Item label="Address" span={2}>
            {customerInfo.c_street}
            ,&nbsp;
            {customerInfo.c_city}
            ,&nbsp;
            {customerInfo.c_state}
            ,&nbsp;
            {customerInfo.c_zipcode}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </Spin>
  );
};

export default ProfileComponent;
