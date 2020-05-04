import React, { useEffect, useState } from 'react';
import {
  message, Spin, Descriptions, Table,
} from 'antd';
import Title from 'common/components/Title';
import { withRouter, Link } from 'react-router-dom';
import {
  API_GET_POLICY, API_GET_HOME, API_GET_VEHICLE, API_GET_INVOICE, getJsonWithQuery,
} from 'common/apis';
import { genearteAutoManagementPath, genearteInvoiceManagementPath } from 'common/paths';

const PolicyDetailComponent = ({ match }) => {
  const policyId = match.params.id;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [policy, setPolicy] = useState({});
  const [assetInfo, setAssetInfo] = useState([]);
  const [invoice, setInvoice] = useState([]);
  const columnauto = [
    {
      title: 'ID',
      dataIndex: 'vin',
      key: 'id',
      render: (data) => {
        return (
          <Link to={genearteAutoManagementPath(data)}>
            {data}
          </Link>
        );
      },
    },
    {
      title: 'Make Model Year',
      dataIndex: 'model_year',
      key: 'model_year',
    },
    {
      title: 'Vehicle Status',
      dataIndex: 'vehiclestatus',
      key: 'vehilcestatus',
    },
  ];
  const columnhome = [
    {
      title: 'ID',
      dataIndex: 'home_id',
      key: 'id',
    },
    {
      title: 'Purchae Date',
      dataIndex: 'purchase_date',
      key: 'purchase_date',
    },
    {
      title: 'Purchase Value',
      dataIndex: 'purchase_value',
      key: 'purchase_value',
    },
    {
      title: 'Home Area',
      dataIndex: 'homearea',
      key: 'homearea',
    },
    {
      title: 'Home Type',
      dataIndex: 'hometype',
      key: 'hometype',
    },
    {
      title: 'Auto Fire Notification',
      dataIndex: 'auto_fire_notification',
      key: 'auto_fire_notification',
      render: (data) => {
        return data ? '✅' : '❎';
      },
    },
    {
      title: 'Home Security System',
      dataIndex: 'home_security_system',
      key: 'home_security_system',
      render: (data) => {
        return data ? '✅' : '❎';
      },
    },
    {
      title: 'Swimming Pool',
      dataIndex: 'swimming_pool',
      key: 'swimming_pool',
    },
    {
      title: 'Basement',
      dataIndex: 'basement',
      key: 'basement',
      render: (data) => {
        return data ? '✅' : '❎';
      },
    },
  ];
  const columninvoice = [
    {
      title: 'ID',
      dataIndex: 'invoice_id',
      key: 'id',
      render: (data) => {
        return (
          <Link to={genearteInvoiceManagementPath(data)}>
            {data}
          </Link>
        );
      },
    },
    {
      title: 'Invoice Amount',
      dataIndex: 'invoice_amount',
      key: 'invoice_amount',
    },
    {
      title: 'Payment Due',
      dataIndex: 'payment_due',
      key: 'payment_due',
    },
    {
      title: 'If Installment',
      dataIndex: 'installment',
      key: 'installment',
      render: (data) => {
        return data ? '✅' : '❎';
      },
    },
    {
      title: 'If Cleared',
      dataIndex: 'invoice_cleared',
      key: 'invoice_cleared',
      render: (data) => {
        return data ? '✅' : '❎';
      },
    },
  ];


  useEffect(() => {
    setIsLoadingData(true);
    getJsonWithQuery(API_GET_POLICY, { policy_id: policyId }).then(result => {
      if (result.error_code === 0) {
        setPolicy(result.data[0]);
        setIsLoadingData(false);
        let assetApi = '';
        if (result.data[0].policy_type === 'A') {
          assetApi = API_GET_VEHICLE;
        }
        if (result.data[0].policy_type === 'H') {
          assetApi = API_GET_HOME;
        }
        getJsonWithQuery(assetApi, { policy_id: policyId }).then(autoResult => {
          if (autoResult.error_code === 0) {
            setAssetInfo(autoResult.data);
            setIsLoadingData(false);
          } else {
            message.error(autoResult.error_reason);
            setIsLoadingData(false);
          }
        });
      } else {
        message.error(result.error_reason);
        setIsLoadingData(false);
      }
    });
  }, []);
  useEffect(() => {
    setIsLoadingData(true);
    getJsonWithQuery(API_GET_INVOICE, { policy_id: policyId }).then(invoiceResult => {
      if (invoiceResult.error_code === 0) {
        setInvoice(invoiceResult.data);
        setIsLoadingData(false);
      } else {
        message.error(invoiceResult.error_reason);
        setIsLoadingData(false);
      }
    });
  }, []);
  return (
    <Spin spinning={isLoadingData}>
      <div style={{ paddingLeft: 200, paddingRight: 200, paddingTop: 30 }}>
        <Descriptions title="Policy Detail" layout="vertical" bordered style={{ marginBottom: '1rem' }}>
          <Descriptions.Item label="Policy ID">{policy.policy_id}</Descriptions.Item>
          <Descriptions.Item label="Policy Type">{policy.policy_type}</Descriptions.Item>
          <Descriptions.Item label="Policy Status">{policy.policy_status}</Descriptions.Item>
          <Descriptions.Item label="Premium Amount">{policy.premium_amount}</Descriptions.Item>
          <Descriptions.Item label="Start Date">{policy.startdate}</Descriptions.Item>
          <Descriptions.Item label="End Date">{policy.enddate}</Descriptions.Item>
        </Descriptions>
        <Title title="Your Assets" />
        <Table
          style={{ marginBottom: '1rem' }}
          columns={policy.policy_type === 'A' ? columnauto : columnhome}
          dataSource={assetInfo}
          pagination={false}
        />
        <Title title="Your Invoice" />
        <Table
          columns={columninvoice}
          dataSource={invoice}
          pagination={false}
        />
      </div>
    </Spin>
  );
};

export default withRouter(PolicyDetailComponent);
