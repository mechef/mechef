import React from 'react';
import PropTypes from 'prop-types';

import { connect } from '../state/RxState';
import ingredientActions from '../actions/ingredientActions';
import errorActions from '../actions/errorActions';
import ErrorModal from '../components/ErrorModal';

class Ingredient extends React.Component {
  componentDidMount() {
    this.props.fetchMemos$();
  }
  render() {
    const { ingredient: { memos }, setError$, error } = this.props;
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
        <div className="header">
          <span className="title">Ingredients List</span>
          <div className="addButton">
            <i className="fa fa-plus plus-icon" aria-hidden="true" />
          </div>
        </div>
        {/* TODO: state shape of ingredientList might be modified  */}
        {
          memos.map(memo => (
            <div key={memo.id} className="ingredient-list">
              <div className="ingredient-item">
                <div className="ingredient-content">
                  <p className="ingredient-title">{memo.name}</p>
                  <p className="ingredient-detail">
                    <span className="ingredient-subtext">Ingredient: {memo.ingredients && memo.length}</span>
                    <span className="ingredient-subtext">Total: {`$${memo.sum}`}</span>
                  </p>
                </div>
                <span className="update-button">
                  <span className="update-button-text">UPDATE</span>
                </span>
              </div>
            </div>
          ))
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
            .header {
              display: flex;
              align-items: center;
              padding-bottom: 22px;
            }
            .title {
              font-size: 18px;
              line-height: 1.11;
              letter-spacing: 0.5px;
              color: #4a4a4a;
            }
            .addButton {
              display: flex;
              width: 36px;
              height: 36px;
              margin-left: 20px;
              border-radius: 4px;
              background-color: #ffffff;
            }
            .plus-icon {
              margin: auto;
              color: #009245;
            }
            .addButton:hover {
              background-color: #3e9f40;
            }
            .addButton:hover .plus-icon {
              color: #ffffff;
            }
            .ingredient-item {
              display: flex;
              justify-content: space-between;
              margin-bottom: 12px;
              padding: 30px 20px 30px 15px;
              width: 100%;
              border-radius: 4px;
              background-color: #ffffff;
            }
            .ingredient-content {
              display: flex;
              flex-direction: column;
            }
            .ingredient-title {
              font-size: 16px;
              font-weight: 500;
              line-height: 1;
              letter-spacing: 0.7px;
              text-align: left;
              color: #4a4a4a;
            }
            .ingredient-detail {
              padding-top: 16px;
            }
            .ingredient-subtext {
              margin-right: 40px;
              font-size: 14px;
              font-weight: 500;
              line-height: 1.14;
              letter-spacing: 0.6px;
              text-align: left;
              color: #9b9b9b;
            }
            .update-button {
              display: flex;
              margin-top: auto;
              margin-bottom: auto;
              width: 150px;
              height: 40px;
              border-radius: 4px;
              background-color: #3e9f40;
            }
            .update-button-text {
              margin: auto;
              font-size: 14px;
              font-weight: 500;
              line-height: 1.14;
              color: #ffffff;
              cursor: default;
            }
            .update-button:hover, .update-button:active {
              background-color: #969696;
            }
          `}
        </style>
      </div>
    );
  }
}

Ingredient.propTypes = {
  ingredient: PropTypes.shape({
    memos: PropTypes.arrayOf(PropTypes.shape({
      sum: PropTypes.number,
      name: PropTypes.string,
      ingredients: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        amount: PropTypes.number,
      })),
    })),
  }),
  fetchMemos$: PropTypes.func.isRequired,
  setError$: PropTypes.func.isRequired,
  error: PropTypes.shape({
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    isShowModal: PropTypes.bool.isRequired,
  }),
};

Ingredient.defaultProps = {
  ingredient: {
    memos: [],
  },
  error: {
    title: '',
    message: '',
    isShowModal: false,
  },
};


const stateSelector = ({ ingredient, error }) => ({ ingredient, error });

const actionSubjects = {
  ...errorActions,
  ...ingredientActions,
};

export default connect(stateSelector, actionSubjects)(Ingredient);
