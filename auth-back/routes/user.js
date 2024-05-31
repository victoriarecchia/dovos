const express = require("express");
const { jsonResponse } = require("../lib/jsonResponse");
const log = require("../lib/trace");
const router = express.Router();
const User = require("../schema/user.js")


router.get("/", async function (req, res, next) {
  log.info("user", req.user);

  res.json(jsonResponse(200, req.user));

});


router.get("/users", async function (req, res, next) {
    try {
      const users = await User.find({}); // Busca todos los usuarios en la base de datos
      res.json(users);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      res.status(500).json({ message: "Error al obtener los usuarios" });
    }
});





module.exports = router;



