const express = require("express");
const User = require("../schema/user");
const { jsonResponse } = require("../lib/jsonResponse");
const router = express.Router();

router.post("/", async function (req, res, next) {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    //return next(new Error("username and password are required"));
    return res.status(409).json(
      jsonResponse(409, {
        error: "Rellene todos los campos",
      })
    );
  }

  try {
    const user = new User();
    const userExists = await user.usernameExists(username);

    if (userExists) {
      return res.status(409).json(
        jsonResponse(409, {
          error: "El nombre de usuario ya existe",
        })
      );
      //return next(new Error("user already exists"));
    } else {
      const user = new User({ username, password, email });

      user.save();

      res.json(
        jsonResponse(200, {
          message: "User created successfully",
        })
      );
    }
  } catch (err) {
    return res.status(500).json(
      jsonResponse(500, {
        error: "Error creating user",
      })
    );
    //return next(new Error(err.message));
  }
});

module.exports = router;
