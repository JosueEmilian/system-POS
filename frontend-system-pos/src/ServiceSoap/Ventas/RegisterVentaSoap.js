async function RegisterVentaSoap(
  idCliente,
  idProveedor,
  idProducto,
  idVendedor,
  cantidad,
  precio
) {
  const xml = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
  <Body>
      <registrarVentas xmlns="http://service/">
          <clienteID xmlns="">${idCliente}</clienteID>
          <proveedorID xmlns="">${idProveedor}</proveedorID>
          <productoID xmlns="">${idProducto}</productoID>
          <vendedorID xmlns="">${idVendedor}</vendedorID>
          <cantidad xmlns="">${cantidad}</cantidad>
          <precio xmlns="">${precio}</precio>
      </registrarVentas>
  </Body>
</Envelope>`;

  const response = await fetch(
    "http://localhost:8080/backend-system-pos/WSVentas?WSDL",
    {
      method: "POST",
      headers: { "Content-Type": "text/xml" },
      body: xml,
    }
  );
}

export default RegisterVentaSoap;
