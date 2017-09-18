// @flow

import * as React from 'react';
import Rx from 'rxjs';
import { Observable } from 'rxjs/Observable';

import reducer$ from '../reducers';

const debuggerOn = true;
Observable.prototype.debug = function (message: string): Observable {
  return this.do(
    (next) => {
      if (debuggerOn) {
        console.log(message, next);
      }
    },
    (err) => {
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
  reducerStream: Observable,
  initialState$: Observable = Observable.of({}),
): Observable {
  return initialState$
    .merge(reducerStream)
    .debug(() => console.log('createState'))
    .scan((state, [scope, reducer]) => ({ ...state, [scope]: reducer(state[scope]) }))
    .publishReplay(1)
    .refCount();
}

export function connect(
  selector?: any => any = state => state,
  actionSubjects: { [key: string]: Rx.Subject },
): React.ComponentType<any> => React.ComponentType<any> {
  const actions = Object.keys(actionSubjects)
    .reduce((acc, key) => ({
      ...acc,
      [key]: (value) => {
        actionSubjects[key].next(value);
      },
    }), {});

  return function wrapWithConnect(
    WrappedComponent: React.ComponentType<any>,
  ): React.ComponentType<any> {
    return class Connect extends React.Component<{}> {
      // eslint-disable-next-line react/sort-comp
      subscription: Observable;

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
