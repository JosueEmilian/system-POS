package service;

import dao.DaoProductos;
import java.util.List;
import javax.jws.WebService;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import model.ModelProductos;

/**
 *
 * @author josueemilian
 */
@WebService(serviceName = "WSCrudProductos")
public class WSCrudProductos {

    DaoProductos daoProductos = new DaoProductos();
    ModelProductos productos = new ModelProductos();

    //WEBMETHOD --> LISTAR TODOS LOS PRODUCTOS
    @WebMethod(operationName = "listarTodosLosProductos")
    public List<ModelProductos> listarProductos() {
        List<ModelProductos> lstProductos;
        lstProductos = daoProductos.listar();
        return lstProductos;
    }

    //WEBMETHOD --> LISTAR PRODUCTO INDIVIDUAL A TRAVES DE SU ID
    @WebMethod(operationName = "obtenerProductoPorID")
    public ModelProductos obtenerProductoPorID(@WebParam(name = "id") int id) {
        return daoProductos.list(id);
    }

    //WEBMETHOD --> REGISTRAR PRODUCTOS
    @WebMethod(operationName = "registrarProductos")
    public boolean registrarProductos(
            @WebParam(name = "nombre") String nombre,
            @WebParam(name = "categoria") int categoria,
            @WebParam(name = "descripcion") String descripcion,
            @WebParam(name = "precio") double precio,
            @WebParam(name = "stock") int stock) {

        productos.setNombre(nombre);
        productos.setAsignarCategoria(categoria);
        productos.setDescripcion(descripcion);
        productos.setPrecio(precio);
        productos.setStock(stock);
        daoProductos.Register(productos);
        return true;
    }

    //WEBMETHOD --> ACTUALIZAR PRODUCTOS
    @WebMethod(operationName = "actualizarProductos")
    public boolean actualizarProductos(
            @WebParam(name = "nombre") String nombre,
            @WebParam(name = "categoria") int categoria,
            @WebParam(name = "descripcion") String descripcion,
            @WebParam(name = "precio") double precio,
            @WebParam(name = "stock") int stock,
            @WebParam(name = "id") int id) {

        productos.setNombre(nombre);
        productos.setAsignarCategoria(categoria);
        productos.setDescripcion(descripcion);
        productos.setPrecio(precio);
        productos.setStock(stock);
        productos.setId(id);

        boolean cambioExitoso = daoProductos.Update(productos);
        return cambioExitoso;
    }

    //WEBMETHOD --> ELIMINAR PRODUCTO POR ID
    @WebMethod(operationName = "eliminarProducto")
    public boolean eliminarProducto(@WebParam(name = "ID") int id) {
        productos.setId(id);
        return daoProductos.Delete(productos);
    }

}
