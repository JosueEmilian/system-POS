import React, { useState } from "react";
import "../Login.css";
import { RegisterCategoriaSoap } from "../../ServiceSoap/Categorias/RegisterCategoriaSoap.js";
import { useNavigate } from "react-router-dom";

function RegistroCategorias() {
  const navigate = useNavigate();

  //Variables de registro Categoria
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await RegisterCategoriaSoap(nombre, descripcion);
      alert("Categoria registrado exitosamente!");
      navigate("/dashboard/categoria");
    } catch (error) {
      console.error(error);
      alert("Hubo un error al registrar la categoria");
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
                  <h3 className="mb-4">Registrar Categorias </h3>
                  <p className="text-muted text-sm mb-5">
                    Registro de categorias
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
                        type="text"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                      />
                      <label for="floatingPassword">Descripcion</label>
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

export default RegistroCategorias;
