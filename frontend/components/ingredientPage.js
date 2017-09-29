// @flow

import React from 'react';
import Rx from 'rxjs';

import { connect } from '../state/RxState';
import ingredientActions from '../actions/ingredientActions';
import errorActions from '../actions/errorActions';
import globalActions from '../actions/globalActions';
import ErrorModal from './ErrorModal';
import IngredientList from './IngredientList';
import IngredientEdit from './IngredientEdit';

type Props = {
  ingredient: {
    memos: Array<{
      id: string,
      sum: number,
      name: string,
      ingredients: Array<{
        name: string,
        amount: number,
      }>,
    }>,
  },
  fetchMemos$: any => Rx.Observable,
  addIngredient$: ({ name: string, amount: number }) => Rx.Observable,
  createMemo$: ({ name: string, ingredients: Array<{ name: string, amount: number }> }) => Rx.Observable,
  setError$: ({ isShowModal: boolean, title: string, message: string }) => Rx.Observable,
  error: {
    title: string,
    message: string,
    isShowModal: bool,
  },
  global: {
    backArrow: {
      isShow: boolean,
      title: string,
    },
  },
  toggleBackArrow$: string => Rx.Observable,
}

class IngredientPage extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchMemos$();
  }
  render() {
    const {
      ingredient: { memos },
      setError$,
      error,
      global: { backArrow },
      toggleBackArrow$,
    } = this.props;
    return (
      <div className="container">
        {
          error.isShowModal ?
            <ErrorModal
              title={error.title}
              message={error.message}
              onCancel={() => setError$({ isShowModal: false, title: '', message: '' })}
            />
            : null
        }
        {
          backArrow.isShow ?
            <IngredientEdit onAddIngredient={this.props.addIngredient$} onCreateMemo={this.props.createMemo$} />
            :
            <IngredientList memos={memos} onAdd={() => toggleBackArrow$('Edit Ingredient')} />
        }
        <style jsx>
          {`
            .container {
              margin: 0;
              padding-top: 49px
              padding-left: 19px;
              width: 100%;
              height: 792px;
              background-color: #f8f7f7;
            }
          `}
        </style>
      </div>
    );
  }
}


const stateSelector = ({ ingredient, error, global }) => ({ ingredient, error, global });

const actionSubjects = {
  ...errorActions,
  ...ingredientActions,
  ...globalActions,
};

export default connect(stateSelector, actionSubjects)(IngredientPage);
