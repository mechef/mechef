import React from 'react';
import PropTypes from 'prop-types';

import { connect } from '../state/RxState';
import ingredientActions from '../actions/ingredientActions';
import errorActions from '../actions/errorActions';
import globalActions from '../actions/globalActions';
import ErrorModal from './ErrorModal';
import IngredientList from './IngredientList';
import IngredientEdit from './IngredientEdit';

class IngredientPage extends React.Component {
  componentDidMount() {
    this.props.fetchMemos$();
  }
  render() {
    const { ingredient: { memos }, setError$, error, global: { backArrow }, toggleBackArrow$ } = this.props;
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
            <IngredientEdit />
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

IngredientPage.propTypes = {
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

IngredientPage.defaultProps = {
  ingredient: {
    memos: [],
  },
  error: {
    title: '',
    message: '',
    isShowModal: false,
  },
};


const stateSelector = ({ ingredient, error, global }) => ({ ingredient, error, global });

const actionSubjects = {
  ...errorActions,
  ...ingredientActions,
  ...globalActions,
};

export default connect(stateSelector, actionSubjects)(IngredientPage);
