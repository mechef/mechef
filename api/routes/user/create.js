var User = require('../../models/user');

module.exports = (req, res) => {
	var user = new User();

  user.name = req.body.name;

	user.save(function(err) {
	    if (err)
	      res.send(err);

	    res.json({ message: 'User added!', data: user });
	  });
};
