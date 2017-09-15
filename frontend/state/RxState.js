import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Rx from 'rxjs';
import reducer$ from "../reducers";

export function createState(reducer$, initialState$ = Rx.Observable.of({})) {
  return initialState$
    .merge(reducer$)
    .scan((state, [scope, reducer]) => ({ ...state, [scope]: reducer(state[scope]) }))
    .publishReplay(1)
    .refCount();
}

export function connect(selector = state => state, actionSubjects) {
  const actions = Object.keys(actionSubjects)
    .reduce((acc, key) => ({ ...acc, [key]: value => actionSubjects[key].next(value) }), {});

  return function wrapWithConnect(WrappedComponent) {
    return class Connect extends Component {
      // static contextTypes = {
      //   state$: PropTypes.object.isRequired,
      // };
      constructor(props) {
        super(props);
      }
      componentWillMount() {
        this.subscription = createState(reducer$).map(selector).subscribe(this.setState.bind(this));
      }

      componentWillUnmount() {
        this.subscription.unsubscribe();
      }

      render() {
        return (
          <WrappedComponent {...this.state} {...this.props} {...actions} />
        );
      }
    }
  };
}

export class Provider extends Component {
  static propTypes = {
    state$: PropTypes.object.isRequired,
  }

  static childContextTypes = {
    state$: PropTypes.object.isRequired,
  }

  getChildContext() {
    return { state$: this.props.state$ };
  }

  render() {
    return this.props.children;
  }
}
