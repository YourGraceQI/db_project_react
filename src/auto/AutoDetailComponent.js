import React, { useEffect, useState } from 'react';
import {
  message, Spin, Table, Descriptions,
} from 'antd';
import Title from 'common/components/Title';
import { withRouter } from 'react-router-dom';
import {
  API_GET_VEHICLE, API_GET_DRIVER, getJsonWithQuery,
} from 'common/apis';

const AutoDetailComponent = ({ match }) => {
  const vehicleID = match.params.id;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [vehicle, setVehicle] = useState({});
  const [vehicleInfo, setVehicleInfo] = useState([]);
  const column = [
    {
      title: 'ID',
      dataIndex: 'driver_licence',
      key: 'id',
    },
    {
      title: 'First Name',
      dataIndex: 'd_firstname',
      key: 'firstname',
    },
    {
      title: 'Last Name',
      dataIndex: 'd_lasttname',
      key: 'lastname',
    },
    {
      title: 'Birthdate',
      dataIndex: 'd_birthdate',
      key: 'd_birthdate',
    },
  ];

  useEffect(() => {
    setIsLoadingData(true);
    getJsonWithQuery(API_GET_VEHICLE, { vin: vehicleID }).then(result => {
      if (result.error_code === 0) {
        setVehicle(result.data[0]);
        setIsLoadingData(false);
        getJsonWithQuery(API_GET_DRIVER, { vin: vehicleID }).then(driverResult => {
          if (driverResult.error_code === 0) {
            setVehicleInfo(driverResult.data);
            setIsLoadingData(false);
          } else {
            message.error(driverResult.error_reason);
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
        <Descriptions title="Auto Detail" layout="vertical" bordered style={{ marginBottom: '1rem' }}>
          <Descriptions.Item label="VIN">{vehicle.vin}</Descriptions.Item>
          <Descriptions.Item label="Make Model Year">{vehicle.model_year}</Descriptions.Item>
          <Descriptions.Item label="Vehicle Status">{vehicle.vehiclestatus}</Descriptions.Item>
        </Descriptions>
        <Title title="Driver Info" />
        <Table
          columns={column}
          dataSource={vehicleInfo}
          pagination={false}
        />
      </div>
    </Spin>
  );
};

export default withRouter(AutoDetailComponent);
