import Rx from 'rxjs/Rx';

export default {
  fetchDish$: new Rx.Subject(),
  setLoading$: new Rx.Subject(),
};
