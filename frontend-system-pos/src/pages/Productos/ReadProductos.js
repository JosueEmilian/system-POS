import React, { useState, useEffect } from "react";
import { Badge, Table, Form, FormControl } from "react-bootstrap";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import ReadProductosSoap from "../../ServiceSoap/Productos/ReadProductosSoap.js";
import DeleteProductoID from "../../ServiceSoap/Productos/DeleteProductosSoap.js";

function ReadProductos() {
  const [productos, setProductos] = useState([]);
  const [showList] = useState(true);
  const [originalProductos, setoriginalProductos] = useState([]);

  //UseEffect que carga los productos utilizando  si la variable de estado "productos" está vacía.
  useEffect(() => {
    const getProductos = async () => {
      try {
        const productos = await ReadProductosSoap();
        setProductos(productos);
        setoriginalProductos(productos);
      } catch (error) {
        console.log(error);
      }
    };
    if (productos.length === 0) {
      // Solo hace la solicitud si no hay productos en la variable de estado
      getProductos();
    }
  }, [productos]);

  //funcion para eliminar Rol
  async function handleDelete(id) {
    const response = await DeleteProductoID(id);
    if (response) {
      alert("Producto eliminado correctamente");
      window.location.reload();
    } else {
      // manejar el error
    }
  }

  return (
    <div className="table-principal ">
      <h1 className="text-center">PRODUCTOS</h1>

      <div className="text-center mt-4">
        <NavLink
          to="/dashboard/productos/register"
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
              <th>Categoria</th>
              <th>Descripcion</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>
                  {" "}
                  <Badge bg="warning" pill>
                    {producto.nombre}
                  </Badge>
                </td>
                <td>{producto.categoria}</td>
                <td>{producto.descripcion}</td>
                <td>Q {producto.precio}</td>
                <td>{producto.stock}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-danger mx-3"
                    onClick={() => handleDelete(producto.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>

                  <NavLink
                    to={`/dashboard/productos/edit?id=${producto.id}`}
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

export default ReadProductos;
