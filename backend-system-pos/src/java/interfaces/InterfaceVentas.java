package interfaces;

import java.util.List;
import model.ModelVentas;

/**
 *
 * @author josueemilian
 */
public interface InterfaceVentas {

    List<ModelVentas> listar();
    public ModelVentas list(int id);
    public boolean Register(ModelVentas venta);
    public boolean Delete(ModelVentas venta);
    public List<ModelVentas> Search(String venta);
}
