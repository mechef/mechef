import Rx from 'rxjs/Rx';

export default {
  createImage$: new Rx.Subject(),
  getImage$: new Rx.Subject(),
};
