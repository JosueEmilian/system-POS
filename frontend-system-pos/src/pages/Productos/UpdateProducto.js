import React, { useEffect, useState } from "react";
import "../Login.css";
import ReadCategoriaSoap from "../../ServiceSoap/Categorias/ReadCategoriaSoap";
import { useLocation, useNavigate } from "react-router-dom";
import GetProductosIDSoap from "../../ServiceSoap/Productos/GetProductosIDSoap";
import { UpdateProductosSoap } from "../../ServiceSoap/Productos/UpdateProductosSoap";

function UpdateProductos() {
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

  //Recuperamos ID SELECCIONADO, Y MOSTRAMOS SUS DATOS EN LOS INPUTS
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const [producto, setProducto] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
  });

  useEffect(() => {
    async function fetchProductos() {
      try {
        const result = await GetProductosIDSoap(id);
        setProducto(result[0]);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProductos();
  }, [id]);

  //PARA REGISTRAR EL USUARIO
  const [categoria, setCategoria] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await UpdateProductosSoap(
        producto.nombre,
        categoria,
        producto.descripcion,
        producto.precio,
        producto.stock,
        id
      );
      alert("Producto actualizado exitosamente!");
      navigate("/dashboard/productos");
    } catch (error) {
      console.error(error);
      alert(
        "Hubo un error al actualizar el producto. Por favor, intenta de nuevo más tarde."
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
                  <div className="card-heading text-center">Sistema POS</div>
                </div>
                <div className="card-body p-lg-5">
                  <h3 className="mb-4">Actualizar Productos </h3>
                  <p className="text-muted text-sm mb-5">
                    Actualizacion de Productos
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="text"
                        required
                        id="nombre"
                        value={producto.nombre}
                        onChange={(event) =>
                          setProducto({
                            ...producto,
                            nombre: event.target.value,
                          })
                        }
                      />
                      <label for="floatingInput">Nombre</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="text"
                        required
                        id="descripcion"
                        value={producto.descripcion}
                        onChange={(event) =>
                          setProducto({
                            ...producto,
                            descripcion: event.target.value,
                          })
                        }
                      />
                      <label for="floatingPassword">Descripcion</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="number"
                        required
                        id="precio"
                        value={producto.precio}
                        onChange={(event) =>
                          setProducto({
                            ...producto,
                            precio: event.target.value,
                          })
                        }
                      />
                      <label for="floatingPassword">Precio</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="number"
                        required
                        id="stock"
                        value={producto.stock}
                        onChange={(event) =>
                          setProducto({
                            ...producto,
                            stock: event.target.value,
                          })
                        }
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
                      <button className="btn btn-warning " type="submit">
                        Actualizar
                      </button>
                    </div>
                  </form>
                </div>
                <div className="card-footer px-lg-5 py-lg-4 ">
                  <div className="text-center text-muted">
                    Administrar la configuracion y seguridad del sistema
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProductos;
