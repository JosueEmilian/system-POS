async function RegisterProveedorSoap(nombre, email, telefono) {
  const xml = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
  <Body>
      <registrarProveedores xmlns="http://service/">
          <nombre xmlns="">${nombre}</nombre>
          <email xmlns="">${email}</email>
          <telefono xmlns="">${telefono}</telefono>
      </registrarProveedores>
  </Body>
</Envelope>`;

  const response = await fetch(
    "http://localhost:8080/backend-system-pos/WSCrudProveedores?WSDL",
    {
      method: "POST",
      headers: { "Content-Type": "text/xml" },
      body: xml,
    }
  );
}

export default RegisterProveedorSoap;
