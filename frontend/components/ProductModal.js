// @flow

import React from 'react';
import Rx from 'rxjs/Rx';

import ServingModifier from './ServingModifier';
import { ProductObject } from '../utils/flowTypes';

type Props = {
  id: string,
  name: string,
  description: string,
  url: string,
  price: number,
  maxServing: number,
  onClose: () => Rx.Observable,
}

type State = {
  quantity: number,
  subTotal: number,
  note?: string,
}

class ProductModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      quantity: 1,
      subTotal: this.formatPrice(props.price),
      note: '',
    };

    this.onNoteChange = this.onNoteChange.bind(this);
    this.recalculateSubTotal = this.recalculateSubTotal.bind(this);
  }

  onNoteChange: Function;
  onNoteChange(event: any) {
    this.setState({ note: event.target.value });
  }

  formatPrice: Function;
  formatPrice(price: number) {
    return `${price}.00`;
  }

  recalculateSubTotal: Function;
  recalculateSubTotal(quantity: number) {
    const subTotal = this.props.price * quantity;
    this.setState({
      quantity: quantity,
      subTotal: this.formatPrice(subTotal),
    });
  }

  render() {
    return (
      <div className="productModalOverlay">
        <div className="productModal">
          <div className="productGallery">
            <img src={this.props.url} className="productGalleryImage" />
          </div>
          <div className="productDetail">
            <div className="productDetailWrapper">
              <div className="productDetailName">{this.props.name}</div>
              <div className="productDetailDescription">{this.props.description}</div>
              <div className="productDetailNote">Note to seller</div>
              <textarea
                className="productDetailNoteInput"
                autocomplete="off"
                placeholder="Any preference? Let the seller know here..."
                onChange={this.onNoteChange}
              ></textarea>
              <div className="productDetailQuantity">
                <span>Quantity</span>
                <div className="productDetailQuantityControl">
                  <ServingModifier
                    maxServing={this.props.maxServing}
                    onQuantityChanged={this.recalculateSubTotal}
                  />
                </div>
              </div>
              <div className="productDetailSubTotal">
                <span>Subtotal</span>
                <span className="productDetailSubTotalLabel">{this.state.subTotal}</span>
              </div>
            </div>
            <div className="product-splash__content__button-container">
               <button className="product-splash__content__button">ADD TO CART</button>
            </div>
          </div>
          <div className="productDetailCloseButton" onClick={this.props.onClose}></div>
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
            .productDetail {
              display: inline-flex;
              width: calc(100% - 294px);
              height: 100%;
              vertical-align: top;
              flex-direction: column;
              justify-content: space-between;
              align-items: flex-end;
            }
            .productDetailCloseButton {
              position: absolute;
              right: 20px;
              top: 16px;
              height: 16px;
              width: 16px;
              cursor: pointer;
              background-image: url('/static/svg/cancel-grey.svg');
            }
            .productDetailWrapper {
              box-sizing: border-box;
              width: 100%;
              padding-left: 20px;
            }
            .productDetailName {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              color: #4a4a4a;
              width: 228px;
              line-height: 18px;
              margin-top: 20px;
            }

            .productDetailDescription {
              overflow: hidden;
              margin-top: 9px;
              margin-right: 26px;
              line-height: 18px;
              max-height: 36px;
                color: #9b9b9b;
            }

            .productDetailNote {
              color: #4a4a4a;
              line-height: 14px;
              margin-top: 21px;
            }

            .productDetailNoteInput {
              color: #4a4a4a;
              line-height: 14px;
              margin-top: 16px;
              width: 384px;
              height: 80px;
              border-radius: 4px;
              border: solid 1px #979797;
              outline: 0;
            }
            .productDetailQuantity {
              display: flex;
              justify-content: space-between;
              align-items: center;
              color: #909090;
              margin-top: 31px;
              margin-right: 20px;
              font-size: 14px;
            }
            .productDetailQuantityControl {
              display: inline-block;
            }
            .productDetailSubTotal {
              color: #909090;
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 31px;
              margin-right: 20px;
              font-size: 14px;
            }

            .productDetailSubTotalLabel {
              font-size: 20px;
              line-height: 24px;
              color: #4a4a4a;
            }

            .product-splash__content__button-container {
              margin-right: 20px;
              margin-bottom: 32px;
            }

            .product-splash__content__button {
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

export default ProductModal;
