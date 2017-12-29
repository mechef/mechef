import Rx from 'rxjs/Rx';
import menuActions from '../actions/menuActions';
import errorActions from '../actions/errorActions';
import globalActions from '../actions/globalActions';
import { API_MENU, API_IMAGE } from '../utils/constants';

const initialState = {
  menuList: [],
  updatedMenu: {},
  currentMenuId: -1,
};

const menuReducer$ = Rx.Observable.of(() => initialState)
  .merge(
    menuActions.fetchMenus$.flatMap(() => (
      Rx.Observable.ajax({
        crossDomain: true,
        url: API_MENU,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: window.localStorage.getItem('jwt'),
        },
        responseType: 'json',
      }).map(data => {
        globalActions.showSpinner$.next(false);
        return state => ({
          ...state,
          menuList: data.response.menuList,
          updatedMenu: {},
        });
      }).catch((error) => {
        globalActions.showSpinner$.next(false);
        errorActions.setError$.next({ isShowModal: true, title: 'Get Menu List Error', message: error.message });
        return Rx.Observable.of(state => state);
      })
    )),
    menuActions.setCurrentMenuId$.map(menuId => state => ({
      ...state,
      currentMenuId: menuId,
    })),
    menuActions.setFields$.map(payload => state => ({
      ...state,
      updatedMenu: {
        ...state.updatedMenu,
        ...payload,
      }
    })),
    menuActions.createMenu$.flatMap(reqbody => (
      Rx.Observable.ajax({
        crossDomain: true,
        url: API_MENU,
        method: 'POST',
        body: reqbody,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: window.localStorage.getItem('jwt'),
        },
        responseType: 'json',
      }).map(data => (
        state => ({
          ...state,
          menuList: [...state.menuList, data.response.menu],
          updatedMenu: {},
        })
      )).catch((error) => {
        errorActions.setError$.next({ isShowModal: true, title: 'Create Menu Error', message: error.message });
        return Rx.Observable.of(state => state);
      })
    )),
    menuActions.updateMenu$.flatMap(reqbody => (
      Rx.Observable.ajax({
        crossDomain: true,
        url: `${API_MENU}/${reqbody._id}`,
        method: 'PATCH',
        body: reqbody,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: window.localStorage.getItem('jwt'),
        },
        responseType: 'json',
      }).map(data => (
        state => ({ ...state,
          menuList: state.menuList.map((menu) => {
            if (menu._id === data.response.menu._id) {
              return { ...menu, ...data.response.menu };
            }
            return menu;
          }),
          updatedMenu: {},
        })
      )).catch((error) => {
        errorActions.setError$.next({ isShowModal: true, title: 'Create Menu Error', message: error.message });
        return Rx.Observable.of(state => state);
      })
    )),
    menuActions.deleteMenu$.flatMap(menuId => (
      Rx.Observable.ajax({
        crossDomain: true,
        url: `${API_MENU}/${menuId}`,
        method: 'DELETE',
        body: {},
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: window.localStorage.getItem('jwt'),
        },
        responseType: 'json',
      }).map(() => (
        state => ({
          ...state,
          menuList: state.menuList.filter(menu => menu._id !== menuId),
        })
      )).catch((error) => {
        errorActions.setError$.next({ isShowModal: true, title: 'Delete Menu Error', message: error.message });
        return Rx.Observable.of(state => state);
      })
    )),
    menuActions.uploadImage$.map((file) => {
      const formData = new FormData();
      formData.append('image', file);
      return formData;
    }).flatMap(formData => (
      Rx.Observable.ajax({
        crossDomain: true,
        url: API_IMAGE,
        method: 'POST',
        body: formData,
        headers: {
          Authorization: window.localStorage.getItem('jwt'),
        },
        responseType: 'json',
      }).map(data => state => ({
          ...state,
          updatedMenu: {
            ...state.updatedMenu,
            images: state.updatedMenu.images ? [data.response.image, ...state.updatedMenu.images] : [data.response.image],
          }
        }))
        .catch((error) => {
          errorActions.setError$.next({ isShowModal: true, title: 'Create Menu Image Error', message: error.message });
          return Rx.Observable.of(state => state);
        })
    )),
  );

export default menuReducer$;
