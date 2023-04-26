package interfaces;

import java.util.List;
import model.ModelProveedor;

/**
 *
 * @author josueemilian
 */
public interface CrudProveedor {
                List<ModelProveedor> listar();
    public ModelProveedor list(int id);
    public boolean Register(ModelProveedor proveedor);
    public boolean Update(ModelProveedor proveedor);
    public boolean Delete(ModelProveedor proveedor);
    public List<ModelProveedor> Search(String proveedor);
}
