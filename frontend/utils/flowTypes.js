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
  images?: Array<string>,
  ingredients?: Array<string>,
  category?: Array<string>,
  publish?: bool,
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
  update?: {
    name?: string,
    kitchenName?: string,
    kitchenDescription?: string,
    firstName?: string,
    lastName?: string,
    phoneNumber?: string,
    email?: string,
    coverPhoto?: string,
    profileImage?: string,
  },
};

export type OrderObject = {
  _id: string,
  buyerName: string,
  buyerEmail: string,
  quantity: number,
  amount: number,
  orderTime: string,
  deliveryAddress: string,
  deliveryTime: string,
  deliveryLatitude: number,
  deliveryLongtitude: number,
  messageFromBuyer: string,
  state: string,
  dishName: string,
  image: string,
};
