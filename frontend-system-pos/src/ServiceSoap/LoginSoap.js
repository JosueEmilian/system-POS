export function buildXml(email, password) {
  return `<?xml version="1.0" encoding="UTF-8"?><S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
  <SOAP-ENV:Header/>
  <S:Body>
      <ns2:validarCredenciales xmlns:ns2="http://service/">
          <email>${email}</email>
          <password>${password}</password>
      </ns2:validarCredenciales>
  </S:Body>
</S:Envelope>`;
}

export function loginUsr(email, password, onSuccess, onError) {
  const xml = buildXml(email, password);
  fetch("http://localhost:8080/backend-system-pos/WSLogin?WSDL", {
    method: "POST",
    headers: { "Content-Type": "text/xml" },
    body: xml,
  })
    .then((response) => response.text())
    .then((data) => {
      // Analizar la respuesta como un documento XML
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "text/xml");

      // Extraer el valor del elemento de respuesta
      const resultado =
        xmlDoc.getElementsByTagName("return")[0]?.childNodes[0]?.nodeValue;

      // Verificar si los credenciales son válidos
      if (resultado === "true") {
        console.log("Éxito al iniciar sesión");

        const users = Array.from(xmlDoc.getElementsByTagName("user")).map(
          (node) => {
            const direccionNode = node.getElementsByTagName("direccion")[0];
            const emailNode = node.getElementsByTagName("email")[0];
            const idNode = node.getElementsByTagName("id")[0];
            const nombreNode = node.getElementsByTagName("nombre")[0];
            const telefonoNode = node.getElementsByTagName("telefono")[0];

            return {
              direccion: direccionNode ? direccionNode.textContent : "",
              email: emailNode ? emailNode.textContent : "",
              id: idNode ? idNode.textContent : "",
              nombre: nombreNode ? nombreNode.textContent : "",
              telefono: telefonoNode ? telefonoNode.textContent : "",
            };
          }
        );
        onSuccess(users);
      } else {
        // Buscar mensajes de error en la respuesta
        const errors = xmlDoc.getElementsByTagName("error");
        if (errors.length > 0) {
          const message = errors[0]?.childNodes[0]?.nodeValue;
          onError(message);
        } else {
          onError("Error desconocido al iniciar sesión");
        }
      }
    })
    .catch((error) => {
      onError(error);
    });
}
