
import React from 'react';
import Geosuggest from 'react-geosuggest';

import {
  primaryColor,
  textInputBgColor,
  borderRadius,
  placeholderTextColor,
  placeholderLineHeight,
  placeholderFontWeight,
  placeholderFontSize,
} from '../utils/styleVariables';


class MapWithAutoComplete extends React.Component<Props, State> {
  componentDidMount() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 25.0338836,
        lng: 121.5623212,
      },
      zoom: 8,
      panControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl: true,
      fullscreenControl: false,
    });

    // const placesService = new google.maps.places.PlacesService(map);
  }

  render() {
    return (
      <div className="container">
        <div className="mapWrapper" id="map" />
        <Geosuggest
          placeholder="Enter meet up address"
          onSuggestSelect={(suggest) => {
            if (this.marker) {
              this.marker.setMap(null);
            }
            const latlng = new google.maps.LatLng(suggest.location.lat, suggest.location.lng);
            this.map.setCenter(latlng);
            const marker = new google.maps.Marker({
              position: latlng,
              title: suggest.label,
              visible: true,
            });
            marker.setMap(this.map);
            this.marker = marker;
          }}
        />
        <style>{`
          .geosuggest {
            position: relative;
            width: 511px;
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
            width: 511px;
            border: 2px solid transparent;
            box-shadow: 0 0 1px #3d464d;
            transition: border 0.2s, box-shadow 0.2s;
          }
          .geosuggest__input:focus {
            border-color: ${primaryColor};
            box-shadow: 0 0 0 transparent;
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
            font-size: 18px;
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
        <style jsx>{`
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