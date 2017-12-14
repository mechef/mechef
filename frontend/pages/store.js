// @flow

import * as React from 'react';
import Rx from 'rxjs/Rx';

import { connect } from '../state/RxState';
import globalActions from '../actions/globalActions';
import BuyerHeader from '../components/BuyerHeader';
import StorePageRouter from '../components/StorePageRouter';

type Props = {
  url: {
    query: {
      kitchen: string,
      product?: string,
    },
    pathname: string,
  },
  showSpinner$: boolean => Rx.Observable,
}

type State = {
  kitchen: string,
  product?: string,
  coverPhoto: string,
}

class StorePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      kitchen: props.url.query && props.url.query.kitchen ? props.url.query.kitchen : 'momokitchen',
      product: undefined,
      coverPhoto: '/static/main-background.jpg',
    };
  }

  componentDidMount() {
    this.props.showSpinner$(false);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.url.query && nextProps.url.query.kitchen) {
      this.setState({
        kitchen: nextProps.url.query.kitchen,
      });
    }

    if (nextProps.url.query && nextProps.url.query.product) {
      this.setState({
        product: nextProps.url.query.product,
      });
    } else {
      this.setState({
        product: undefined,
      });
    }
  }

  render() {
    return (
      <div>
        <BuyerHeader />
        <div className="storeCover" style={{ backgroundImage: `url(${this.state.coverPhoto})` }} />
        <StorePageRouter kitchen={this.state.kitchen} product={this.state.product} />
        <style jsx>
          {`
            .storeCover {
              display: block;
              height: 250px;
              background-repeat: no-repeat;
              background-size: cover;
              background-position: top -240px center;
            }
          `}
        </style>
      </div>
    );
  }
}

const StoreWrapper = connect(({ global }) => ({ global }), { ...globalActions })(StorePage);

export default StoreWrapper;
