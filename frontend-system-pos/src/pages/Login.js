import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../Service/userAction";
import { loginUsr } from "../ServiceSoap/LoginSoap";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    loginUsr(
      email,
      password,
      (users) => {
        dispatch(login(users[0])); // Guardar datos del usuario en el estado de Redux
        navigate("/dashboard");
      },
      (errorMessage) => {
        console.log("Error al iniciar sesión:", errorMessage);
      }
    );
  }

  return (
    <div className="App">
      <div className=" align-items-center py-4 bg-gray-100 vh-100">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            {" "}
            <div className="show col-lg-6 px-lg-4">
              <div className="card">
                <div className="card-header px-lg-5">
                  <div className="card-heading text-black text-center">
                    SISTEMA POS
                  </div>
                </div>
                <div className="card-body p-lg-5">
                  <h3 className="mb-4">Hola, Bienvenido! 👋 </h3>
                  <p className="text-muted text-sm mb-5">Poyecto Sistema POS</p>
                  <form
                    id="loginForm"
                    action="index.html"
                    onSubmit={handleSubmit}
                  >
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <label for="floatingInput">Email</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <label>Password</label>
                    </div>
                    <div className="form-check mb-3">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label" for="remember">
                        Recordar contraseña
                      </label>
                    </div>
                    <button className="btn btn-danger" type="submit">
                      Ingresar
                    </button>
                  </form>
                </div>
                <div className="card-footer px-lg-5 py-lg-4 ">
                  <div className="text-center text-muted">SISTEMA POS</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
