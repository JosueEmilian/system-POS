package interfaces;

import model.ModelCategoria;
import java.util.List;

/**
 *
 * @author josueemilian
 */
public interface CrudCategoria {
        List<ModelCategoria> listar();
    public ModelCategoria list(int id);
    public boolean Register(ModelCategoria categoria);
    public boolean Update(ModelCategoria categoria);
    public boolean Delete(ModelCategoria categoria);
    public List<ModelCategoria> Search(String categoria);

}
