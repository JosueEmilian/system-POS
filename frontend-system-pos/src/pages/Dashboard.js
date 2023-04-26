import React from "react";
import { useSelector } from "react-redux";
import { Card, Row, Col } from "react-bootstrap";
import "./Dashboard.css";
import categorias from "../images/categorias.png";
import clientes from "../images/clientes.png";
import productos from "../images/productos.png";
import proveedores from "../images/proveedores.png";
import vendedores from "../images/admin.png";
import ventas from "../images/ventas.png";

function Dashboard() {
  const user = useSelector((state) => state.user);

  return (
    <div className="principal-text">
      <h1>DASHBOARD</h1>
      {<h2>Bienvenido {user?.nombre}</h2>}

      <Row className="custom-margin d-flex justify-content-center flex-wrap">
        <Col className="px-2 mt-3 col-md-4">
          <a href="/dashboard/vendedores">
            <Card>
              <Card.Img variant="top" src={vendedores} />
              <Card.Body>
                <Card.Title>Vendedores "Admin"</Card.Title>
                <Card.Text>Consulta y Asignacion de Vendedores</Card.Text>
              </Card.Body>
            </Card>
          </a>
        </Col>

        <Col className="px-2 mt-3 col-md-4">
          <a href="/dashboard/ventas">
            <Card>
              <Card.Img variant="top" src={ventas} />
              <Card.Body>
                <Card.Title>Ventas</Card.Title>
                <Card.Text>Realizar ventas y consulta</Card.Text>
              </Card.Body>
            </Card>
          </a>
        </Col>

        <Col className="px-2 mt-3 col-md-4">
          <a href="/dashboard/categoria">
            <Card>
              <Card.Img variant="top" src={categorias} />
              <Card.Body>
                <Card.Title>CATEGORIAS</Card.Title>
                <Card.Text>Consulta e Ingreso de Categorias</Card.Text>
              </Card.Body>
            </Card>
          </a>
        </Col>
        <Col className="px-2 mt-3 col-md-4">
          <a href="/dashboard/productos">
            <Card>
              <Card.Img variant="top" src={productos} />
              <Card.Body>
                <Card.Title>PRODUCTOS</Card.Title>
                <Card.Text>Consulta e Ingreso de Productos</Card.Text>
              </Card.Body>
            </Card>
          </a>
        </Col>
        <Col className="px-2 mt-3 col-md-4">
          <a href="/dashboard/clientes">
            <Card>
              <Card.Img variant="top" src={clientes} />
              <Card.Body>
                <Card.Title>Clientes</Card.Title>
                <Card.Text>Consulta e Ingreso de Clientes</Card.Text>
              </Card.Body>
            </Card>
          </a>
        </Col>
        <Col className="px-2 mt-3 col-md-4">
          <a href="/dashboard/proveedores">
            <Card>
              <Card.Img variant="top" src={proveedores} />
              <Card.Body>
                <Card.Title>Proveedores</Card.Title>
                <Card.Text>Consulta y Asignacion de proveedores</Card.Text>
              </Card.Body>
            </Card>
          </a>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
