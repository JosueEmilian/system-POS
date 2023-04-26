package service;

import dao.DaoProveedor;
import java.util.List;
import javax.jws.WebService;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import model.ModelProveedor;

/**
 *
 * @author josueemilian
 */
@WebService(serviceName = "WSCrudProveedores")
public class WSCrudProveedores {

    DaoProveedor daoProveedor = new DaoProveedor();
    ModelProveedor proveedor = new ModelProveedor();

    //WEBMETHOD --> LISTAR TODOS LOS PROVEEDORES
    @WebMethod(operationName = "listarTodosLosProveedores")
    public List<ModelProveedor> listarProveedores() {
        List<ModelProveedor> lstProveedores;
        lstProveedores = daoProveedor.listar();
        return lstProveedores;
    }

    //WEBMETHOD --> REGISTRAR PROVEEDORES
    @WebMethod(operationName = "registrarProveedores")
    public boolean registrarProveedores(
            @WebParam(name = "nombre") String nombre,
            @WebParam(name = "email") String email,
            @WebParam(name = "telefono") String telefono) {

        proveedor.setNombre(nombre);
        proveedor.setEmail(email);
        proveedor.setTelefono(telefono);

        daoProveedor.Register(proveedor);
        return true;
    }

    //WEBMETHOD --> ELIMINAR PROVEEDOR POR ID
    @WebMethod(operationName = "eliminarProveedor")
    public boolean eliminarProveedor(@WebParam(name = "ID") int id) {
        proveedor.setId(id);
        return daoProveedor.Delete(proveedor);
    }
}
