import Rx from 'rxjs/Rx';
import menuActions from '../actions/menuActions';
import errorActions from '../actions/errorActions';
import { API_MENU } from '../utils/constants';

const initialState = {
  menuList: [],
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
      }).map(data => state => ({
        ...state,
        menuList: data.response.menuList,
      })).catch((error) => {
        errorActions.setError$.next({ isShowModal: true, title: 'Get Menu List Error', message: error.message });
        return Rx.Observable.of(state => state);
      })
    )),
    menuActions.setCurrentMenuId$.map(menuId => state => ({
      ...state,
      currentMenuId: menuId,
    })),
    menuActions.createMenu$.map((reqbody) => {
      const formData = new FormData();
      Object.keys(reqbody).forEach((key) => {
        if (Array.isArray(reqbody[key])) {
          for (let i = 0; i < reqbody[key].length; i += 1) {
            formData.append(key, reqbody[key]);
          }
        } else {
          formData.append(key, reqbody[key]);
        }
      });
      return formData;
    }).flatMap(formData => (
      Rx.Observable.ajax({
        crossDomain: true,
        url: API_MENU,
        method: 'POST',
        body: formData,
        headers: {
          Authorization: window.localStorage.getItem('jwt'),
        },
        responseType: 'json',
      }).map(data => (
        state => ({
          ...state,
          menuList: [...state.menuList, data.response.menu],
        })
      )).catch((error) => {
        errorActions.setError$.next({ isShowModal: true, title: 'Create Menu Error', message: error.message });
        return Rx.Observable.of(state => state);
      })
    )),
    menuActions.updateMenu$.map((reqbody) => {
      const formData = new FormData();
      Object.keys(reqbody).forEach((key) => {
        if (Array.isArray(reqbody[key])) {
          for (let i = 0; i < reqbody[key].length; i += 1) {
            formData.append(key, reqbody[key]);
          }
        } else {
          formData.append(key, reqbody[key]);
        }
      });
      return formData;
    }).flatMap(formData => (
      Rx.Observable.ajax({
        crossDomain: true,
        url: `${API_MENU}/${formData.get('_id')}`,
        method: 'PATCH',
        body: formData,
        headers: {
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
  );

export default menuReducer$;
