module.exports = {
  secret: 'hello_mechef',
  database: 'mongodb://localhost/jwt_dev',
  fail: 'fail',
  success: 'success',
  no_token: 'no_token',
  id_not_found: 'id not found',
  email_not_found: 'email not found',
  jwt_verification_error: 'jwt verification error',
  order_state: {
    waiting: 'waiting',
    cancelled: 'cancelled',
    finished: 'finished',
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
  verifyRequestMessage: 'The following fields can not be null: ',
};
