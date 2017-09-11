module.exports = {
  secret: 'hello_mechef',
  database: 'mongodb://localhost/jwt_dev',
  fail: 'fail',
  success: 'success',
  no_token: 'no_token',
  id_not_found: 'id not found',
  order_state: {
    pending: 'pending',
    contacting: 'contacting',
    delivered: 'delivered',
  },
  delivery_type: {
    meetup: 'meetup',
    shipping: 'shipping',
  },
  day: {
    sunday: 'sunday',
    monday: 'monday',
    tuesday: 'tuesday',
    wednesday: 'wednesday',
    thursday: 'thursday',
    friday: 'friday',
    saturday: 'saturday',
  },
  domain: 'http://localhost:3001',
};
