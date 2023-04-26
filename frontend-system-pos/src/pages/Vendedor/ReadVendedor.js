import React, { useState, useEffect } from "react";
import { Badge, Table, Form, FormControl } from "react-bootstrap";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import ReadVendedorSoap from "../../ServiceSoap/Vendedor/ReadVendedorSoap.js";
import DeleteVendedorSoap from "../../ServiceSoap/Vendedor/DeleteVendedorSoap.js";

function ReadVendedores() {
  const [vendedores, setVendedores] = useState([]);
  const [showList] = useState(true);
  const [originalVendedores, setoriginalVendedores] = useState([]);

  //UseEffect que carga los vendedores
  useEffect(() => {
    const getVendedores = async () => {
      try {
        const vendedores = await ReadVendedorSoap();
        setVendedores(vendedores);
        setoriginalVendedores(vendedores);
      } catch (error) {
        console.log(error);
      }
    };
    if (vendedores.length === 0) {
      // Solo hace la solicitud si no hay vendedores en la variable de estado
      getVendedores();
    }
  }, [vendedores]);

  //funcion para eliminar Vendedores
  async function handleDelete(id) {
    const response = await DeleteVendedorSoap(id);
    if (response) {
      alert("Vendedor eliminado correctamente");
      window.location.reload();
    } else {
      // manejar el error
    }
  }

  return (
    <div className="table-principal ">
      <h1 className="text-center">Vendedor "Admin"</h1>

      <div className="text-center mt-4">
        <NavLink
          to="/dashboard/vendedores/register"
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
              <th>Nombre</th>
              <th>Direccion</th>
              <th>Telefono</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {vendedores.map((vendedor) => (
              <tr key={vendedor.id}>
                <td>{vendedor.id}</td>
                <td>
                  {" "}
                  <Badge bg="warning" pill>
                    {vendedor.nombre}
                  </Badge>
                </td>
                <td>{vendedor.direccion}</td>
                <td>{vendedor.telefono}</td>
                <td>{vendedor.email}</td>

                <td>
                  <button
                    type="button"
                    className="btn btn-outline-danger mx-3"
                    onClick={() => handleDelete(vendedor.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>

                  <NavLink
                    // to={`/dashboard/proveedor/edit?id=${proveedor.id}`}
                    className="btn btn-danger text-white"
                  >
                    <FontAwesomeIcon
                      style={{ color: "white" }}
                      icon={faPenToSquare}
                    />
                    Editar
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

export default ReadVendedores;
