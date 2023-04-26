import React, { useEffect, useState } from "react";
import "../Login.css";
import ReadClienteSoap from "../../ServiceSoap/Clientes/ReadClienteSoap.js";
import ReadProveedorSoap from "../../ServiceSoap/Proveedores/ReadProveedorSoap.js";
import ReadProductosSoap from "../../ServiceSoap/Productos/ReadProductosSoap.js";
import ReadVendedorSoap from "../../ServiceSoap/Vendedor/ReadVendedorSoap";
import ModalCliente from "../../Components/ModalCliente.js";
import ModalProveedor from "../../Components/ModalProveedor.js";
import ModalProducto from "../../Components/ModalProducto.js";
import ModalVendedor from "../../Components/ModalVendedor.js";
import RegisterVentaSoap from "../../ServiceSoap/Ventas/RegisterVentaSoap.js";

import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function RegistrarVentas() {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [originalClientes, setoriginalClientes] = useState([]);

  const [proveedores, setProveedores] = useState([]);
  const [originalProveedores, seetoriginalProveedores] = useState([]);

  const [productos, setProductos] = useState([]);
  const [originalProductos, setoriginalProductos] = useState([]);

  const [vendedores, setVendedores] = useState([]);
  const [originalVendedores, setoriginalVendedores] = useState([]);

  //UseEffect que carga la DATA CLIENTES  utilizando ReadClienteSoap si la variable de estado "clientes" está vacía.
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
    if (originalClientes.length === 0) {
      // Solo hace la solicitud si no hay clientes en la variable de estado
      getClientes();
    }
  }, [originalClientes]);

  //MODAL QUE MUESTRA LOS MODULOS SELECCIONABLES
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleModalSelect = (id) => {
    setSelectedId(id);
    setidCliente(id); // Actualiza el ID del cliente seleccionado
    setShowModal(false);
  };

  //UseEffect que carga la DATA PROVEEDORES  utilizando ReadRoleSoap si la variable de estado "roles" está vacía.
  useEffect(() => {
    const getProveedores = async () => {
      try {
        const proveedores = await ReadProveedorSoap();
        setProveedores(proveedores);
        seetoriginalProveedores(proveedores);
      } catch (error) {
        console.log(error);
      }
    };
    if (originalProveedores.length === 0) {
      // Solo hace la solicitud si no hay proveedores en la variable de estado
      getProveedores();
    }
  }, [originalProveedores]);

  //MODAL QUE MUESTRA LOS PROVEEDORES SELECCIONABLES
  const [showProveedor, setShowProveedor] = useState(false);
  const [selectedIdProveedor, setSelectedIdProveedor] = useState(null);

  const handleModalSelectProveedor = (id) => {
    setSelectedIdProveedor(id);
    setIdProveedor(id);
    setShowProveedor(false);
  };

  //UseEffect que carga la DATA PRODUCTOS  utilizando ReadProductosSoap si la variable de estado "productos" está vacía.
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
    if (originalProductos.length === 0) {
      // Solo hace la solicitud si no hay productos en la variable de estado
      getProductos();
    }
  }, [originalProductos]);

  //MODAL QUE MUESTRA LOS PRODUCTOS SELECCIONABLES
  const [showProducto, setShowProducto] = useState(false);
  const [selectedIdProducto, setSelectedIdProducto] = useState(null);

  const handleModalSelectProducto = (id) => {
    setSelectedIdProducto(id);
    setIdProducto(id);

    // Busca el producto seleccionado y actualiza el precio
    const productoSeleccionado = productos.find(
      (producto) => producto.id === id
    );
    setPrecio(productoSeleccionado.precio);

    setShowProducto(false);
  };

  //UseEffect que carga la DATA VENDEDORES  utilizando ReadVendedorSoap si la variable de estado "vendedores" está vacía.
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
    if (originalVendedores.length === 0) {
      // Solo hace la solicitud si no hay vendedores en la variable de estado
      getVendedores();
    }
  }, [originalVendedores]);

  //MODAL QUE MUESTRA LOS VENDEDORES SELECCIONABLES
  const [showVendedores, setShowVendedores] = useState(false);
  const [selectedIdVendedores, setSelectedIdVendedores] = useState(null);

  const handleModalSelectVendedores = (id) => {
    setSelectedIdVendedores(id);
    setIdVendedor(id);
    setShowVendedores(false);
  };

  //ASIGNACION O REGISTRO DE VENTAS
  const [idCliente, setidCliente] = useState("");
  const [idProveedor, setIdProveedor] = useState("");
  const [idProducto, setIdProducto] = useState("");
  const [idVendedor, setIdVendedor] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await RegisterVentaSoap(
        idCliente,
        idProveedor,
        idProducto,
        idVendedor,
        cantidad,
        precio
      );
      alert("Venta Realizada exitosamente!");
      navigate("/dashboard/ventas");
    } catch (error) {
      console.error(error);
      alert("Hubo un error al realizar la venta");
    }
  };

  return (
    <>
      <div className="App">
        <div className=" align-items-center py-4 bg-gray-100 vh-100">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="show col-lg-6 px-lg-4">
                <div className="card">
                  <div className="card-header px-lg-5">
                    <div className="card-heading text-center">Sistema POS</div>
                  </div>
                  <div className="card-body p-lg-5">
                    <h3 className="mb-4">Registrar Ventas </h3>
                    <p className="text-muted text-sm mb-5">
                      Ingrese los datos de la venta
                    </p>
                    <form onSubmit={handleSubmit}>
                      <div className="form-floating mb-3 text-center">
                        <Button
                          variant="danger"
                          onClick={() => setShowVendedores(true)}
                        >
                          Seleccione Vendedor
                        </Button>
                      </div>

                      <div className="form-floating mb-3 text-center">
                        <Button
                          variant="danger"
                          onClick={() => setShowModal(true)}
                        >
                          Seleccione Cliente
                        </Button>
                      </div>

                      <div className="form-floating mb-3 text-center">
                        <Button
                          variant="danger"
                          onClick={() => setShowProducto(true)}
                        >
                          Seleccion el Producto
                        </Button>
                      </div>

                      <div className="form-floating mb-3 text-center">
                        <Button
                          variant="danger"
                          onClick={() => setShowProveedor(true)}
                        >
                          Seleccion el Proveedor
                        </Button>
                      </div>

                      <ModalVendedor
                        show={showVendedores}
                        onHide={() => setShowVendedores(false)}
                        data={vendedores}
                        onSelect={handleModalSelectVendedores}
                      />

                      <ModalCliente
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        data={clientes}
                        onSelect={handleModalSelect}
                      />

                      <ModalProducto
                        show={showProducto}
                        onHide={() => setShowProducto(false)}
                        data={productos}
                        onSelect={handleModalSelectProducto}
                      />

                      <ModalProveedor
                        show={showProveedor}
                        onHide={() => setShowProveedor(false)}
                        data={proveedores}
                        onSelect={handleModalSelectProveedor}
                      />

                      <div className="form-floating mb-3">
                        <input
                          className="form-control"
                          type="number"
                          value={cantidad}
                          onChange={(e) => setCantidad(e.target.value)}
                          required
                        />
                        <label for="floatingPassword">Cantidad</label>
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="number"
                          className="form-control"
                          id="precio"
                          name="precio"
                          value={precio}
                          onChange={(e) => setPrecio(e.target.value)}
                          disabled
                          required
                        />
                        <label htmlFor="floatingPassword">Precio</label>
                      </div>

                      <div className="mt-3 align-item-center justify-content-center form-group row">
                        <button className="btn btn-warning " type="submit">
                          Ingresar
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="card-footer px-lg-5 py-lg-4 ">
                    <div className="text-center text-muted">Sistema POS</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegistrarVentas;
