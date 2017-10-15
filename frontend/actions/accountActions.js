import Rx from 'rxjs';

export default {
  fetchAccountDetail$: new Rx.Subject,
  updateAccountDetail$: new Rx.Subject,
  setField$: new Rx.Subject,
};
