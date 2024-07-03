

  function validateToken(header) {
    if (!header || !header["authorization"]) {
      // console.log("No hay token en el encabezado", header);
      throw new Error("Token not provided");
    }
  
    const authHeader = header["authorization"];
    const tokenParts = authHeader.split(" ");
  
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      // console.log("Formato de token inválido", authHeader);
      throw new Error("Token format invalid");
    }
  
    return tokenParts[1]; 
  }
  
  module.exports = validateToken;
  