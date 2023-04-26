package interfaces;

import java.util.List;
import model.ModelCliente;

/**
 *
 * @author josueemilian
 */
public interface CrudCliente {
            List<ModelCliente> listar();
    public ModelCliente list(int id);
    public boolean Register(ModelCliente cliente);
    public boolean Update(ModelCliente cliente);
    public boolean Delete(ModelCliente cliente);
    public List<ModelCliente> Search(String cliente);
}
