// @flow

import React from 'react';

type Props = {
  id: string,
  name: string,
  description: string,
  url: string,
  price: number,
}

const ProductModal = (props: Props) => (
  <div className="productModalOverlay">
    <div className="productModal">
      <div className="productGallery">
        {props.url}
      </div>
      <div className="productDetail">
        {props.name}
      </div>
    </div>
    <style jsx>
      {`
        .productModalOverlay {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .productModal {
          width: 715px;
          height: 456px;
          border-radius: 4px;
          background-color: #ffffff;
          box-shadow: 0 5px 7px 0 rgba(0, 0, 0, 0.3);
        }
      `}
    </style>
  </div>
);

export default ProductModal;
