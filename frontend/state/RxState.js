import React, { Component } from 'react';
import Rx from 'rxjs';

import reducer$ from '../reducers';

export function createState(reducerStream, initialState$ = Rx.Observable.of({})) {
  return initialState$
    .merge(reducerStream)
    .scan((state, [scope, reducer]) => ({ ...state, [scope]: reducer(state[scope]) }))
    .publishReplay(1)
    .refCount();
}

export function connect(selector = state => state, actionSubjects) {
  const actions = Object.keys(actionSubjects)
    .reduce((acc, key) => ({ ...acc, [key]: value => actionSubjects[key].next(value) }), {});

  return function wrapWithConnect(WrappedComponent) {
    return class Connect extends Component {
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
    };
  };
}
