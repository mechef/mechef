import Rx from 'rxjs';

export default {
  fetchMemos$: new Rx.Subject, // eslint-disable-line new-parens
  addIngredient$: new Rx.Subject,
  createMemo$: new Rx.Subject,
  setCurrentMemoId$: new Rx.Subject,
};
