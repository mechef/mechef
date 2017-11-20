// @flow

import * as React from 'react';

import {
  primaryColor,
  borderRadius,
  whiteColor,
} from '../utils/styleVariables';

type Props = {
  onImageUpload: ({ image: File }) => mixed,
  imgSrc: string,
};

type State = {
  imageSrc: string,
}

class UploadImage extends React.Component<Props, State> {
  static defaultProps = {
    onImageUpload: () => {},
    imageSrc: '',
  }

  constructor(props: Props) {
    super(props);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.state = {
      imageSrc: props.imgSrc,
    };
  }

  handleImageUpload: Function;
  imageInput: ?HTMLInputElement;
  imageSrc: ?HTMLImageElement;

  handleImageUpload(event: any) {
    const file = event.target.files[0];
    const imgSrc = window.URL.createObjectURL(file);
    if (this.imageSrc && imgSrc) {
      this.imageSrc.src = imgSrc;
      this.setState({
        imageSrc: imgSrc,
      });
      this.props.onImageUpload(file);
    }
  }

  render() {
    return (
      <div className="container">
        <input
          ref={(input) => {
            this.imageInput = input;
          }}
          type="file"
          className="hidden"
          onChange={this.handleImageUpload}
        />
        <img
          ref={(input) => {
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
        <style jsx>
          {`
            .container {
              display: flex;
              width: 160px;
              height: 160px;
              border-radius: ${borderRadius};
              border: dotted 2px ${primaryColor};
            }

            .hidden {
              display: none;
            }

            .addBtn {
              display: ${this.state.imageSrc ? 'none' : 'flex'};
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
              background-repeat:no-repeat;
              width: 18px;
              height: 18px;
              outline: none;
            }

            .addBtn:hover .plus {
              background-image: url('../static/img/plus_hover.png');
            }

            .image {
              display: ${this.state.imageSrc ? 'flex' : 'none'};
              height: 160px;
              width: 160px;
              border-radius: ${borderRadius};
            }
          `}
        </style>
      </div>
    );
  }
}

export default UploadImage;
