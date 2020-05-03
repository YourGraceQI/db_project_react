import React, { useEffect, useState } from 'react';
import {
  message, Spin, Table,
} from 'antd';
import { API_GET_POLICY, getJsonWithQuery } from 'common/apis';
import Title from 'common/components/Title';

const PolicyListComponent = () => {
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [policys, setPolicys] = useState([]);
  useEffect(() => {
    setIsLoadingData(true);
    getJsonWithQuery(API_GET_POLICY, {}).then(result => {
      if (result.error_code === 0) {
        setPolicys(result.data);
        setIsLoadingData(false);
      } else {
        message.error('Error, please contact administrator.');
        setIsLoadingData(false);
      }
    });
  }, []);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'policy_id',
      key: 'id',
    },
    {
      title: 'Type',
      dataIndex: 'policy_type',
      key: 'type',
    },
    {
      title: 'Premium Amount',
      dataIndex: 'premium_amount',
      key: 'premium_amount',
    },
    {
      title: 'Status',
      dataIndex: 'policy_status',
      key: 'status',
    },
    {
      title: 'Start Date',
      dataIndex: 'startdate',
      key: 'startdate',
    },
    {
      title: 'End Date',
      dataIndex: 'enddata',
      key: 'enddata',
    },
  ];

  return (
    <Spin spinning={isLoadingData}>
      <div style={{ paddingLeft: 200, paddingRight: 200, paddingTop: 30 }}>
        <Title title="Your Policys" />
        <Table
          columns={columns}
          dataSource={policys}
        />
      </div>
    </Spin>
  );
};

export default PolicyListComponent;
