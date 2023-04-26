import React, { useState, useEffect } from "react";
import { Badge, Table, Form, FormControl } from "react-bootstrap";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import ReadProveedorSoap from "../../ServiceSoap/Proveedores/ReadProveedorSoap.js";
import DeleteProveedorSoap from "../../ServiceSoap/Proveedores/DeleteProveedorSoap.js";

function ReadProveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [showList] = useState(true);
  const [originalProveedores, setoriginalProveedores] = useState([]);

  //UseEffect que carga los proveedores
  useEffect(() => {
    const getProveedores = async () => {
      try {
        const proveedores = await ReadProveedorSoap();
        setProveedores(proveedores);
        setoriginalProveedores(proveedores);
      } catch (error) {
        console.log(error);
      }
    };
    if (proveedores.length === 0) {
      // Solo hace la solicitud si no hay proveedores en la variable de estado
      getProveedores();
    }
  }, [proveedores]);

  //funcion para eliminar Proveedor
  async function handleDelete(id) {
    const response = await DeleteProveedorSoap(id);
    if (response) {
      alert("Proveedor eliminado correctamente");
      window.location.reload();
    } else {
      // manejar el error
    }
  }

  return (
    <div className="table-principal ">
      <h1 className="text-center">Proveedores</h1>

      <div className="text-center mt-4">
        <NavLink
          to="/dashboard/proveedores/register"
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
              <th>email</th>
              <th>Telefono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {proveedores.map((proveedor) => (
              <tr key={proveedor.id}>
                <td>{proveedor.id}</td>
                <td>
                  {" "}
                  <Badge bg="warning" pill>
                    {proveedor.nombre}
                  </Badge>
                </td>
                <td>{proveedor.email}</td>
                <td>{proveedor.telefono}</td>

                <td>
                  <button
                    type="button"
                    className="btn btn-outline-danger mx-3"
                    onClick={() => handleDelete(proveedor.id)}
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

export default ReadProveedores;
