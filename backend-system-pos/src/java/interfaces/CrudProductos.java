
package interfaces;

import java.util.List;
import model.ModelProductos;

/**
 *
 * @author josueemilian
 */
public interface CrudProductos {
            List<ModelProductos> listar();
    public ModelProductos list(int id);
    public boolean Register(ModelProductos producto);
    public boolean Update(ModelProductos producto);
    public boolean Delete(ModelProductos producto);
    public List<ModelProductos> Search(String producto);
}
