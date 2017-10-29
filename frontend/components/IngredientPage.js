// @flow

import React from 'react';
import Rx from 'rxjs/Rx';

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
      _id: string,
      sum: number,
      name: string,
      ingredients: Array<{
        name: string,
        amount: number,
      }>,
    }>,
    currentMemoId: string,
  },
  fetchMemos$: any => Rx.Observable,
  createMemo$: ({
    name: string,
    ingredients: Array<{
      name: string,
      amount: number
    }>
  }) => Rx.Observable,
  updateMemo$: ({
    _id: string,
    name: string,
    ingredients: Array<{
      name: string,
      amount: number
    }>
  }) => Rx.Observable,
  deleteMemo$: (memoId: string) => Rx.Observable,
  setCurrentMemoId$: (memoId: string) => Rx.Observable,
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

export class IngredientPage extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchMemos$();
  }
  render() {
    const {
      ingredient: { memos, currentMemoId },
      setError$,
      error,
      global: { backArrow },
      createMemo$,
      updateMemo$,
      deleteMemo$,
      toggleBackArrow$,
      setCurrentMemoId$,
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
            <IngredientEdit
              memos={memos}
              currentMemoId={currentMemoId}
              onCreateMemo={createMemo$}
              onUpdateMemo={updateMemo$}
              onDeleteMemo={memoId => deleteMemo$(memoId)}
              goBack={() => toggleBackArrow$('')}
            />
            :
            <IngredientList
              memos={memos}
              onEditMemo={(memoId) => {
                setCurrentMemoId$(memoId);
                toggleBackArrow$('Edit Ingredient');
              }}
            />
        }
        <style jsx>
          {`
            .container {
              margin: 0;
              padding-top: 49px
              padding-left: 19px;
              width: 100%;
              min-height: 792px;
              height: 100%;
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
