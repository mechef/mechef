// @flow

import * as React from 'react';
import Rx from 'rxjs/Rx';

import Button from './Button';

type Props = {
  children: React.Node,
  buttonText: string,
  onClick: () => Rx.Observable,
}

const ErrorComponent = (props: Props) => (
  <div className="container">
    {props.children}
    <div className="buttonWrapper">
      <Button
        size="small"
        buttonStyle="primary"
        onClick={() => {
          props.onClick();
        }}
      >
        {props.buttonText}
      </Button>
    </div>
    <style jsx>
      {`
        .container {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .buttonWrapper {
          display: flex;
          justify-content: center;
        }
      `}
    </style>
  </div>
);

ErrorComponent.defaultProps = {
  buttonText: '',
  onClick: () => {},
};

export default ErrorComponent;
