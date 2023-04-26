async function ReadProductosSoap() {
  try {
    const xml = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    <Body>
        <listarTodosLosProductos xmlns="http://service/"/>
    </Body>
</Envelope>
  `;

    const response = await fetch(
      "http://localhost:8080/backend-system-pos/WSCrudProductos?WSDL",
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

    // Obtener los productos de la respuesta
    const producto = Array.from(xmlDoc.getElementsByTagName("return")).map(
      (node) => {
        const categoriaNode = node.getElementsByTagName("categoria")[0];
        const descripcionNode = node.getElementsByTagName("descripcion")[0];
        const idNode = node.getElementsByTagName("id")[0];
        const nombreNode = node.getElementsByTagName("nombre")[0];
        const precioNode = node.getElementsByTagName("precio")[0];
        const stockNode = node.getElementsByTagName("stock")[0];

        return {
          categoria: categoriaNode ? categoriaNode.textContent : "",
          descripcion: descripcionNode ? descripcionNode.textContent : "",
          id: idNode ? idNode.textContent : "",
          nombre: nombreNode ? nombreNode.textContent : "",
          precio: precioNode ? precioNode.textContent : "",
          stock: stockNode ? stockNode.textContent : "",
        };
      }
    );

    return producto;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener los productos");
  }
}
export default ReadProductosSoap;
