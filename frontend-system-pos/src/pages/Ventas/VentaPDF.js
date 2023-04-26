import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GetVentaIDSoap from "../../ServiceSoap/Ventas/GetVentaIDSoap.js";
import jsPDF from "jspdf";
import "jspdf-autotable";

function UpdateClientes() {
  const navigate = useNavigate();

  //Recuperamos ID SELECCIONADO, Y MOSTRAMOS SUS DATOS EN LOS INPUTS
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const [venta, setVentas] = useState({
    id: "",
    vendedor: "",
    cliente: "",
    producto: "",
    proveedor: "",
    cantidad: "",
    precio: "",
    total: "",
  });

  useEffect(() => {
    async function fetchVentas() {
      try {
        const result = await GetVentaIDSoap(id);
        setVentas(result[0]);
      } catch (error) {
        console.error(error);
      }
    }
    fetchVentas();
  }, [id]);

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.text(`ID de Venta: ${venta.id}`, 10, 10);
    doc.text(`Vendedor: ${venta.vendedor}`, 10, 20);
    doc.text(`Cliente: ${venta.cliente}`, 10, 30);
    doc.text(`Producto: ${venta.producto}`, 10, 40);
    doc.text(`Proveedor: ${venta.proveedor}`, 10, 50);
    doc.text(`Cantidad: ${venta.cantidad}`, 10, 60);
    doc.text(`Precio: ${venta.precio}`, 10, 70);
    doc.text(`Total: ${venta.total}`, 10, 80);
    doc.save("venta.pdf");
    navigate("/dashboard/ventas");
  };

  return (
    <div className="App">
      <div className=" align-items-center py-4 bg-gray-100 vh-100">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="show col-lg-6 px-lg-4">
              <div className="card">
                <div className="card-header px-lg-5">
                  <div className="card-heading text-center">Sistema POS </div>
                </div>
                <div className="card-body p-lg-5">
                  <h3 className="mb-4">TICKET VENTA</h3>
                  <p className="text-muted text-sm mb-5">
                    Descarga el PDF de la venta seleccionada
                  </p>
                  <form>
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="text"
                        required
                        id="vendedor"
                        value={venta.vendedor}
                        disabled
                      />
                      <label for="floatingInput">Vendedor</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="text"
                        required
                        id="cliente"
                        value={venta.cliente}
                        disabled
                      />
                      <label for="floatingPassword">Cliente</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="text"
                        required
                        id="producto"
                        value={venta.producto}
                        disabled
                      />
                      <label for="floatingPassword">Producto</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="text"
                        required
                        id="proveedor"
                        value={venta.proveedor}
                        disabled
                      />
                      <label for="floatingPassword">Proveedor</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="number"
                        required
                        id="cantidad"
                        value={venta.cantidad}
                        disabled
                      />
                      <label for="floatingPassword">Cantidad</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="number"
                        required
                        id="precio"
                        value={venta.precio}
                        disabled
                      />
                      <label for="floatingPassword">Precio</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="number"
                        required
                        id="total"
                        value={venta.total}
                        disabled
                      />
                      <label for="floatingPassword">Total</label>
                    </div>

                    <div className="mt-3 align-item-center justify-content-center form-group row">
                      <button
                        className="btn btn-danger "
                        type="submit"
                        onClick={handleGeneratePDF}
                      >
                        DESCARGAR PDF
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
  );
}

export default UpdateClientes;
