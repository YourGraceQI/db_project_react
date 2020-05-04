import React, { useEffect, useState } from 'react';
import {
  message, Spin, Table, Descriptions,
} from 'antd';
import Title from 'common/components/Title';
import { withRouter } from 'react-router-dom';
import {
  API_GET_INVOICE, API_GET_PAYMENT, getJsonWithQuery,
} from 'common/apis';

const InvoiceDetailComponent = ({ match }) => {
  const invoiceID = match.params.id;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [invoice, setInvoice] = useState({});
  const [invoiceInfo, setInvoiceInfo] = useState([]);
  const column = [
    {
      title: 'ID',
      dataIndex: 'pay_id',
      key: 'id',
    },
    {
      title: 'Payment Date',
      dataIndex: 'payment_date',
      key: 'payment_date',
    },
    {
      title: 'Payment Method',
      dataIndex: 'payment_method',
      key: 'payment_method',
    },
    {
      title: 'Pay Amount',
      dataIndex: 'pay_amount',
      key: 'pay_amount',
    },
  ];

  useEffect(() => {
    setIsLoadingData(true);
    getJsonWithQuery(API_GET_INVOICE, { invoice_id: invoiceID }).then(result => {
      if (result.error_code === 0) {
        setInvoice(result.data[0]);
        setIsLoadingData(false);
        getJsonWithQuery(API_GET_PAYMENT, { invoice_id: invoiceID }).then(paymentResult => {
          if (paymentResult.error_code === 0) {
            setInvoiceInfo(paymentResult.data);
            setIsLoadingData(false);
          } else {
            message.error(paymentResult.error_reason);
            setIsLoadingData(false);
          }
        });
      } else {
        message.error(result.error_reason);
        setIsLoadingData(false);
      }
    });
  }, []);
  return (
    <Spin spinning={isLoadingData}>
      <div style={{ paddingLeft: 200, paddingRight: 200, paddingTop: 30 }}>
        <Descriptions title="Invoice Detail" layout="vertical" bordered style={{ marginBottom: '1rem' }}>
          <Descriptions.Item label="Invoice ID">{invoice.invoice_id}</Descriptions.Item>
          <Descriptions.Item label="Invoice Amount">{invoice.invoice_amount}</Descriptions.Item>
          <Descriptions.Item label="Payment Due">{invoice.payment_due}</Descriptions.Item>
          <Descriptions.Item label="If Installment">{invoice.installment ? '✅' : '❎'}</Descriptions.Item>
          <Descriptions.Item label="If Cleared">{String(invoice.invoice_cleared ? '✅' : '❎')}</Descriptions.Item>
        </Descriptions>
        <Title title="Payment Info" />
        <Table
          columns={column}
          dataSource={invoiceInfo}
          pagination={false}
        />
      </div>
    </Spin>
  );
};

export default withRouter(InvoiceDetailComponent);
