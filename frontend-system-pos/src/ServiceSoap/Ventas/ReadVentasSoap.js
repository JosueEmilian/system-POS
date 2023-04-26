async function ReadVentasSoap() {
  try {
    const xml = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    <Body>
        <listarTodasLasVentas xmlns="http://service/"/>
    </Body>
</Envelope>
      `;

    const response = await fetch(
      "http://localhost:8080/backend-system-pos/WSVentas?WSDL",
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

    // Obtener las ventas de la respuesta
    const proveedor = Array.from(xmlDoc.getElementsByTagName("return")).map(
      (node) => {
        const cantidadNode = node.getElementsByTagName("cantidad")[0];
        const clienteNode = node.getElementsByTagName("cliente")[0];
        const idNode = node.getElementsByTagName("id")[0];
        const precioNode = node.getElementsByTagName("precio")[0];
        const productoNode = node.getElementsByTagName("producto")[0];
        const proveedorNode = node.getElementsByTagName("proveedor")[0];
        const totalNode = node.getElementsByTagName("total")[0];
        const vendedorNode = node.getElementsByTagName("vendedor")[0];

        return {
          cantidad: cantidadNode ? cantidadNode.textContent : "",
          cliente: clienteNode ? clienteNode.textContent : "",
          id: idNode ? idNode.textContent : "",
          precio: precioNode ? precioNode.textContent : "",
          producto: productoNode ? productoNode.textContent : "",
          proveedor: proveedorNode ? proveedorNode.textContent : "",
          total: totalNode ? totalNode.textContent : "",
          vendedor: vendedorNode ? vendedorNode.textContent : "",
        };
      }
    );

    return proveedor;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener las ventas");
  }
}
export default ReadVentasSoap;
