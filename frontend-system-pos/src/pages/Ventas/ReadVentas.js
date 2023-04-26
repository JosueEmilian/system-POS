import React, { useState, useEffect } from "react";
import { Badge, Table, Form, FormControl } from "react-bootstrap";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import ReadVentasSoap from "../../ServiceSoap/Ventas/ReadVentasSoap.js";

function ReadVentas() {
  const [ventas, setVentas] = useState([]);
  const [showList] = useState(true);
  const [originalVentas, setoriginalVentas] = useState([]);

  //UseEffect que carga las ventas
  useEffect(() => {
    const getVentas = async () => {
      try {
        const ventas = await ReadVentasSoap();
        setVentas(ventas);
        setoriginalVentas(ventas);
      } catch (error) {
        console.log(error);
      }
    };
    if (ventas.length === 0) {
      // Solo hace la solicitud si no hay ventas en la variable de estado
      getVentas();
    }
  }, [ventas]);

  return (
    <div className="table-principal ">
      <h1 className="text-center">Ventas Realizadas</h1>

      <div className="text-center mt-4">
        <NavLink
          to="/dashboard/ventas/register"
          className="btn btn-danger text-white"
        >
          <FontAwesomeIcon
            icon={faUserPlus}
            style={{ color: "white", fontSize: "25px", margin: "0 10px" }}
          />
          Agregar
        </NavLink>
      </div>

      <Form className="d-flex mr-20">
        <Form.Group controlId="formBasicFilter" className="flex-grow-1">
          <Form.Label>Opciones:</Form.Label>
          <Form.Control className="w-auto" as="select">
            <option value="">Option</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Buscar</Form.Label>
          <FormControl
            type="search"
            style={{ width: "200px" }}
            placeholder="Ingrese el nombre"
          />
        </Form.Group>
        <button type="button" className="btn btn-danger mx-3">
          Buscar
        </button>
      </Form>
      {showList && (
        <Table hover responsive className="table-principal">
          <thead className="text-center">
            <tr>
              <th>ID</th>
              <th>Vendedor</th>
              <th>Cliente</th>
              <th>Producto</th>
              <th>Proveedor</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {ventas.map((venta) => (
              <tr key={venta.id}>
                <td>{venta.id}</td>
                <td>{venta.vendedor}</td>
                <td>
                  <Badge bg="warning" pill>
                    {venta.cliente}
                  </Badge>
                </td>
                <td>{venta.producto}</td>
                <td>{venta.proveedor}</td>
                <td>{venta.cantidad}</td>
                <td>{venta.precio}</td>
                <td>{venta.total}</td>
                <td>
                  <NavLink
                    to={`/dashboard/pdf?id=${venta.id}`}
                    className="btn btn-danger text-white"
                  >
                    <FontAwesomeIcon
                      style={{ color: "white" }}
                      icon={faFilePdf}
                    />
                    PDF
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default ReadVentas;
