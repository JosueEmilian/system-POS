async function RegisterVendedorSoap(
  nombre,
  direccion,
  telefono,
  email,
  password
) {
  const xml = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
  <Body>
      <registrarVendedores xmlns="http://service/">
          <nombre xmlns="">${nombre}</nombre>
          <direccion xmlns="">${direccion}</direccion>
          <telefono xmlns="">${telefono}</telefono>
          <email xmlns="">${email}</email>
          <password xmlns="">${password}</password>
      </registrarVendedores>
  </Body>
</Envelope>`;

  const response = await fetch(
    "http://localhost:8080/backend-system-pos/WSCrudVendedor?WSDL",
    {
      method: "POST",
      headers: { "Content-Type": "text/xml" },
      body: xml,
    }
  );
}

export default RegisterVendedorSoap;
