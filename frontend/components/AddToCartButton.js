// @flow
import * as React from 'react';
import Rx from 'rxjs/Rx';

type Props = {
  dishId: string,
  onAddToCartClick: (dishId: string) => Rx.Observable,
}

class AddToCartButton extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.addProductToCart = this.addProductToCart.bind(this);
  }

  addProductToCart: Function;

  addProductToCart() {
    this.props.onAddToCartClick(this.props.dishId);
  }

  render() {
    return (
      <div className="addToCartButtonContainer">
        <button className="addToCartButton" onClick={this.addProductToCart}>ADD TO CART</button>
        <style jsx>
          {`
            .addToCartButtonContainer {
              flex-grow: 0;
              display: flex;
              justify-content: center;
            }
            .addToCartButton {
              width: 228px;
              height: 49px;
              border-radius: 4px;
              background-color: #3e9f40;
              color: #ffffff;
              font-size: 14px;
              cursor: pointer;
              box-shadow: none;
              outline: none;
              border: none;
            }
            .addToCartButton:hover {
              background-color: #367d36;
            }
          `}
        </style>
      </div>
    );
  }
}

export default AddToCartButton;
