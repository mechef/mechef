// @flow

import * as React from 'react';

const Spinner = () => (
  <div className="spinnerOverlay">
    <div className="spinner" />
    <style jsx>
      {`
        .spinnerOverlay {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.6);
        }
        .spinner {
          position: fixed;
          z-index: 99;
          top: 50%;
          left: 50%;
          width: 40px;
          height: 40px;
          background-color: #ffffff;
          background-image: url('../static/svg/loading_02.svg');
          animation: sk-rotateplane 1.2s infinite ease-in-out;
        }

        @keyframes sk-rotateplane {
          0% {
            transform: perspective(120px) rotateX(0deg) rotateY(0deg);
            -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg)
          } 50% {
            transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
            -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg)
          } 100% {
            transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
            -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
          }
        }
      `}
    </style>
  </div>
);

export default Spinner;
