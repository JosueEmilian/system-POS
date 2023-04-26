package service;

import dao.DaoCategoria;
import java.util.List;
import javax.jws.WebService;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import model.ModelCategoria;

/**
 *
 * @author josueemilian
 */
@WebService(serviceName = "WSCategoriaCrud")
public class WSCategoriaCrud {

    DaoCategoria daoCategoria = new DaoCategoria();
    ModelCategoria categoria = new ModelCategoria();

    //WEBMETHOD --> LISTAR TODAS LAS CATEGORIAS
    @WebMethod(operationName = "listarTodasLasCategorias")
    public List<ModelCategoria> listarCategorias() {
        List<ModelCategoria> lstCategorias;
        lstCategorias = daoCategoria.listar();
        return lstCategorias;
    }

    //WEBMETHOD --> LISTAR CATEGORIA INDIVIDUAL A TRAVES DE SU ID
    @WebMethod(operationName = "obtenerCategoriaPorID")
    public ModelCategoria obtenerCategoriaPorID(@WebParam(name = "id") int id) {
        return daoCategoria.list(id);
    }

     //WEBMETHOD --> REGISTRAR NUEVAS CATEGORIAS
    @WebMethod(operationName = "registrarCategoria")
    public boolean registrarCategoria(
            @WebParam(name = "nombre") String nombre,
            @WebParam(name = "descripcion") String descripcion) {

        categoria.setNombre(nombre);
        categoria.setDescripcion(descripcion);

        daoCategoria.Register(categoria);
        return true;
    }

    
        //WEBMETHOD --> ACTUALIZAR CATEGORIAS
    @WebMethod(operationName = "actualizarCategorias")
    public boolean actualizarCategoria(
            @WebParam(name = "nombre") String nombre,
            @WebParam(name = "descripcion") String descripcion,
            @WebParam(name = "id") int id) {

        categoria.setNombre(nombre);
        categoria.setDescripcion(descripcion);
        categoria.setId(id);
 
        boolean cambioExitoso = daoCategoria.Update(categoria);
        return cambioExitoso;
    }

    //WEBMETHOD --> ELIMINAR CATEGORIA POR ID
    @WebMethod(operationName = "eliminarCategoria")
    public boolean eliminarCategoria(@WebParam(name = "ID") int id) {
        categoria.setId(id);
        return daoCategoria.Delete(categoria);
    }
}
