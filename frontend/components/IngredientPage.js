// @flow

import React from 'react';
import Rx from 'rxjs/Rx';

import { connect } from '../state/RxState';
import ingredientActions from '../actions/ingredientActions';
import errorActions from '../actions/errorActions';
import globalActions from '../actions/globalActions';
import Modal from './Modal';
import IngredientList from './IngredientList';
import IngredientEdit from './IngredientEdit';
import DefaultComponent from './DefaultComponent';
import { whiteColor, primaryColor, textColor, primaryBtnHoverColor } from '../utils/styleVariables';
import { MemoObject } from '../utils/flowTypes';
import Spinner from '../components/Spinner';

type Props = {
  ingredient: {
    memos: Array<MemoObject>,
    updatedMemo: MemoObject,
    currentMemoId: string,
    isLoading: boolean,
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
  setFields$: (updatedField: MemoObject) => Rx.Observable,
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
  setLoading$: boolean => Rx.Observable,
}

export class IngredientPage extends React.Component<Props> {
  componentWillMount() {
    this.props.setLoading$(true);
  }
  componentDidMount() {
    this.props.fetchMemos$();
  }
  render() {
    const {
      ingredient: { memos, currentMemoId, updatedMemo, isLoading },
      setError$,
      error,
      global: { backArrow },
      createMemo$,
      updateMemo$,
      deleteMemo$,
      setFields$,
      toggleBackArrow$,
      setCurrentMemoId$,
    } = this.props;
    const currentMemo = this.props.ingredient.memos.find(memo => memo._id === currentMemoId) || {};
    return (
      <div className="container">
        {
          error.isShowModal ?
            <Modal
              title={error.title}
              message={error.message}
              onCancel={() => setError$({ isShowModal: false, title: '', message: '' })}
            />
            : null
        }
        {
          isLoading ?
            <Spinner />
            :
            null
        }
        {
          backArrow.isShow ?
            <IngredientEdit
              memos={memos}
              currentMemo={currentMemo}
              updatedMemo={updatedMemo}
              onCreateMemo={createMemo$}
              onUpdateMemo={updateMemo$}
              onDeleteMemo={memoId => deleteMemo$(memoId)}
              onChangeField={setFields$}
              goBack={() => toggleBackArrow$('')}
            />
            :
            memos && memos.length ?
              <IngredientList
                memos={memos}
                onDeleteMemo={memoId => deleteMemo$(memoId)}
                onEditMemo={(memoId) => {
                  setCurrentMemoId$(memoId);
                  toggleBackArrow$('Edit Ingredient');
                }}
              />
              : !isLoading ?
                <DefaultComponent
                  coverPhotoSrc="../static/img/ingredients_default.jpg"
                >
                  <div className="textSection">
                    <h2 className="title">Hello there!</h2>
                    <p className="description">This is the place to record your ingredients spendings, and a shopping list!</p>
                  </div>
                  <button
                    className="addDish"
                    onClick={() => {
                      setCurrentMemoId$('');
                      toggleBackArrow$('Edit Ingredient');
                    }}
                  >
                    ADD YOUR INGREDIENTS
                  </button>
                </DefaultComponent>
                : null

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
              overflow: scroll;
            }

            .textSection {
              display: flex;
              flex-direction: column;
              align-items: center;
              padding-top: 31px;
            }
            .title {
              font-family: 'Playball', cursive;
              font-size: 24px;
              color: ${textColor};
            }

            .description {
              width: 315px;
              display: flex;
              justify-content: center;
              line-height: 1.5;
              font-size: 16px;
              text-align: center;
              color: ${textColor};
            }
            .addDish {
              border: 0;
              padding: 0;
              margin-top: 70px;
              background-color: ${whiteColor};
              color: ${primaryColor};
              font-size: 16px;
              margin: auto;
              cursor: pointer;
              outline: none;
            }
            .addDish:hover {
              color: ${primaryBtnHoverColor};
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
