import React, { useState, useEffect } from "react";
import { Badge, Table, Form, FormControl } from "react-bootstrap";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import ReadClienteSoap from "../../ServiceSoap/Clientes/ReadClienteSoap.js";
import DeleteClienteSoap from "../../ServiceSoap/Clientes/DeleteClienteSoap.js";

function ReadClientes() {
  const [clientes, setClientes] = useState([]);
  const [showList] = useState(true);
  const [originalClientes, setoriginalClientes] = useState([]);

  //UseEffect que carga los clientes
  useEffect(() => {
    const getClientes = async () => {
      try {
        const clientes = await ReadClienteSoap();
        setClientes(clientes);
        setoriginalClientes(clientes);
      } catch (error) {
        console.log(error);
      }
    };
    if (clientes.length === 0) {
      // Solo hace la solicitud si no hay clientes en la variable de estado
      getClientes();
    }
  }, [clientes]);

  //funcion para eliminar Rol
  async function handleDelete(id) {
    const response = await DeleteClienteSoap(id);
    if (response) {
      alert("Cliente eliminado correctamente");
      window.location.reload();
    } else {
      // manejar el error
    }
  }

  return (
    <div className="table-principal ">
      <h1 className="text-center">Clientes</h1>

      <div className="text-center mt-4">
        <NavLink
          to="/dashboard/clientes/register"
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
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>
                  {" "}
                  <Badge bg="warning" pill>
                    {cliente.nombre}
                  </Badge>
                </td>
                <td>{cliente.email}</td>
                <td>{cliente.telefono}</td>

                <td>
                  <button
                    type="button"
                    className="btn btn-outline-danger mx-3"
                    onClick={() => handleDelete(cliente.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>

                  <NavLink
                    to={`/dashboard/clientes/edit?id=${cliente.id}`}
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

export default ReadClientes;
