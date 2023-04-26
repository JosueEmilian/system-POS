import React, { useState } from "react";
import RegisterProveedorSoap from "../../ServiceSoap/Proveedores/RegisterProveedorSoap.js";
import { useNavigate } from "react-router-dom";

function RegistroProveedores() {
  const navigate = useNavigate();

  //Variables de registro proveedores
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await RegisterProveedorSoap(nombre, email, telefono);
      alert("Proveedor registrado exitosamente!");
      navigate("/dashboard/proveedores");
    } catch (error) {
      console.error(error);
      alert("Hubo un error al registrar el proveedor");
    }
  };

  return (
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
                  <h3 className="mb-4">Registrar Proveedores </h3>
                  <p className="text-muted text-sm mb-5">
                    Registro de proveedores
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                      />
                      <label for="floatingInput">Nombre</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <label for="floatingPassword">Email</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="text"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        required
                      />
                      <label for="floatingPassword">Telefono</label>
                    </div>

                    <div className="mt-3 align-item-center justify-content-center form-group row">
                      <button className="btn btn-danger " type="submit">
                        Ingresar
                      </button>
                    </div>
                  </form>
                </div>
                <div className="card-footer px-lg-5 py-lg-4 ">
                  <div className="text-center text-muted">sistema pos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistroProveedores;
