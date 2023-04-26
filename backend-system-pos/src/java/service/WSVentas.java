package service;

import dao.DaoVentas;
import java.util.List;
import javax.jws.WebService;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import model.ModelVentas;

/**
 *
 * @author josueemilian
 */
@WebService(serviceName = "WSVentas")
public class WSVentas {

    DaoVentas daoVentas = new DaoVentas();
    ModelVentas ventas = new ModelVentas();

    //WEBMETHOD --> LISTAR TODOS LAS VENTAS
    @WebMethod(operationName = "listarTodasLasVentas")
    public List<ModelVentas> listarVentas() {
        List<ModelVentas> lstVentas;
        lstVentas = daoVentas.listar();
        return lstVentas;
    }

    //WEBMETHOD --> REGISTRAR VENTAS
    @WebMethod(operationName = "registrarVentas")
    public boolean registrarVentas(
            @WebParam(name = "clienteID") int idCliente,
            @WebParam(name = "proveedorID") int idProveedor,
            @WebParam(name = "productoID") int idProducto,
            @WebParam(name = "vendedorID") int idVendedor,
            @WebParam(name = "cantidad") int cantidad,
            @WebParam(name = "precio") double precio) {

        ventas.setIdCliente(idCliente);
        ventas.setIdProveedor(idProveedor);
        ventas.setIdProducto(idProducto);
        ventas.setIdVendedor(idVendedor);
        ventas.setCantidad(cantidad);
        ventas.setPrecio(precio);
       
        daoVentas.Register(ventas);
        return true;
    }
    
    
    //WEBMETHOD --> LISTAR VENTAS INDIVIDUAL A TRAVES DE SU ID
    @WebMethod(operationName = "obtenerVentaPorID")
    public ModelVentas obtenerVentaPorID(@WebParam(name = "id") int id) {
        return daoVentas.list(id);
    }

}
