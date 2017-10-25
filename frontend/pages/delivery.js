
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
import MapWithAutoComplete from '../components/MapWithAutoComplete';

import Geosuggest from 'react-geosuggest';

class Login extends React.Component<Props, State> {

  constructor(props) {
    super(props);

  }


  render() {
    return (
      <div>
        <MapWithAutoComplete />
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
