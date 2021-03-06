import Rx from 'rxjs/Rx';

export default {
  fetchOrders$: new Rx.Subject(), // eslint-disable-line new-parens
  updateOrderState$: new Rx.Subject(),
  setLoading$: new Rx.Subject(),
  createOrder$: new Rx.Subject(),
};
