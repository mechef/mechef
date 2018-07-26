import Rx from 'rxjs/Rx';

export default {
  fetchMenus$: new Rx.Subject(), // eslint-disable-line new-parens
  createMenu$: new Rx.Subject(),
  updateMenu$: new Rx.Subject(),
  setCurrentMenuId$: new Rx.Subject(),
  setFields$: new Rx.Subject(),
  deleteMenu$: new Rx.Subject(),
  uploadImage$: new Rx.Subject(),
  setMenuLoading$: new Rx.Subject(),
};
