// @flow

import * as React from 'react';
import Rx from 'rxjs/Rx';

import {
  primaryColor,
  borderRadius,
  whiteColor,
} from '../utils/styleVariables';

type Props = {
  onImageUpload: File => Rx.Observable,
  imgSrc: string,
  onRemoveImage?: () => Rx.Observable,
};
type State = {
  isLoading: boolean,
};
class UploadImage extends React.Component<Props, State> {
  static defaultProps = {
    onImageUpload: () => {},
    imgSrc: '',
  };

  constructor(props: Props) {
    super(props);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.state = {
      isLoading: !!props.imgSrc,
    };
  }

  handleImageUpload: Function;
  imageInput: ?HTMLInputElement;
  imageSrc: ?HTMLImageElement;

  componentWillReceiveProps(newProps: Props) {
    if (newProps.imgSrc === this.props.imgSrc) {
      this.setState({ isLoading: false });
    } else {
      this.setState({ isLoading: true });
    }
  }

  handleImageUpload(event: any) {
    const file = event.target.files[0];
    const imgSrc = window.URL.createObjectURL(file);
    if (this.imageSrc && imgSrc) {
      // this.imageSrc.src = imgSrc;
      this.props.onImageUpload(file);
    }
  }

  render() {
    return (
      <div className="container">
        {this.props.imgSrc ? (
          <img
            className="preloadImage"
            src={this.props.imgSrc}
            alt="food"
            onLoad={() => this.setState({ isLoading: false })}
          />
        ) : null}
        {this.state.isLoading ? (
          <img
            className="loadingIndicator"
            src="../static/svg/loading-indicator.svg"
            alt="loading"
          />
        ) : (
          <div
            className={
              this.props.onRemoveImage
                ? 'uploadedImageWrapper'
                : 'addImageWrapper'
            }
            onClick={this.props.onRemoveImage ? this.props.onRemoveImage : ''}
          >
            <input
              ref={input => {
                this.imageInput = input;
              }}
              type="file"
              className="hidden"
              onChange={this.handleImageUpload}
            />
            <img
              ref={input => {
                this.imageSrc = input;
              }}
              className="image"
              src={this.props.imgSrc}
              alt="food"
            />
            <button
              className="addBtn"
              onClick={() => {
                if (this.imageInput) {
                  this.imageInput.click();
                }
              }}
            >
              <div className="plus" />
            </button>
          </div>
        )}
        <style jsx>
          {`
            .container {
              display: flex;
              width: 160px;
              height: 160px;
              border-radius: ${borderRadius};
              border: ${this.props.imgSrc ? 0 : `dotted 2px ${primaryColor}`};
            }

            .preloadImage {
              display: none;
            }

            .loadingIndicator {
              width: 100%;
            }

            .hidden {
              display: none;
            }

            .addImageWrapper {
              width: 100%;
              display: flex;
              position: relative;
              cursor: pointer;
            }

            .uploadedImageWrapper {
              width: 100%;
              display: flex;
              position: relative;
              cursor: pointer;
            }
            .addBtn {
              display: ${this.props.imgSrc ? 'none' : 'flex'};
              margin: auto;
              cursor: pointer;
              background-color: ${whiteColor};
              border: 0;
              outline: none;
            }

            .plus {
              background-image: url('../static/img/plus.png');
              background-size: contain;
              background-position: center;
              background-repeat: no-repeat;
              width: 18px;
              height: 18px;
              outline: none;
            }

            .addBtn:hover .plus {
              background-image: url('../static/img/plus_hover.png');
            }

            .image {
              display: ${this.props.imgSrc ? 'flex' : 'none'};
              height: 160px;
              width: 160px;
              border-radius: ${borderRadius};
              object-fit: cover;
            }
            .uploadedImageWrapper::before {
              content: 'X';
              color: ${whiteColor};
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              z-index: 2;
              background-color: rgba(0, 0, 0, 0.25);
              justify-content: center;
              align-items: center;
              display: none;
            }

            .uploadedImageWrapper:hover::before {
              display: flex;
            }
          `}
        </style>
      </div>
    );
  }
}

export default UploadImage;
