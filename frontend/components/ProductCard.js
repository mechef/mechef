// @flow
import React from 'react';
import Rx from 'rxjs/Rx';

import AddToCartButton from './AddToCartButton';

type Props = {
  id: string,
  name: string,
  price: number,
  url: string,
  description: string,
  onProductSelected: (id: string) => Rx.Observable,
  onAddToCartClick: (id: string) => Rx.Observable,
}

const ProductCard = ({ id, name, price, url, description, onProductSelected, onAddToCartClick }: Props) => (
  <div className="productCard">
    <div className="productDetailContainer">
      <img className="productImage" src={url} alt={name} onClick={() => onProductSelected(id)} />
      <div className="productName" onClick={() => onProductSelected(id)}>{name}</div>
      <div className="productDescription">{description}</div>
      <div className="productPrice">{price}</div>
    </div>
    <AddToCartButton productId={id} onAddToCartClick={onAddToCartClick} />
    <style jsx>
      {`
        .productCard {
          width: 260px;
          height: 380px;
          border-radius: 4px;
          background-color: #ffffff;
          box-shadow: 0 5px 7px 0 rgba(0, 0, 0, 0.24);
          display: inline-block;
          margin-right: 7px;
          margin-bottom: 12px;
        }
        .productDetailContainer {
          flex: 0 0 277px;
          overflow: hidden;
        }
        .productImage {
          width: 260px;
          height: 173px;
          cursor: pointer;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
        }
        .productName {
          font-size: 16px;
          line-height: 16px;
          color: #4a4a4a;
          padding: 28px 16px 0px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
        }
        .productDescription {
          font-size: 14px;
          line-height: 18px;
          color: #9b9b9b;
          padding: 10px 16px 0px;
          overflow: hidden;
          max-height: 36px;
        }
        .productPrice {
          max-height: 18px;
          line-height: 18px;
          padding: 15px 16px 16px;
          color: #9b9b9b;
          font-size: 14px;
        }
      `}
    </style>
  </div>
);

export default ProductCard;
