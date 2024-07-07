const express = require("express");
const User = require("../schema/user");
const { jsonResponse } = require("../lib/jsonResponse");
const getUserInfo = require("../lib/getUserInfo");
const router = express.Router();

router.post("/", async function (req, res, next) {
  const { username, password } = req.body;

  try {
    let user = new User();
    const userExists = await user.usernameExists(username);

    if (userExists) {
      user = await User.findOne({ username: username });

      const passwordCorrect = await user.isCorrectPassword(
        password,
        user.password
      );

      if (passwordCorrect) {
        // Autenticar usuario
        const accessToken = user.createAccessToken();
        const refreshToken = await user.createRefreshToken();

        return res.json(
          jsonResponse(200, {
            accessToken,
            refreshToken,
            user: getUserInfo(user),
          })
        );
      } 
      else {
        return res.status(401).json(
          jsonResponse(401, {
            error: "Nombre de usuario o contraseña incorrecta",
          })
        );
      }
    } else {
      return res.status(401).json(
        jsonResponse(401, {
          error: "El nombre de usuario no existe",
        })
      );
    }
  } catch (err) {
    // console.log(err);
  }
});

module.exports = router;
