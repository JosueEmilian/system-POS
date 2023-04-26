export async function UpdateCategoriaSoap(nombre, descripcion, id) {
  const xml = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
            <Body>
                <actualizarCategorias xmlns="http://service/">
                    <nombre xmlns="">${nombre}</nombre>
                    <descripcion xmlns="">${descripcion}</descripcion>
                    <id xmlns="">${id}</id>
                </actualizarCategorias>
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
