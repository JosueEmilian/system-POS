import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { login, logout, resetUser } from "./Service/userAction";
import Login from "./pages/Login";
import HomePublic from "./pages/HomePublic";
import Navigation from "./Components/Navigation";
import Dashboard from "./pages/Dashboard";
import ScrollTopTop from "./Components/ScrollTopTop.js";

import ReadCategoria from "./pages/Categorias/ReadCategoria.js";
import RegistroCategoria from "./pages/Categorias/RegistroCategoria.js";
import UpdateCategorias from "./pages/Categorias/UpdateCategorias.js";
import ReadProductos from "./pages/Productos/ReadProductos.js";
import RegistroProductos from "./pages/Productos/RegistroProductos.js";
import UpdateProductos from "./pages/Productos/UpdateProducto";
import ReadClientes from "./pages/Clientes/ReadClientes.js";
import RegistroClientes from "./pages/Clientes/RegistroClientes";
import UpdateClientes from "./pages/Clientes/UpdateClientes";
import ReadProveedores from "./pages/Proveedores/ReadProveedores.js";
import RegistroProveedores from "./pages/Proveedores/RegistroProveedores.js";
import ReadVendedor from "./pages/Vendedor/ReadVendedor.js";
import RegistroVendedores from "./pages/Vendedor/RegistroVendedores.js";
import ReadVenta from "./pages/Ventas/ReadVentas.js";
import RegistroVentas from "./pages/Ventas/RegistroVentas.js";
import VentaPDF from "./pages/Ventas/VentaPDF.js";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isLoggedIn = !!user;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispatch(login(storedUser));
    }
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
    dispatch(resetUser());
  };

  return (
    <BrowserRouter>
      <ScrollTopTop />
      <Navigation isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route index element={<HomePublic />} />

        {/* Si el usuario no está logueado, lo redirige a la página de login */}
        {!isLoggedIn && (
          <>
            <Route path="/login" element={<Login />} />
          </>
        )}
        {/* Si el usuario está logueado, lo redirige a la página de dashboard */}
        {isLoggedIn && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/categoria" element={<ReadCategoria />} />
            <Route
              path="/dashboard/categorias/register"
              element={<RegistroCategoria />}
            />
            <Route
              path="/dashboard/categorias/edit"
              element={<UpdateCategorias />}
            />
            <Route path="/dashboard/productos" element={<ReadProductos />} />
            <Route
              path="/dashboard/productos/register"
              element={<RegistroProductos />}
            />
            <Route
              path="/dashboard/productos/edit"
              element={<UpdateProductos />}
            />
            <Route path="/dashboard/clientes" element={<ReadClientes />} />
            <Route
              path="/dashboard/clientes/register"
              element={<RegistroClientes />}
            />
            <Route
              path="/dashboard/clientes/edit"
              element={<UpdateClientes />}
            />
            <Route
              path="/dashboard/proveedores"
              element={<ReadProveedores />}
            />
            <Route
              path="/dashboard/proveedores/register"
              element={<RegistroProveedores />}
            />
            <Route path="/dashboard/vendedores" element={<ReadVendedor />} />
            <Route
              path="/dashboard/vendedores/register"
              element={<RegistroVendedores />}
            />
            <Route path="/dashboard/ventas" element={<ReadVenta />} />
            <Route
              path="/dashboard/ventas/register"
              element={<RegistroVentas />}
            />

            <Route path="/dashboard/pdf" element={<VentaPDF />} />
          </>
        )}

        <Route path="*" element={<HomePublic />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
