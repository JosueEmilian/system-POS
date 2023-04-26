import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GetClienteIDSoap from "../../ServiceSoap/Clientes/GetClienteIDSoap.js";

import UpdateClientesSoap from "../../ServiceSoap/Clientes/UpdateClientesSoap.js";

function UpdateClientes() {
  const navigate = useNavigate();

  //Recuperamos ID SELECCIONADO, Y MOSTRAMOS SUS DATOS EN LOS INPUTS
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const [cliente, setCliente] = useState({
    nombre: "",
    email: "",
    telefono: "",
    id: "",
  });

  useEffect(() => {
    async function fetchClientes() {
      try {
        const result = await GetClienteIDSoap(id);
        setCliente(result[0]);
      } catch (error) {
        console.error(error);
      }
    }
    fetchClientes();
  }, [id]);

  //PARA REGISTRAR EL USUARIO
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await UpdateClientesSoap(
        cliente.nombre,
        cliente.email,
        cliente.telefono,
        id
      );
      alert("Cliente actualizado exitosamente!");
      navigate("/dashboard/clientes");
    } catch (error) {
      console.error(error);
      alert("Hubo un error al registrar la categoria.");
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
                  <h3 className="mb-4">Actualizacion de Clientes </h3>
                  <p className="text-muted text-sm mb-5">
                    Actualizacion de Clientes
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="text"
                        value={cliente.nombre}
                        onChange={(event) =>
                          setCliente({
                            ...cliente,
                            nombre: event.target.value,
                          })
                        }
                        required
                      />
                      <label for="floatingInput">Nombre</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="email"
                        value={cliente.email}
                        onChange={(event) =>
                          setCliente({
                            ...cliente,
                            email: event.target.value,
                          })
                        }
                        required
                      />
                      <label for="floatingPassword">Email</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="text"
                        value={cliente.telefono}
                        onChange={(event) =>
                          setCliente({
                            ...cliente,
                            telefono: event.target.value,
                          })
                        }
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
                  <div className="text-center text-muted">Sistema pos</div>
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
