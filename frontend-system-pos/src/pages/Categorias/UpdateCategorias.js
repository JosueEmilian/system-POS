import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GetCategoriaIDSoap from "../../ServiceSoap/Categorias/GetCategoriaIDSoap.js";

import { UpdateCategoriaSoap } from "../../ServiceSoap/Categorias/UpdateCategoriaSoap.js";

function UpdateCategorias() {
  const navigate = useNavigate();

  //Recuperamos ID SELECCIONADO, Y MOSTRAMOS SUS DATOS EN LOS INPUTS
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const [categoria, setCategoria] = useState({
    id: "",
    nombre: "",
    descripcion: "",
  });

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const result = await GetCategoriaIDSoap(id);
        setCategoria(result[0]);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCategorias();
  }, [id]);

  //PARA REGISTRAR EL USUARIO
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await UpdateCategoriaSoap(categoria.nombre, categoria.descripcion, id);
      alert("Categoria actualizada exitosamente!");
      navigate("/dashboard/categoria");
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
                  <h3 className="mb-4">Actualizacion de Categorias </h3>
                  <p className="text-muted text-sm mb-5">
                    Actualizacion de categorias
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="text"
                        value={categoria.nombre}
                        onChange={(event) =>
                          setCategoria({
                            ...categoria,
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
                        type="text"
                        value={categoria.descripcion}
                        onChange={(event) =>
                          setCategoria({
                            ...categoria,
                            descripcion: event.target.value,
                          })
                        }
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

export default UpdateCategorias;
