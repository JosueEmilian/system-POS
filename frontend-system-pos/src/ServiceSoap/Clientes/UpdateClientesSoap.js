async function UpdateCategoriaSoap(nombre, email, telefono, id) {
  const xml = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
  <Body>
      <actualizarClientes xmlns="http://service/">
          <nombre xmlns="">${nombre}</nombre>
          <email xmlns="">${email}</email>
          <telefono xmlns="">${telefono}</telefono>
          <id xmlns="">${id}</id>
      </actualizarClientes>
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
}

export default UpdateCategoriaSoap;
