// @flow

import * as React from 'react';
import KitchenHeader from './KitchenHeader';
import DishOrder from './DishOrder';
import AddToCartButton from './AddToCartButton';

type Props = {
  kitchen: string,
  id: string,
  //fetchDish$: any => Rx.Observable,
};

type State = {
  kitchenName: string,
  profileImage?: string,
  quantity: number,
  subTotal: number,
  dish: {
    maxServing: number,
    price: number,
  },
};

class DishPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      kitchenName: 'momokitchen',
      profileImage: '/static/avatar.jpg',
      quantity: 1,
      dish: {
        price: 9,
        maxServing: 10,
      },
      subTotal: 0,
    };

    this.setState({
      subTotal: this.state.dish.price
    });

    this.recalculateSubTotal = this.recalculateSubTotal.bind(this);
    this.addToCartClick = this.addToCartClick.bind(this);
  }

  componentDidMount() {
    // this.props.fetchDish();
  }

  formatPrice: Function;
  formatPrice(price: number): string {
    return `$${price}.00`;
  }

  recalculateSubTotal: Function;
  recalculateSubTotal(quantity: number) {
    const subTotal = this.state.dish.price * quantity;
    this.setState({
      quantity: quantity,
      subTotal: this.formatPrice(subTotal),
    });
  }

  addToCartClick: Function;
  addToCartClick() {
    console.log('adding item to cart. TODO: call api to update cart.')
  }

  render() {
    return (
      <div className="dish-page">
        <div className="dish-page__main">
          <div className="dish-page__left">
            <KitchenHeader
              name={this.state.kitchenName}
              profileImage={this.state.profileImage}
            />
            <div></div>
            <hr />
            <div className="dish-page__left__section">
              <div className="dish-page__left__field-title">
                Description Kitchen {this.props.kitchen}
              </div>
              <div className="dish-page__left__field-title">
                Product {this.props.id}
              </div>
            </div>
            <hr />
          </div>
          <div className="dish-page__right">
            <div className="dish-page__right__header">Your Order</div>
            <hr />
            <div className="dish-page__right__order-detail">
              <DishOrder price={this.state.dish.price} maxServing={this.state.dish.maxServing} />
            </div>
            <hr/>
            <div className="dish-page__right__footer">
              <AddToCartButton dishId="this.props.id" onAddToCartClick={this.addToCartClick} />
            </div>
          </div>
        </div>
        <div className="dish-page__footer">
          <div className="dish-page__footer__question">
            Any question about your order?
          </div>
          <div className="dish-page__footer__contact">CONTACT CHEF</div>
        </div>
        <style jsx>
          {`
            hr {
              height: 1px;
              background-color: #b9b9b9;
              border: 0;
              margin: 0 auto;
            }
            .dish-page__main {
              min-height: 100%;
              display: flex;
              flex-direction: row;
            }
            .dish-page__left {
              flex-basis: calc(100% - 340px);
              padding-left: 100px;
              padding-right: 27px;
              color: #9b9b9b;
              font-size: 12px;
            }
            .dish-page__left hr {
              width: 100%;
            }
            .dish-page__left__section {
              margin: 40px 0;
            }
            .dish-page__left__field-title {
              font-size: 16px;
              color: #4a4a4a;
              font-weight: 500;
              padding-bottom: 15px;
            }
            .dish-page__right {
              flex-basis: 340px;
              flex-grow: 0;
              flex-shrink: 0;
              background-color: #f8f8f8;
            }
            .dish-page__right__header {
              text-align: center;
              display: block;
              width: 250px;
              line-height: 1.5;
              font-size: 16px;
              color: #4a4a4a;
              margin: 0 auto;
              padding-top: 38px;
              padding-bottom: 38px;
            }
            .dish-page__right hr {
              width: 250px;
            }
            .dish-page__right__order-detail {
              padding: 47px 45px 30px;
            }
            .dish-page__right__order-detail .dish-order__note-input {
              background-color: #f8f8f8;
            }
            .dish-page__right__footer {
              margin: 40px 0;
            }
            .dish-page__right__footer .addToCartButton {
              width: 250px;
            }

            .dish-page__footer {
              position: relative;
              border-top: 1px solid #b9b9b9;
            }
            .dish-page__footer__question {
              padding-top: 70px;
              font-family: Playball;
              font-size: 20px;
              text-align: center;
              color: #4a4a4a;
            }
            .dish-page__footer__contact {
              padding-top: 30px;
              font-family: Ubuntu;
              font-size: 16px;
              text-align: center;
              color: #3f9f40;
              padding-bottom: 50px;
            }
          `}
        </style>
      </div>
    );
  }
}

export default DishPage;
