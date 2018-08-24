import React from 'react';
import Geosuggest from 'react-geosuggest';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '../utils/constants';

import {
  primaryColor,
  textInputBgColor,
  borderRadius,
  placeholderTextColor,
  placeholderLineHeight,
  placeholderFontWeight,
  placeholderFontSize,
} from '../utils/styleVariables';

type Props = {
  initialValue: string,
  initialLat: number,
  initialLong: number,
  onChange: () => mixed,
  onSuggestSelect: () => mixed,
};

class MapWithAutoComplete extends React.Component<Props> {
  static defaultProps = {
    initialValue: '',
    initialLat: DEFAULT_LATITUDE,
    initialLong: DEFAULT_LONGITUDE,
    onChange: () => {},
    onSuggestSelect: () => {},
  };

  componentDidMount() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: this.props.initialLat,
        lng: this.props.initialLong,
      },
      zoom: 15,
      panControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl: true,
      fullscreenControl: false,
    });
    this.setInitialMarker();
    // const placesService = new google.maps.places.PlacesService(map);
  }

  setInitialMarker = () => {
    if (this.map) {
      const latlng = new google.maps.LatLng(
        this.props.initialLat,
        this.props.initialLong,
      );
      this.map.setCenter(latlng);
      const marker = new google.maps.Marker({
        position: latlng,
        title: this.props.initialValue,
        visible: true,
      });
      marker.setMap(this.map);
      this.marker = marker;
    }
  };

  render() {
    return (
      <div className="container">
        <div className="mapWrapper" id="map" />
        <Geosuggest
          initialValue={this.props.initialValue}
          placeholder="Enter meet up address"
          onSuggestSelect={suggest => {
            if (this.marker) {
              this.marker.setMap(null);
            }
            const latlng = new google.maps.LatLng(
              suggest.location.lat,
              suggest.location.lng,
            );
            this.map.setCenter(latlng);
            const marker = new google.maps.Marker({
              position: latlng,
              title: suggest.label,
              visible: true,
            });
            marker.setMap(this.map);
            this.marker = marker;
            this.props.onSuggestSelect({
              address: suggest.label,
              latitude: suggest.location.lat,
              longitude: suggest.location.lng,
            });
          }}
          maxLength={50}
          onChange={this.props.onChange}
        />
        <style>
          {`
          .geosuggest {
            position: relative;
            max-width: 511px;
            margin-bottom: 13px;
          }
          .geosuggest__input {
            outline: none;
            border-radius: ${borderRadius};
            height: 44px;
            background-color: ${textInputBgColor};
            padding-left: 18px;
            font-size: ${placeholderFontSize};
            font-weight: ${placeholderFontWeight};
            max-width: 511px;
            width: 100%;
            border: 2px solid transparent;
            box-shadow: 0 0 1px #3d464d;
            transition: border 0.2s, box-shadow 0.2s;
            box-sizing: border-box;
          }
          .geosuggest__input:focus {
            border-color: ${primaryColor};
            box-shadow: 0 0 0 transparent;
          }

          .geosuggest__input-wrapper:after {
            content: '';
            position: absolute;
            z-index: 2;
            background-image: url('../static/svg/location.svg');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            top: calc(50% - 8px);
            right: 18px;
            width: 16px;
            height: 16px;
          }
          .geosuggest__suggests {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            max-height: 25em;
            padding-left: 18px;
            width: 511px;
            height: 161px;
            margin-top: -1px;
            background: #fff;
            border: 2px solid #267dc0;
            border-top-width: 0;
            overflow-x: hidden;
            overflow-y: auto;
            list-style: none;
            z-index: 5;
            transition: max-height 0.2s, border 0.2s;
          }
          .geosuggest__suggests--hidden {
            max-height: 0;
            overflow: hidden;
            border-width: 0;
          }

          .geosuggest__item {
            font-size: 1.8rem;
            font-size: 1rem;
            padding: .5em .65em;
            cursor: pointer;
          }

          .geosuggest__item:hover,
          .geosuggest__item:focus {
            background: #f5f5f5;
          }

          .geosuggest__item--active {
            background: #267dc0;
            color: #fff;
          }
          .geosuggest__item--active:hover,
          .geosuggest__item--active:focus {
            background: #ccc;
          }
          .geosuggest__item__matched-text {
            font-weight: 500;
          }

          .geosuggest__input-wrapper > input::placeholder {
            line-height: ${placeholderLineHeight};
            color: ${placeholderTextColor};
          }

        `}
        </style>
        <style jsx>
          {`
            .container {
              display: flex;
              flex-direction: column-reverse;
              width: 100%;
            }
            .mapWrapper {
              width: 100%;
              height: 161px;
            }
          `}
        </style>
      </div>
    );
  }
}

export default MapWithAutoComplete;
