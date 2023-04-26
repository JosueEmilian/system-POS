package service;

import dao.DaoVendedor;
import java.util.List;
import javax.jws.WebService;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import model.ModelVendedor;

/**
 *
 * @author josueemilian
 */
@WebService(serviceName = "WSCrudVendedor")
public class WSCrudVendedor {

    DaoVendedor daoVendedor = new DaoVendedor();
    ModelVendedor vendedor = new ModelVendedor();

    //WEBMETHOD --> LISTAR TODOS LOS VENDEDORES
    @WebMethod(operationName = "listarTodosLosVendedores")
    public List<ModelVendedor> listarVendedores() {
        List<ModelVendedor> lstVendedores;
        lstVendedores = daoVendedor.listar();
        return lstVendedores;
    }

    //WEBMETHOD --> REGISTRAR VENDEDORES
    @WebMethod(operationName = "registrarVendedores")
    public boolean registrarVendedores(
            @WebParam(name = "nombre") String nombre,
            @WebParam(name = "direccion") String direccion,
            @WebParam(name = "telefono") String telefono,
            @WebParam(name = "email") String email,
            @WebParam(name = "password") String password) {

        vendedor.setNombre(nombre);
        vendedor.setDireccion(direccion);
        vendedor.setTelefono(telefono);
        vendedor.setEmail(email);
        vendedor.setPassword(password);

        daoVendedor.Register(vendedor);
        return true;
    }
    
        //WEBMETHOD --> ELIMINAR VENDEDOR POR ID
    @WebMethod(operationName = "eliminarVendedor")
    public boolean eliminarVendedor(@WebParam(name = "ID") int id) {
        vendedor.setId(id);
        return daoVendedor.Delete(vendedor);
    }
}
