import Rx from 'rxjs/Rx';

export default {
  fetchKitchen$: new Rx.Subject,
  setLoading$: new Rx.Subject,
};
