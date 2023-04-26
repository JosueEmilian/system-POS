import React, { useState, useEffect } from "react";
import { Badge, Table, Form, FormControl } from "react-bootstrap";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import ReadCategoriaSoap from "../../ServiceSoap/Categorias/ReadCategoriaSoap.js";
import { DeleteCategoriaID } from "../../ServiceSoap/Categorias/DeleteCategoriaSoap.js";
import "./Categorias.css";

function ReadCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [showList] = useState(true);
  const [originalCategorias, setOriginalCategorias] = useState([]);

  //UseEffect que carga las categorias utilizando si la variable de estado "categorias" está vacía.
  useEffect(() => {
    const getCategorias = async () => {
      try {
        const categorias = await ReadCategoriaSoap();
        setCategorias(categorias);
        setOriginalCategorias(categorias);
      } catch (error) {
        console.log(error);
      }
    };
    if (categorias.length === 0) {
      // Solo hace la solicitud si no hay categorias en la variable de estado
      getCategorias();
    }
  }, [categorias]);

  //funcion para eliminar Rol
  async function handleDelete(id) {
    const response = await DeleteCategoriaID(id);
    if (response) {
      alert("Categoria eliminado correctamente");
      window.location.reload();
    } else {
      // manejar el error
    }
  }

  return (
    <div className="table-principal ">
      <h1 className="text-center">Categorias</h1>

      <div className="text-center mt-4">
        <NavLink
          to="/dashboard/categorias/register"
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
              <th>Descripcion</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {categorias.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.id}</td>
                <td>
                  {" "}
                  <Badge bg="warning" pill>
                    {categoria.nombre}
                  </Badge>
                </td>
                <td>{categoria.descripcion}</td>

                <td>
                  <button
                    type="button"
                    className="btn btn-outline-danger mx-3"
                    onClick={() => handleDelete(categoria.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>

                  <NavLink
                    to={`/dashboard/categorias/edit?id=${categoria.id}`}
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

export default ReadCategorias;
