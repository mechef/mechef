// @flow

import React from 'react';
import Rx from 'rxjs/Rx';
import fetch from 'isomorphic-unfetch';
import urlencoder from 'form-urlencoded';

import { connect } from '../state/RxState';
import authActions from '../actions/authActions';
import errorActions from '../actions/errorActions';
import { API_REGISTER } from '../utils/constants';
import Header from '../components/Header';
import ErrorModal from '../components/ErrorModal';
import Button from '../components/Button';
import TextInput from '../components/TextInput';

import Geosuggest from 'react-geosuggest';

class Login extends React.Component<Props, State> {

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
        *, :before, :after {
        margin: 0;
        padding: 0;
        position: relative;
        box-sizing: border-box;
        }

        input, select, button, textarea {
        -webkit-appearance: none;
        -moz-appearance: none;
        -moz-appearance: none;
        font: inherit;
        color: inherit;
        }

        /**
        * Base
        */
        html {
        font: 112.5%/1.2 "Roboto", Arial, sans-serif;
        color: #3d464d;
        background-color: #fff;
        font-weight: 300;
        -webkit-font-smoothing: antialiased;
        width: 100%;
        height: 100%;
        overflow: hidden-x;
        text-align: center;
        }

        body {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
            -ms-flex-align: center;
                align-items: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
            -ms-flex-pack: center;
                justify-content: center;
        width: 100%;
        height: 100%;
        }

        .container {
        -webkit-box-flex: 0;
        -webkit-flex: 0 0 auto;
            -ms-flex: 0 0 auto;
                flex: 0 0 auto;
        max-width: 612px;
        max-width: 34rem;
        }

        a {
        color: #3d464d;
        -webkit-transition: color 0.2s;
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
        width: 400px;
        border: 2px solid transparent;
        box-shadow: 0 0 1px #3d464d;
        padding: .5em 1em;
        -webkit-transition: border 0.2s, box-shadow 0.2s;
                transition: border 0.2s, box-shadow 0.2s;
        }
        .geosuggest__input:focus {
        border-color: #267dc0;
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

const stateSelector = ({ auth, error }) => ({ auth, error });

const actionSubjects = {
  ...errorActions,
  ...authActions,
};

export default connect(stateSelector, actionSubjects)(Login);
