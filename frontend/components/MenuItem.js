// @flow

import React from 'react';
import Rx from 'rxjs/Rx';
import Media from 'react-media';
import { compose, withHandlers, withState } from 'recompose';

import {
  borderRadius,
  whiteColor,
  primaryColor,
  lineHeight,
  titleFontSize,
  subtitleFontSize,
  textColor,
  textHintColor,
  transparent,
} from '../utils/styleVariables';
import PublishButton from './PublishButton';
import EditDeleteGroup from './EditDeleteGroup';
import ModalWithActionButton from './ModalWithActionButton';

type Props = {
  dishName: string,
  description: string,
  thumbnailUrl: string,
  isPublish: boolean,
  onTogglePublish: () => Rx.Observable,
  onEdit: () => Rx.Observable,
  onDelete: () => Rx.Observable,
};

const MenuItem = ({
  dishName,
  description,
  thumbnailUrl,
  isPublish,
  onTogglePublish,
  onEdit,
  onDelete,
  isShowingDeleteConfirmModal,
  showDeleteConfirmModal,
  hideDeleteConfirmModal,
}: Props) => (
  <Media query="(max-width: 768px)">
    {matches =>
      matches ? (
        <article className="mobileContainer">
          {isShowingDeleteConfirmModal ? (
            <ModalWithActionButton
              title="Delete Menu"
              message="Do you really want to delete this menu?"
              onAction={onDelete}
              onCancel={hideDeleteConfirmModal}
            />
          ) : null}
          <div className="mobileThumbnail" />
          <div className="content">
            <h3>{dishName}</h3>
            <p className="description">{description}</p>
            <div className="actionGroup">
              <PublishButton
                isPublish={isPublish}
                onTogglePublish={onTogglePublish}
              />
              <EditDeleteGroup
                onEdit={onEdit}
                onDelete={showDeleteConfirmModal}
              />
            </div>
          </div>
          <style jsx>{`
                .mobileContainer {
                  width: 100%;
                  background-color: ${whiteColor};
                  border-radius: ${borderRadius};
                }
                .mobileThumbnail {
                  background-image: url('${thumbnailUrl}'), url('../static/img/pancake.jpg');
                  background-size: cover;
                  background-position: center;
                  width: 100%;
                  height: 100px;
                  border-top-left-radius: ${borderRadius};
                  border-bottom-left-radius: ${borderRadius};
                }
                .content {
                  padding: 20px;
                }
                .description {
                  font-size: 12px;
                }
                .actionGroup {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                }
              `}</style>
        </article>
      ) : (
        <div className="menuItemContainer">
          <div className="menuThumbnail" />
          <div className="menuText">
            <div className="topPart">
              <div className="titleDiv">
                <span className="title">{dishName}</span>
                <EditDeleteGroup onEdit={onEdit} onDelete={onDelete} />
              </div>
              <span className="description">{description}</span>
            </div>
            <PublishButton
              isPublish={isPublish}
              onTogglePublish={onTogglePublish}
            />
          </div>
          <style jsx>
            {`
              .menuItemContainer {
                display: flex;
                max-width: 600px;
                width: 100%;
                height: 161px;
                border-radius: ${borderRadius};
                background-color: ${whiteColor};
              }

              .menuThumbnail {
                background-image: url('${thumbnailUrl}'), url('../static/img/pancake.jpg');
                background-size: cover;
                background-position: center;
                width: 161px;
                height: 161px;
                border-top-left-radius: ${borderRadius};
                border-bottom-left-radius: ${borderRadius};
              }

              .menuText {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                margin-left: 20px;
                padding: 20px;
              }

              .topPart {
                display: flex;
                flex-direction: column;
              }

              .titleDiv {
                display: flex;
                justify-content: space-between;
                margin-bottom: 12px;
              }

              .title {
                font-size: ${titleFontSize};
                color: ${textColor};
              }

              .description {
                font-size: ${subtitleFontSize};
                color: ${textColor};
              }
            `}
          </style>
        </div>
      )
    }
  </Media>
);

const enhance = compose(
  withState('isShowingDeleteConfirmModal', 'toggleDeleteConfirmModal', true),
  withHandlers({
    showDeleteConfirmModal: () => () => {
      toggleDeleteConfirmModal(true);
    },
    hideDeleteConfirmModal: () => () => {
      toggleDeleteConfirmModal(false);
    },
  }),
);

export default MenuItem;
