import React, { useEffect, useState } from "react";
import ReadCategoriaSoap from "../../ServiceSoap/Categorias/ReadCategoriaSoap";
import { RegistrarProductosSoap } from "../../ServiceSoap/Productos/RegisterProductosSoap.js";
import { useNavigate } from "react-router-dom";

function RegistroProductos() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  //UseEffect que carga las categorias
  useEffect(() => {
    async function loadCategorias() {
      try {
        const categoriasData = await ReadCategoriaSoap();
        setCategorias(categoriasData);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (categorias.length === 0) {
      // Solo hace la solicitud si no hay roles en la variable de estado
      loadCategorias();
    }
  }, [categorias]);

  //Variables de registro categoria
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await RegistrarProductosSoap(
        nombre,
        categoria,
        descripcion,
        precio,
        stock
      );
      alert("Producto registrado exitosamente!");
      navigate("/dashboard/productos");
    } catch (error) {
      console.error(error);
      alert(
        "Hubo un error al registrar el producto. Por favor, intenta de nuevo más tarde."
      );
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
                  <div className="card-heading text-center">SISTEMA POS</div>
                </div>
                <div className="card-body p-lg-5">
                  <h3 className="mb-4">Registrar Productos </h3>
                  <p className="text-muted text-sm mb-5">
                    Registro de productos
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

                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="number"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        required
                      />
                      <label for="floatingPassword">Precio</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                      />
                      <label for="floatingPassword">Stock</label>
                    </div>

                    <div className="form-group row mt-3 d-flex justify-content-center">
                      <div className="col-sm-4 d-flex flex-column align-items-center">
                        <label htmlFor="rol" className="mb-1 text-center">
                          CATEGORIAS:
                        </label>
                        {error && <p>Error al cargar las categorias</p>}
                        {loading ? (
                          <p>Cargando categorias...</p>
                        ) : (
                          <select
                            id="rol"
                            className="form-control text-center"
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                          >
                            <option value="">Define la categoria</option>
                            {categorias.map((categoria) => (
                              <option key={categoria.id} value={categoria.id}>
                                {categoria.nombre}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 align-item-center justify-content-center form-group row">
                      <button className="btn btn-danger " type="submit">
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
  );
}

export default RegistroProductos;
