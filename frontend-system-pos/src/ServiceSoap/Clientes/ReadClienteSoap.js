async function ReadClienteSoap() {
  try {
    const xml = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    <Body>
        <listarTodosLosClientes xmlns="http://service/"/>
    </Body>
</Envelope>
  `;

    const response = await fetch(
      "http://localhost:8080/backend-system-pos/WSCrudCliente?WSDL",
      {
        method: "POST",
        headers: { "Content-Type": "text/xml" },
        body: xml,
      }
    );

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.statusText}`);
    }

    const data = await response.text();

    // Analizar la respuesta como un documento XML
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "text/xml");

    // Obtener los clientes de la respuesta
    const clientes = Array.from(xmlDoc.getElementsByTagName("return")).map(
      (node) => {
        const emailNode = node.getElementsByTagName("email")[0];
        const idNode = node.getElementsByTagName("id")[0];
        const nombreNode = node.getElementsByTagName("nombre")[0];
        const telefonoNode = node.getElementsByTagName("telefono")[0];

        return {
          email: emailNode ? emailNode.textContent : "",
          id: idNode ? idNode.textContent : "",
          nombre: nombreNode ? nombreNode.textContent : "",
          telefono: telefonoNode ? telefonoNode.textContent : "",
        };
      }
    );

    return clientes;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener los clientes");
  }
}
export default ReadClienteSoap;
