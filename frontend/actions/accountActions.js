import Rx from 'rxjs/Rx';

export default {
  fetchAccountDetail$: new Rx.Subject,
  updateAccountDetail$: new Rx.Subject,
  setFields$: new Rx.Subject,
  createProfileImage$: new Rx.Subject,
  createCoverPhoto$: new Rx.Subject,
};
