

const express = require("express");
const router = express.Router();
const authenticateToken = require("../auth/authenticateToken");
const User = require("../schema/user");

// Obtener perfil de usuario
router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id; // ID del usuario autenticado
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error al obtener el perfil:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Actualizar perfil de usuario
router.put("/", authenticateToken, async (req, res) => {
  const userId = req.user.id; // ID del usuario autenticado
  const { nombre, apellido, factor, ciudad, provincia, rol, telefono,cp } = req.body;

  try {
    // Busca al usuario en la base de datos por su ID y actualiza sus datos
    const user = await User.findByIdAndUpdate(
      userId,
      { nombre, apellido, factor, ciudad, provincia, rol, telefono, cp},
      { new: true } // Devuelve el documento actualizado
    );

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Perfil actualizado correctamente", user });
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
