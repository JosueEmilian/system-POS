async function DeleteClienteID(id) {
  const xml = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
  <Body>
      <eliminarCliente xmlns="http://service/">
          <ID xmlns="">${id}</ID>
      </eliminarCliente>
  </Body>
</Envelope>`;

  const response = await fetch(
    "http://localhost:8080/backend-system-pos/WSCrudCliente?WSDL",
    {
      method: "POST",
      headers: { "Content-Type": "text/xml" },
      body: xml,
    }
  );
  if (response.ok) {
    const data = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "text/xml");
    const result =
      xmlDoc.getElementsByTagName("return")[0].childNodes[0].nodeValue;
    return result === "true";
  } else {
    throw new Error("No se pudo eliminar el cliente.");
  }
}

export default DeleteClienteID;
