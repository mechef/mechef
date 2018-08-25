import React from 'react';

const DashboardContentLayout = ({ children }) => (
  <div className="container">
    {children}
    <style jsx>
      {`
        .container {
          margin-top: 90px;
          padding: 49px 19px;
          width: 100%;
          min-height: 792px;
          height: 100%;
          background-color: #f8f7f7;
          box-sizing: border-box;
        }
      `}
    </style>
  </div>
);

export default DashboardContentLayout;
