// @flow

import * as React from 'react';
import Rx from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import reducer$ from '../reducers';

const debuggerOn = true;
// $FlowFixMe Customized debug function
Observable.prototype.debug = function(message: string): Rx.Observable {
  return this.do(
    next => {
      if (debuggerOn) {
        console.log(message, next);
      }
    },
    err => {
      if (debuggerOn) {
        console.error('ERROR >>> ', message, err);
      }
    },
    () => {
      if (debuggerOn) {
        console.log('Completed.');
      }
    },
  );
};

export function createState(
  reducerStream: Rx.Observable,
  initialState$: Rx.Observable = Observable.of({}),
): Rx.Observable {
  return initialState$
    .merge(reducerStream)
    .debug('Stream Name:')
    .scan((state, [scope, reducer]) => ({
      ...state,
      [scope]: reducer(state[scope]),
    }))
    .debug('After state:')
    .publishReplay(1)
    .refCount();
}

const globalState = createState(reducer$);
export function connect(
  selector?: any => any = state => state,
  actionSubjects: { [key: string]: Rx.Subject },
): (React.ComponentType<any>) => React.ComponentType<any> {
  const actions = Object.keys(actionSubjects).reduce(
    (acc, key) => ({
      ...acc,
      [key]: value => {
        if (debuggerOn) {
          console.log('next value:', value);
        }
        actionSubjects[key].next(value);
      },
    }),
    {},
  );
  return function wrapWithConnect(
    WrappedComponent: React.ComponentType<any>,
  ): React.ComponentType<any> {
    return class Connect extends React.Component<{}> {
      static getInitialProps({ asPath }) {
        return {
          asPath,
        };
      }
      // eslint-disable-next-line react/sort-comp
      subscription: Rx.Observable;
      componentWillMount() {
        this.subscription = globalState
          .map(selector)
          .subscribe(this.setState.bind(this));
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
