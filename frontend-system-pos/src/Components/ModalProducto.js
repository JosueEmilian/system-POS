import { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";

function ModalProducto(props) {
  const [selectedId, setSelectedId] = useState(null);
  const [precio, setPrecio] = useState(0); // Nuevo estado para el precio del producto seleccionado

  const handleRowClick = (id, precio) => {
    setSelectedId(id);
    setPrecio(precio); // Actualiza el estado del precio con el precio correspondiente
  };

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Seleccione el Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoria</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((row) => (
              <tr
                key={row.id}
                onClick={() => handleRowClick(row.id, row.precio)} // Pasa el precio como segundo argumento
                className={selectedId === row.id ? "table-primary" : ""}
              >
                <td>{row.id}</td>
                <td>{row.nombre}</td>
                <td>{row.categoria}</td>
                <td>Q. {row.precio}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Cerrar
        </Button>
        <Button
          variant="warning"
          onClick={() => props.onSelect(selectedId)}
          disabled={!selectedId}
        >
          Seleccionar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalProducto;
