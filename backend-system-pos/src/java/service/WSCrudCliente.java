package service;

import dao.DaoCliente;
import java.util.List;
import javax.jws.WebService;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import model.ModelCliente;

/**
 *
 * @author josueemilian
 */
@WebService(serviceName = "WSCrudCliente")
public class WSCrudCliente {

    DaoCliente daoCliente = new DaoCliente();
    ModelCliente cliente = new ModelCliente();

    //WEBMETHOD --> LISTAR TODOS LOS CLIENTES
    @WebMethod(operationName = "listarTodosLosClientes")
    public List<ModelCliente> listarClientes() {
        List<ModelCliente> lstClientes;
        lstClientes = daoCliente.listar();
        return lstClientes;
    }

    //WEBMETHOD --> LISTAR CLIENTE INDIVIDUAL A TRAVES DE SU ID
    @WebMethod(operationName = "obtenerClientePorID")
    public ModelCliente obtenerClientePorID(@WebParam(name = "id") int id) {
        return daoCliente.list(id);
    }

    //WEBMETHOD --> REGISTRAR CLIENTES
    @WebMethod(operationName = "registrarClientes")
    public boolean registrarClientes(
            @WebParam(name = "nombre") String nombre,
            @WebParam(name = "email") String email,
            @WebParam(name = "telefono") String telefono) {

        cliente.setNombre(nombre);
        cliente.setEmail(email);
        cliente.setTelefono(telefono);

        daoCliente.Register(cliente);
        return true;
    }

    //WEBMETHOD --> ACTUALIZAR CLIENTES
    @WebMethod(operationName = "actualizarClientes")
    public boolean actualizarClientes(
            @WebParam(name = "nombre") String nombre,
            @WebParam(name = "email") String email,
            @WebParam(name = "telefono") String telefono,
            @WebParam(name = "id") int id) {

        cliente.setNombre(nombre);
        cliente.setEmail(email);
        cliente.setTelefono(telefono);
        cliente.setId(id);

        boolean cambioExitoso = daoCliente.Update(cliente);
        return cambioExitoso;
    }

    //WEBMETHOD --> ELIMINAR CLIENTE POR ID
    @WebMethod(operationName = "eliminarCliente")
    public boolean eliminarCliente(@WebParam(name = "ID") int id) {
        cliente.setId(id);
        return daoCliente.Delete(cliente);
    }

}
