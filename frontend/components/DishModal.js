// @flow

import React from 'react';
import Rx from 'rxjs/Rx';

import DishOrder from './DishOrder';
import { DishObject } from '../utils/flowTypes';

type Props = {
  id: string,
  name: string,
  description: string,
  url: string,
  price: number,
  maxServing: number,
  onClose: () => Rx.Observable,
};

class DishModal extends React.Component<Props> {
  render() {
    return (
      <div className="dish-modal-overlay">
        <div className="dish-modal">
          <div className="productGallery">
            <img src={this.props.url} className="productGalleryImage" />
          </div>
          <div className="dish-modal__content">
            <div className="dish-modal__content-wrapper">
              <div className="dish-modal__name">{this.props.name}</div>
              <div className="dish-modal__description">{this.props.description}</div>
              <DishOrder price={this.props.price} maxServing={this.props.maxServing} />
            </div>
            <div className="dish-modal__content__button-container">
               <button className="dish-modal__content__button">ADD TO CART</button>
            </div>
          </div>
          <div className="dish-modal__close-button" onClick={this.props.onClose}></div>
        </div>
        <style jsx>
          {`
            .dish-modal-overlay {
              position: fixed;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .dish-modal {
              position: relative;
              width: 715px;
              height: 456px;
              border-radius: 4px;
              background-color: #ffffff;
              box-shadow: 0 5px 7px 0 rgba(0, 0, 0, 0.3);
            }
            .productGallery {
              overflow: hidden;
              display: inline-flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              width: 290px;
              height: 100%;
            }
            .productGalleryImage {
              flex: 1 0 auto;
            }
            .dish-modal__content {
              display: inline-flex;
              width: calc(100% - 294px);
              height: 100%;
              vertical-align: top;
              flex-direction: column;
              justify-content: space-between;
              align-items: flex-end;
            }
            .dish-modal__close-button {
              position: absolute;
              right: 20px;
              top: 16px;
              height: 16px;
              width: 16px;
              cursor: pointer;
              background-image: url('/static/svg/cancel-grey.svg');
            }
            .dish-modal__content-wrapper {
              box-sizing: border-box;
              width: 100%;
              padding: 0 20px;
            }
            .dish-modal__name {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              color: #4a4a4a;
              width: 228px;
              line-height: 18px;
              margin-top: 20px;
            }
            .dish-modal__description {
              overflow: hidden;
              margin-top: 9px;
              margin-right: 26px;
              line-height: 18px;
              max-height: 36px;
              color: #9b9b9b;
            }
            .dish-modal__content__button-container {
              margin-right: 20px;
              margin-bottom: 32px;
            }
            .dish-modal__content__button {
              width: 228px;
              height: 49px;
              border-radius: 4px;
              background-color: #3e9f40;
              color: #ffffff;
              box-shadow: 0 11px 19px 0 rgba(0, 0, 0, 0.18);
            }
          `}
        </style>
      </div>
    );
  }
}

export default DishModal;
