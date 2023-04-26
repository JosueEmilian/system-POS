export async function RegistrarProductosSoap(
  nombre,
  categoria,
  descripcion,
  precio,
  stock
) {
  const xml = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
  <Body>
      <registrarProductos xmlns="http://service/">
          <nombre xmlns="">${nombre}</nombre>
          <categoria xmlns="">${categoria}</categoria>
          <descripcion xmlns="">${descripcion}</descripcion>
          <precio xmlns="">${precio}</precio>
          <stock xmlns="">${stock}</stock>
      </registrarProductos>
  </Body>
</Envelope>`;

  const response = await fetch(
    "http://localhost:8080/backend-system-pos/WSCrudProductos?WSDL",
    {
      method: "POST",
      headers: { "Content-Type": "text/xml" },
      body: xml,
    }
  );
}
