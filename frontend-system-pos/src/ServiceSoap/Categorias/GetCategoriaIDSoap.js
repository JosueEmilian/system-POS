async function GetCategoriasIDSoap(id) {
  try {
    const xml = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    <Body>
        <obtenerCategoriaPorID xmlns="http://service/">
            <id xmlns="">${id}</id>
        </obtenerCategoriaPorID>
    </Body>
</Envelope>`;

    const response = await fetch(
      "http://localhost:8080/backend-system-pos/WSCategoriaCrud?WSDL",
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

    // Obtener las categorias de la respuesta
    const getCategoriaID = Array.from(
      xmlDoc.getElementsByTagName("return")
    ).map((node) => {
      const idNode = node.getElementsByTagName("id")[0];
      const nombreNode = node.getElementsByTagName("nombre")[0];
      const descripcionNode = node.getElementsByTagName("descripcion")[0];
      return {
        id: idNode ? idNode.textContent : "",
        nombre: nombreNode ? nombreNode.textContent : "",
        descripcion: descripcionNode ? descripcionNode.textContent : "",
      };
    });

    return getCategoriaID;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener las categorias");
  }
}
export default GetCategoriasIDSoap;
