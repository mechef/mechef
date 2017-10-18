import Rx from 'rxjs';

export default {
  fetchDelivery$: new Rx.Subject, // eslint-disable-line new-parens
  createMeetup$: new Rx.Subject,
  updateMeetup$: new Rx.Subject,
  setCurrentMeetupId$: new Rx.Subject,
  deleteMeetup$: new Rx.Subject,
};
