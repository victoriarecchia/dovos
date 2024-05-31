  // function validateToken(header) {
  //   if (!header["authorization"]) {
  //     console.log("3. No hay token", header);
  //     throw new Error("Token not provided");
  //     //return res.status(401).json({ error: "Token no proporcionado" });
  //   }

  //   const [bearer, token] = header["authorization"].split(" ");

  //   if (bearer !== "Bearer") {
  //     console.log("4. No hay token", token);
  //     throw new Error("Token format invalid");
  //     //return res.status(401).json({ error: "Token mal formado" });
  //   }

  //   return token;
  // }

  // module.exports = validateToken;

  function validateToken(header) {
    if (!header || !header["authorization"]) {
      console.log("No hay token en el encabezado", header);
      throw new Error("Token not provided");
    }
  
    const authHeader = header["authorization"];
    const tokenParts = authHeader.split(" ");
  
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      console.log("Formato de token inválido", authHeader);
      throw new Error("Token format invalid");
    }
  
    return tokenParts[1]; // Devuelve solo el token, excluyendo "Bearer"
  }
  
  module.exports = validateToken;
  