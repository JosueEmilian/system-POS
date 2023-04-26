export async function RegisterCategoriaSoap(nombre, descripcion) {
  const xml = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
  <Body>
      <registrarCategoria xmlns="http://service/">
          <nombre xmlns="">${nombre}</nombre>
          <descripcion xmlns="">${descripcion}</descripcion>
      </registrarCategoria>
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
}
