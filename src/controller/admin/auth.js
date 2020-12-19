const User = require("../../models/user");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user)
      return res.status(400).json({
        message: "Admin already exist with this email",
      });

    const { firstName, lastName, email, password } = req.body;
    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      username: Math.random().toString(),
      role: "admin",
    });

    _user.save((err, data) => {
      if (err)
        return res.status(400).json({
          message: err,
        });
      if (data)
        return res.status(201).json({
          message: "Admin Created Successfully",
        });
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email, role: "admin" }).exec((err, user) => {
    if (err)
      return res.status(400).json({
        message: err,
      });

    if (user) {
      if (user.authenticate(req.body.password) && user.role === "admin") {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "1hr",
          }
        );

        const { _id, firstName, lastName, email, role, fullname } = user;

        /* when key and value are same just write onec. e.g.
         wrtie this
          {
          one
          }
         
          instead of this
          {
          one:one;
          } */

        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            role,
            fullname,
          },
        });
      } else {
        res.status(400).json({
          message: "Invalid Password",
        });
      }
    } else {
      return res.status(400).json({
        message: "User Doesn't exists",
      });
    }
  });
};
