// @flow

export type MeetupObject = {
  _id?: string,
  type?: string,
  note?: string,
  meetupAddress?: string,
  meetupLatitude?: number,
  meetupLongitude?: number,
  meetupSunday?: boolean,
  meetupMonday?: boolean,
  meetupTuesday?: boolean,
  meetupWednesday?: boolean,
  meetupThursday?: boolean,
  meetupFriday?: boolean,
  meetupSaturday?: boolean,
  meetupStartTime?: string,
  meetupEndTime?: string,
};

export type MemoObject = {
  _id?: string,
  sum?: number,
  name?: string,
  ingredients?: Array<{
    name: string,
    amount: number,
  }>,
};

export type MenuObject = {
  _id?: string,
  serving?: string,
  cookingBuffer?: string,
  description?: string,
  quantity?: number,
  unitPrice?: string,
  dishName?: string,
  email?: string,
  deliveryList?: Array<MeetupObject>,
  deliveryIdList?: Array<string>,
  images?: Array<string>,
  ingredients?: Array<string>,
  category?: Array<string>,
  publish?: boolean,
};

export type AccountObject = {
  _id?: string,
  name?: string,
  kitchenName?: string,
  kitchenDescription?: string,
  firstName?: string,
  lastName?: string,
  phoneNumber?: string,
  email?: string,
  coverPhoto?: string,
  profileImage?: string,
};

export type OrderState = 'cancelled' | 'waiting' | 'finished';

export type OrderObject = {
  _id?: string,
  buyerName: string,
  buyerEmail?: string,
  quantity: number,
  amount?: number,
  orderTime?: string,
  deliveryAddress?: string,
  deliveryTime: string,
  deliveryLatitude?: number,
  deliveryLongitude?: number,
  messageFromBuyer?: string,
  state?: OrderState,
  dishName?: string,
  image?: string,
};

export type KitchenObject = {
  _id?: string,
  kitchenName?: string,
  kitchenDescription?: string,
  coverPhoto?: string,
  profileImage?: string,
  menuList?: Array<MenuObject>,
  email?: string,
};

export type CartOrderObject = {
  _id: number,
  dishId?: string,
  quantity?: number,
  messageFromBuyer?: string,
  dishName?: string,
  description?: string,
  unitPrice?: number,
  images?: Array<string>,
  maxServing?: number,
};

export type CartObject = {
  orders?: Array<CartOrderObject>,
};
