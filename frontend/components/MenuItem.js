// @flow

import React from 'react';
import Rx from 'rxjs/Rx';

import { borderRadius, whiteColor, primaryColor, lineHeight, titleFontSize, subtitleFontSize, textColor, textHintColor, transparent } from '../utils/styleVariables';

type Props = {
  dishName: string,
  description: string,
  thumbnailUrl: string,
  isPublish: boolean,
  onTogglePublish: (isPublish: boolean) => Rx.Observable,
  onEdit: () => Rx.Observable,
  onDelete: () => Rx.Observable,
}

type State = {
  isPublish: boolean,
}

class MenuItem extends React.Component<Props, State> {

  static defaultProps = {
    description: '',
    thumbnailUrl: '',
    isPublish: false,
    onTogglePublish: () => { },
    onEdit: () => { },
    onDelete: () => { },
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      isPublish: props.isPublish,
    };
  }

  componentWillReceiveProps(newProps: Props) {
    this.setState({
      isPublish: newProps.isPublish,
    });
  }

  handleChange = () => {
    this.props.onTogglePublish(!this.state.isPublish);
    this.setState({
      isPublish: !this.state.isPublish,
    });
  }

  render() {
    return (
      <div className="menuItemContainer">
        <div className="menuThumbnail" />
        <div className="menuText">
          <div className="topPart">
            <div className="titleDiv">
              <span className="title">{this.props.dishName}</span>
              <div className="iconWrapper">
                <button className="btn" onClick={this.props.onEdit}>
                  <div className="icon editIcon" />
                </button>
                <button className="btn" onClick={this.props.onDelete}>
                  <div className="icon deleteIcon" />
                </button>
              </div>
            </div>
            <span className="description">{this.props.description}</span>
          </div>
          <button
            className={`
              bottomPart
              ${this.state.isPublish ? 'publishedToggleBtn' : 'unpublishedToggleBtn'}
            `}
            onClick={this.handleChange}
          >
            <div className={`${this.state.isPublish ? 'publishedCircle' : 'unpublishedCircle'}`} />
            <span className={`${this.state.isPublish ? 'publishedText' : 'unpublishedText'}`}>
              {
                this.state.isPublish ?
                  'PUBLISH'
                  :
                  'UNPUBLISH'
              }
            </span>
          </button>
        </div>
        <style jsx>
          {`
            .menuItemContainer {
              display: flex;
              width: 600px;
              height: 161px;
              border-radius: ${borderRadius};
              background-color: ${whiteColor};
            }

            .menuThumbnail {
              background-image: url('${this.props.thumbnailUrl}'), url('../static/pancake.jpg');
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
              padding-top: 19px;
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
              margin-right: 20px;
              margin-bottom: 20px;
              cursor: pointer;
              outline: none;
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

            .iconWrapper {
              margin-right: 21px;
            }

            .btn {
              cursor: pointer;
              background-color: ${transparent};
              border: 0;
              outline: none;
              margin-left: 30px;
            }

            .icon {
              background-size: contain;
              background-position: center;
              background-repeat:no-repeat;
              width: 14px;
              height: 14px;
              outline: none;
            }

            .editIcon {
              background-image: url('../static/svg/edit_icon.svg');
            }

            .deleteIcon {
              background-image: url('../static/svg/delete_icon.svg');
            }

            .btn:hover .editIcon {
              background-image: url('../static/svg/edit_icon_hover.svg');
            }
            .btn:hover .deleteIcon {
              background-image: url('../static/svg/delete_icon_hover.svg');
            }
          `}
        </style>
      </div>
    );
  }
}


export default MenuItem;
