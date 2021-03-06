// @flow

import React from 'react';
import Rx from 'rxjs/Rx';
import { translate } from 'react-i18next';
import i18n from '../i18n';
import { connect } from '../state/RxState';
import ingredientActions from '../actions/ingredientActions';
import errorActions from '../actions/errorActions';
import globalActions from '../actions/globalActions';
import Modal from './Modal';
import IngredientList from './IngredientList';
import IngredientEdit from './IngredientEdit';
import DefaultComponent from './DefaultComponent';
import DashboardContentLayout from './DashboardContentLayout';
import * as styles from '../utils/styleVariables';
import type { MemoObject } from '../utils/flowTypes';
import Spinner from '../components/Spinner';

type Props = {
  ingredient: {
    memos: Array<MemoObject>,
    updatedMemoFields: MemoObject,
    currentMemoId: string,
    isLoading: boolean,
  },
  fetchMemos$: any => Rx.Observable,
  createMemo$: (memo: MemoObject) => Rx.Observable,
  updateMemo$: (memo: MemoObject) => Rx.Observable,
  deleteMemo$: (memoId: string) => Rx.Observable,
  setCurrentMemoId$: (memoId: string) => Rx.Observable,
  setFields$: (updatedField: MemoObject) => Rx.Observable,
  setError$: ({
    isShowModal: boolean,
    title: string,
    message: string,
  }) => Rx.Observable,
  error: {
    title: string,
    message: string,
    isShowModal: boolean,
  },
  global: {
    backArrow: {
      isShow: boolean,
      title: string,
    },
  },
  toggleBackArrow$: string => Rx.Observable,
  setLoading$: boolean => Rx.Observable,
  t: (key: string) => string,
};

export class IngredientPage extends React.Component<Props> {
  componentWillMount() {
    this.props.setLoading$(true);
  }
  componentDidMount() {
    this.props.fetchMemos$();
  }
  render() {
    const {
      ingredient: { memos, currentMemoId, updatedMemoFields, isLoading },
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
    const currentMemo =
      this.props.ingredient.memos.find(memo => memo._id === currentMemoId) ||
      {};
    const displayMemo = { ...currentMemo, ...updatedMemoFields };
    return (
      <DashboardContentLayout>
        {error.isShowModal ? (
          <Modal
            title={error.title}
            message={error.message}
            type="error"
            onCancel={() =>
              setError$({ isShowModal: false, title: '', message: '' })
            }
          />
        ) : null}
        {isLoading ? <Spinner /> : null}
        {backArrow.isShow ? (
          <IngredientEdit
            memos={memos}
            displayMemo={displayMemo}
            onCreateMemo={() => {
              createMemo$(currentMemo);
            }}
            onUpdateMemo={() => {
              updateMemo$({
                _id: currentMemo._id,
                ...updatedMemoFields,
              });
            }}
            onDeleteMemo={() => deleteMemo$(currentMemo._id || '')}
            onChangeField={setFields$}
            goBack={() => toggleBackArrow$('')}
            t={this.props.t}
          />
        ) : memos && memos.length ? (
          <IngredientList
            memos={memos}
            onDeleteMemo={memoId => deleteMemo$(memoId)}
            onEditMemo={memoId => {
              setCurrentMemoId$(memoId);
              toggleBackArrow$('Edit Ingredient');
            }}
            t={this.props.t}
          />
        ) : !isLoading ? (
          <DefaultComponent coverPhotoSrc="../static/img/ingredients_default.jpg">
            <div className="textSection">
              <h2 className="title">
                {this.props.t('ingredients_default_description')}
              </h2>
              <p className="description">{this.props.t('hello_there')}</p>
            </div>
            <button
              className="addDish"
              onClick={() => {
                setCurrentMemoId$('');
                toggleBackArrow$('Edit Ingredient');
              }}
            >
              {this.props.t('add_your_ingredients')}
            </button>
          </DefaultComponent>
        ) : null}
        <style jsx>
          {`
            .textSection {
              display: flex;
              flex-direction: column;
              align-items: center;
              padding-top: 31px;
            }
            .title {
              font-family: 'Playball', cursive;
              font-size: 2.4rem;
              color: ${styles.textColor};
            }

            .description {
              width: 315px;
              display: flex;
              justify-content: center;
              line-height: 1.5;
              font-size: 1.6rem;
              text-align: center;
              color: ${styles.textColor};
            }
            .addDish {
              border: 0;
              padding: 0;
              margin-top: 70px;
              background-color: ${styles.whiteColor};
              color: ${styles.primaryColor};
              font-size: 1.6rem;
              margin: auto;
              cursor: pointer;
              outline: none;
            }
            .addDish:hover {
              color: ${styles.primaryBtnHoverColor};
            }
          `}
        </style>
      </DashboardContentLayout>
    );
  }
}

const stateSelector = ({ ingredient, error, global }) => ({
  ingredient,
  error,
  global,
});

const actionSubjects = {
  ...errorActions,
  ...ingredientActions,
  ...globalActions,
};

const Extended = translate(['common'], {
  i18n,
  wait: typeof window !== 'undefined',
})(IngredientPage);

export default connect(
  stateSelector,
  actionSubjects,
)(Extended);
