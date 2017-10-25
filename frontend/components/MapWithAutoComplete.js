
import React from 'react';
import Rx from 'rxjs/Rx';
import fetch from 'isomorphic-unfetch';
import urlencoder from 'form-urlencoded';

import Header from '../components/Header';
import ErrorModal from '../components/ErrorModal';
import Button from '../components/Button';

import {
  primaryColor,
  largeWidth,
  mediumWidth,
  smallWidth,
  textInputHeight,
  textInputBgColor,
  borderRadius,
  placeholderTextColor,
  placeholderLineHeight,
  placeholderFontWeight,
  placeholderFontSize,
} from '../utils/styleVariables';

import Geosuggest from 'react-geosuggest';

class MapWithAutoComplete extends React.Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      map: null,
      marker: null
    };

  }

  componentDidMount() {
	  const map = new google.maps.Map(document.getElementById('map'), {
	    center: {lat: 25.0338836, lng: 121.5623212},
	    zoom: 8,
      panControl : false,
      mapTypeControl : false,
      streetViewControl : false,
      zoomControl : true,
      fullscreenControl : false
	  });

    const placesService = new google.maps.places.PlacesService(map);

    this.setState({map: map});

  }

  render() {
    return (
      <div style={{ width: 800 }}>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCrgd8aRUu0AczX8jVy5jpYzZOnjhgUpXw&libraries=places"></script>
        <div style={{ width: "100%", height: 400 }} id="map"></div>
        <Geosuggest onSuggestSelect={(suggest) => {
          console.log(suggest);
          if (this.state.marker) {
            this.state.marker.setMap(null);
          }

          const latlng = new google.maps.LatLng(suggest.location.lat, suggest.location.lng);
          this.state.map.setCenter(latlng);

          const marker = new google.maps.Marker({
            position: latlng,
            title: suggest.label,
            visible: true
          });

          marker.setMap(this.state.map);
          this.setState({marker: marker});

        }}/>
        <style>
        {`

            /**
            * Base
            */

            body {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              height: 100%;
            }

            .container {
              flex: 0 0 auto;
              max-width: ${largeWidth};
            }

            a {
              color: #3d464d;
              transition: color 0.2s;
            }

            a:hover, a:focus {
            color: #267dc0;
            }

            h1 {
            font-size: 72px;
            font-size: 4rem;
            font-weight: 100;
            margin-bottom: .5em;
            color: #267dc0;
            }

            .subheader {
            font-weight: 300;
            margin-bottom: 1.5em;
            }

            .hint {
            color: #ccc;
            margin: 2em 0;
            }

            .footer {
            font-weight: 300;
            padding-top: 2em;
            margin-top: 2em;
            border-top: 1px solid #ccc;
            }

            .ubilabs {
            vertical-align: middle;
            }
            /**
            * The geosuggest module
            * NOTE: duplicated font-sizes' are for browsers which don't support rem (only IE 8)
            */
            .geosuggest {
            font-size: 18px;
            font-size: 1rem;
            position: relative;
            width: 50%;
            margin: 1em auto;
            text-align: left;
            }
            .geosuggest__input {
              outline: none;
              border-radius: ${borderRadius};
              height: ${textInputHeight};
              background-color: ${textInputBgColor};
              padding-left: 16px;
              font-size: ${placeholderFontSize};
              font-weight: ${placeholderFontWeight};
              width: ${largeWidth};
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
            padding: 0;
            margin-top: -1px;
            background: #fff;
            border: 2px solid #267dc0;
            border-top-width: 0;
            overflow-x: hidden;
            overflow-y: auto;
            list-style: none;
            z-index: 5;
            -webkit-transition: max-height 0.2s, border 0.2s;
                    transition: max-height 0.2s, border 0.2s;
            }
            .geosuggest__suggests--hidden {
            max-height: 0;
            overflow: hidden;
            border-width: 0;
            }
            /**
            * A geosuggest item
            */
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
            font-weight: bold;
            }
        `}
        </style>
      </div>
    );
  }
}

export default MapWithAutoComplete;
