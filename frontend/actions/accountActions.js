import Rx from 'rxjs/Rx';

export default {
  fetchAccountDetail$: new Rx.Subject,
  updateAccountDetail$: new Rx.Subject,
  setField$: new Rx.Subject,
};
