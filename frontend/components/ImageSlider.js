// @flow

import React from 'react';

import { IMAGE_URL } from '../utils/constants';

type ImageSliderProps = {
  images: Array<string>,
};

type ImageSliderState = {
  containerWidth: number,
  selectedIndex?: number,
  scrollPosition: number,
};

class ImageSlider extends React.Component<ImageSliderProps, ImageSliderState> {
  container: HTMLDivElement;

  constructor(props: ImageSliderProps) {
    super(props);

    this.state = {
      containerWidth: 0,
      selectedIndex: this.props.images.length > 0 ? 0 : undefined,
      scrollPosition: 0,
    };

    this.saveRef = this.saveRef.bind(this);
  }

  saveRef: Function;
  saveRef(container: HTMLDivElement) {
    this.container = container;
    if (this.container) {
      this.setState({ containerWidth: this.container.getBoundingClientRect().width });
    }
  }

  updatePosition: Function;
  updatePosition(index: number) {
    const scrollPosition = -1 * index * this.state.containerWidth;
    this.setState({ scrollPosition });
  }

  selectImage: Function;
  selectImage(index: number) {
    if (index !== this.state.selectedIndex) {
      this.setState({ selectedIndex: index });
      this.updatePosition(index);
    }
  }

  render() {
    return (
      <div ref={this.saveRef} className="image-slider">
        <div
          className="image-slider__images-container"
          style={{ left: `${this.state.scrollPosition}px`}}
        >
          {
            this.props.images.map((image) => (
              <div
                key={image}
                className="image-slider__image"
                style={{backgroundImage: `url('${image ? `${IMAGE_URL}/${image}` : '/static/svg/mechef_logo_white.svg'}'), url('/static/svg/mechef_logo_white.svg')`}} />
            ))
          }
        </div>
        <div className="image-slider__legend">
          {
            this.props.images.map((image, index) => (
              <div
                key={image}
                className={`image-slider__legend-circle${index === this.state.selectedIndex ? '--selected' : ''}`}
                onClick={() => { this.selectImage(index); }}>
              </div>
            ))
          }
        </div>
        <style jsx>
          {`
            .image-slider {
              position: relative;
              overflow: hidden;
            }
            .image-slider__images-container {
              background-color: #d8d8d8;
              background-repeat: no-repeat;
              background-size: 90px 60px;
              background-image: url('/static/svg/mechef_logo_white.svg');
              background-position: center;
              white-space: nowrap;
              height: 100%;
              width: 100%;
              position: relative;
              transform: translate(0, 0);
              transition-duration: 1s;
            }
            .image-slider__image {
              height: 100%;
              width: 100%;
              display: inline-block;
              background-repeat: no-repeat;
              background-size: contain;
              background-position: center;
              background-color: #d8d8d8;
            }
            .image-slider__legend {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              padding-top: 20px;
            }
            .image-slider__legend-circle {
              border: 1px solid #3f9f40;
            }
            .image-slider__legend-circle,
            .image-slider__legend-circle--selected {
              display: inline-block;
              box-sizing: border-box;
              width: 8px;
              height: 8px;
              border-radius: 100%;
              background-color: #ffffff;
              cursor: pointer;
            }
            .image-slider__legend-circle--selected {
              background-color: #3f9f40;
            }
            .image-slider__legend-circle + .image-slider__legend-circle,
            .image-slider__legend-circle + .image-slider__legend-circle--selected,
            .image-slider__legend-circle--selected + .image-slider__legend-circle {
              margin-left: 12px;
            }
          `}
        </style>
      </div>
    );
  }
}

export default ImageSlider;