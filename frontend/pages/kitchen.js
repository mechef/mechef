// @flow

import * as React from 'react';
import Rx from 'rxjs/Rx';

import Spinner from '../components/Spinner';
import BuyerHeader from '../components/BuyerHeader';
import BuyerFooter from '../components/BuyerFooter';
import KitchenPageRouter from '../components/KitchenPageRouter';
import KitchenPage from '../components/KitchenPage';

import { connect } from '../state/RxState';
import kitchenActions from '../actions/kitchenActions';
import cartActions from '../actions/cartActions';
import errorActions from '../actions/errorActions';
import type { KitchenObject } from '../utils/flowTypes';
import type { CartObject } from '../utils/flowTypes';
import { fontSize, fontSizeSmall, smallBreak } from '../utils/styleVariables';
import { IMAGE_URL } from '../utils/constants';

type Props = {
  url: {
    query: {
      kitchen: string,
      dish?: string,
    },
  },
  kitchen?: KitchenObject,
  cart: CartObject,
  restoreCart$: (kitchen: string) => Rx.Observable,
  fetchKitchen$: (kitchen: string) => Rx.Observable,
  setLoading$: boolean => Rx.Subject,
};

class Kitchen extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchKitchen$(this.props.url.query.kitchen);
    this.props.restoreCart$(this.props.url.query.kitchen);
  }

  componetWillMount() {
    this.props.setLoading$(true);
  }

  render() {
    const { kitchen = {}, url } = this.props;
    return (
      <div>
        <BuyerHeader cart={this.props.cart} kitchenName={kitchen.kitchenName} />
        <div className="kitchen-cover" />
        {!kitchen || kitchen.isLoading ? <Spinner /> : null}
        {kitchen && !kitchen.isLoading ? (
          <KitchenPage kitchen={kitchen} kitchenName={kitchen.kitchenName} />
        ) : null}
        <BuyerFooter />
        <style jsx>
          {`
            body {
              font-size: ${fontSizeSmall};
              letter-spacing: 0.5px;
            }
            @media (min-width: ${smallBreak}) {
              font-size: ${fontSize};
              letter-spacing: 0.6px;
            }
            .kitchen {
              width: 100%;
              position: relative;
            }
            .kitchen-cover,
            .kitchen-cover--hidden {
              height: 200px;
              background-repeat: no-repeat;
              background-size: cover;
              background-position: center;
              background-image: url('${
                kitchen && kitchen.coverPhoto
                  ? `${IMAGE_URL}/${kitchen.coverPhoto}`
                  : '/static/pancake.jpg'
              }'), url('/static/pancake.jpg');
            }

            .kitchen-cover--hidden {
              display: none;
            }

            @media (min-width: ${smallBreak}) {
              .kitchen-cover,
              .kitchen-cover--hidden {
                height: 250px;
                display: block;
              }
            }
          `}
        </style>
      </div>
    );
  }
}

const stateSelector = ({ kitchen, cart, error }) => ({
  kitchen: kitchen && kitchen.kitchen,
  cart,
  error,
});

const actionSubjects = {
  ...errorActions,
  ...kitchenActions,
  ...cartActions,
};

export default connect(
  stateSelector,
  actionSubjects,
)(Kitchen);
