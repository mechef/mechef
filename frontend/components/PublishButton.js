// @flow

import React from 'react';
import Rx from 'rxjs/Rx';
import { compose, withHandlers, withState } from 'recompose';
import {
  whiteColor,
  lineHeight,
  titleFonr,
  textHintColor,
  primaryColor,
} from '../utils/styleVariables';

type Props = {
  isPublish: boolean,
  onTogglePublish: () => Rx.Observable,
};

const PublishButton = ({ isPublish, onTogglePublish }: Props) => (
  <button
    className={`
      ${isPublish ? 'publishedToggleBtn' : 'unpublishedToggleBtn'}
    `}
    onClick={onTogglePublish}
  >
    <div className={`${isPublish ? 'publishedCircle' : 'unpublishedCircle'}`} />
    <span className={`${isPublish ? 'publishedText' : 'unpublishedText'}`}>
      {isPublish ? 'PUBLISH' : 'UNPUBLISH'}
    </span>
    <style jsx>{`
      button {
        padding: 0;
      }
      .publishedToggleBtn {
        display: flex;
        align-items: center;
        align-self: flex-end;
        width: 99px;
        height: 26px;
        border-radius: 26px;
        cursor: pointer;
        outline: none;
        background-color: ${primaryColor};
      }

      .unpublishedToggleBtn {
        background-color: ${textHintColor};
        border: 1px solid ${textHintColor};
        flex-direction: row-reverse;
      }

      .publishedCircle {
        width: 20px;
        height: 20px;
        border-radius: 26px;
        background-color: ${whiteColor};
        margin-left: 3px;
        margin-right: 0;
      }

      .unpublishedCircle {
        margin-left: 0;
        margin-right: 3px;
      }

      .publishedText {
        margin-left: 10px;
        margin-right: 0;
        font-size: 9px;
        letter-spacing: 0.3px;
        color: ${whiteColor};
        line-height: ${lineHeight};
      }

      .unpublishedText {
        margin-left: 0;
        margin-right: 10px;
      }
    `}</style>
  </button>
);

export default PublishButton;
