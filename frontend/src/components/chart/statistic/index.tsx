import React from 'react';
import { Statistic, Row, Col } from 'antd';

interface CustomStatisticProps {
    title?: string;
    value?: number;
    logo?: string;
  }
  
const CustomStatistic: React.FC<CustomStatisticProps>  = ({ title, value, logo }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src={logo} alt="logo" style={{ width: 50, height: 40, marginRight: 16 }} />
      <Statistic
        title={title}
        value={value}
        valueStyle={{ color: '#2f3542' }}
      />
    </div>
  );
};
export default CustomStatistic;