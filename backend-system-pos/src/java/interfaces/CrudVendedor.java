package interfaces;

import java.util.List;
import model.ModelVendedor;

/**
 *
 * @author josueemilian
 */
public interface CrudVendedor {
                    List<ModelVendedor> listar();
    public ModelVendedor list(int id);
    public boolean Register(ModelVendedor vendedor);
    public boolean Update(ModelVendedor vendedor);
    public boolean Delete(ModelVendedor vendedor);
    public List<ModelVendedor> Search(String vendedor);
}
