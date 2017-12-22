import Rx from 'rxjs/Rx';

export default {
  fetchMemos$: new Rx.Subject, // eslint-disable-line new-parens
  addIngredient$: new Rx.Subject,
  createMemo$: new Rx.Subject,
  updateMemo$: new Rx.Subject,
  setFields$: new Rx.Subject,
  setCurrentMemoId$: new Rx.Subject,
  deleteMemo$: new Rx.Subject,
};
