// @flow

import * as React from 'react';
import Rx from 'rxjs/Rx';

import Spinner from '../components/Spinner';
import BuyerHeader from '../components/BuyerHeader';
import BuyerFooter from '../components/BuyerFooter';
import KitchenPageRouter from '../components/KitchenPageRouter';

import { connect } from '../state/RxState';
import kitchenActions from '../actions/kitchenActions';
import cartActions from '../actions/cartActions';
import errorActions from '../actions/errorActions';
import type { KitchenObject } from '../utils/flowTypes';
import type { CartObject } from '../utils/flowTypes';
import { fontSize } from '../utils/styleVariables';

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
        { !kitchen || kitchen.isLoading ? <Spinner /> : null }
        {
          kitchen && !kitchen.isLoading ?
            <KitchenPageRouter kitchen={kitchen} query={url.query} /> :
            null
        }
        <BuyerFooter />
        <style jsx>
          {`
            body {
              font-size: ${fontSize};
              letter-spacing: 0.6px;
            }
          `}
        </style>
      </div>
    );
  }
}

const stateSelector = ({ kitchen, cart, error }) => ({ kitchen: kitchen && kitchen.kitchen, cart, error });

const actionSubjects = {
  ...errorActions,
  ...kitchenActions,
  ...cartActions,
};

export default connect(stateSelector, actionSubjects)(Kitchen);
