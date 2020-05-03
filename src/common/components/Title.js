import React from 'react';

const Title = ({ title }) => {
  return (
    <div
      style={{
        fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem', paddingLeft: '0.5rem',
      }}
    >
      {title}
    </div>
  );
};

export default Title;
