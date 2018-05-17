import Rx from 'rxjs/Rx';

export default {
  setLoading$: new Rx.Subject,
  restoreCart$: new Rx.Subject,
  addToCart$: new Rx.Subject,
  removeFromCart$: new Rx.Subject,
  modifyOrderInCart$: new Rx.Subject,
};
