import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { connect } from '../state/RxState';
import ingredientActions from '../actions/ingredientActions';
// import { fetchIngredientBegin } from '../actions/ingredient';
// import { closeErrorModal } from '../actions/errorModal';
// import ErrorModal from '../components/ErrorModal';

class Ingredient extends React.Component {
  componentDidMount() {
    this.props.fetchIngredient$();
  }
  render() {
    const ingredientList = this.props.ingredient.ingredientList;
    return (
      <div className="container">
        {/* {
          this.props.errorModal.isShow ?
            <ErrorModal
              title={this.props.errorModal.title}
              message={this.props.errorModal.message}
              onCancel={this.props.closeErrorModal}
            />
            : null
        } */}
        <div className="header">
          <span className="title">Ingredients List</span>
          <div className="addButton">
            <i className="fa fa-plus plus-icon" aria-hidden="true" />
          </div>
        </div>
        {/* TODO: state shape of ingredientList might be modified  */}
        {
          ingredientList.map(() => (
            <div className="ingredient-list">
              <div className="ingredient-item">
                <div className="ingredient-content">
                  <p className="ingredient-title">Jasmine Tea</p>
                  <p className="ingredient-detail">
                    <span className="ingredient-subtext">Ingredient: 4</span>
                    <span className="ingredient-subtext">Total: $300</span>
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
              height: 998px;
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
  ingredientList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  })).isRequired,
  fetchIngredientList: PropTypes.func.isRequired,
  closeErrorModal: PropTypes.func,
  // errorModal: PropTypes.shape({
  //   title: PropTypes.string.isRequired,
  //   message: PropTypes.string.isRequired,
  //   isShow: PropTypes.bool.isRequired,
  // }),
};

Ingredient.defaultProps = {
  closeErrorModal: () => {},
  // errorModal: {
  //   title: '',
  //   message: '',
  //   isShow: false,
  // },
};

const stateSelector = state => ({ ingredient: state.ingredient });


export default connect(stateSelector, ingredientActions)(Ingredient);

// const mapStateToProps = state => ({
//   ingredientList: state.ingredient.ingredientList,
//   errorModal: state.errorModal,
// });

// const mapDispatchToProps = dispatch => ({
//   fetchIngredientList: () => {
//     dispatch(fetchIngredientBegin());
//   },
//   closeErrorModal: () => {
//     dispatch(closeErrorModal());
//   },
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Ingredient);
