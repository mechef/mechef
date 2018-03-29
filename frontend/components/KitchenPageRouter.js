// @flow

import React from 'react';
import Rx from 'rxjs/Rx';

import { connect } from '../state/RxState';
import kitchenActions from '../actions/kitchenActions';
import errorActions from '../actions/errorActions';

import KitchenPage from './KitchenPage';
import DishPage from './DishPage';
import Spinner from './Spinner';

import type { KitchenObject } from '../utils/flowTypes';
import { IMAGE_URL } from '../utils/constants';

type Props = {
  query: {
    kitchen: string,
    dish?: string,
  },
  kitchen?: KitchenObject,
  fetchKitchen$: (kitchen: string) => Rx.Observable,
  setLoading$: boolean => Rx.Subject,
};

class KitchenPageRouter extends React.Component<Props> {
  componentWillMount() {
    this.props.setLoading$(true);
  }

  componentDidMount() {
    this.props.fetchKitchen$(this.props.query.kitchen);
  }

  render() {
    const { kitchen, query } = this.props;

    return (
      <div className="kitchen">
        <div className="kitchen-cover" />
        { !kitchen || kitchen.isLoading ? <Spinner /> : null }
        {
          !query.dish ?
            <KitchenPage kitchenQuery={query.kitchen} kitchen={kitchen} /> :
            <DishPage dishId={query.dish} />
        }
        <style jsx>
          {`
            .kitchen {
              min-width: 1024px;
            }
            .kitchen-cover {
              display: block;
              height: 250px;
              background-repeat: no-repeat;
              background-size: cover;
              background-position: center;
              background-image: url('${kitchen && kitchen.coverPhoto ? `${IMAGE_URL}/${kitchen.coverPhoto}` : '/static/pancake.jpg'}'), url('/static/pancake.jpg');
            }
          `}
        </style>
      </div>
    );
  }
}

const stateSelector = ({ kitchen, error, global }) => ({ kitchen, error });

const actionSubjects = {
  ...errorActions,
  ...kitchenActions,
};

export default connect(stateSelector, actionSubjects)(KitchenPageRouter);
