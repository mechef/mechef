// @flow

import * as React from 'react';
import Rx from 'rxjs/Rx';

import { connect } from '../state/RxState';
import globalActions from '../actions/globalActions';
import BuyerHeader from '../components/BuyerHeader';
import KitchenPageRouter from '../components/KitchenPageRouter';

import { IMAGE_URL } from '../utils/constants';

type Props = {
  url: {
    query: {
      kitchen: string,
      dish?: string,
    },
    pathname: string,
  },
  showSpinner$: boolean => Rx.Observable,
}

type State = {
  kitchen: string,
  dish?: string,
  coverPhoto?: string,
}

class KitchenPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      kitchen: props.url.query && props.url.query.kitchen ? props.url.query.kitchen : 'momokitchen',
      dish: undefined,
      coverPhoto: undefined,
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

    if (nextProps.url.query && nextProps.url.query.dish) {
      this.setState({
        dish: nextProps.url.query.dish,
      });
    } else {
      this.setState({
        dish: undefined,
      });
    }
  }

  render() {
    return (
      <div>
        <BuyerHeader />
        <div className="kitchen-cover" />
        <KitchenPageRouter kitchen={this.state.kitchen} dish={this.state.dish} />
        <style jsx>
          {`
            body {
                margin: 0px;
                font-family: Ubuntu;
            }
            .kitchen-cover {
              display: block;
              height: 250px;
              background-repeat: no-repeat;
              background-size: cover;
              background-position: center;
              background-image: url('${this.state.coverPhoto ? `${IMAGE_URL}/${this.state.coverPhoto}` : '/static/pancake.jpg'}'), url('/static/pancake.jpg');

            }
          `}
        </style>
      </div>
    );
  }
}

const KitchenWrapper = connect(({ global }) => ({ global }), { ...globalActions })(KitchenPage);

export default KitchenWrapper;
