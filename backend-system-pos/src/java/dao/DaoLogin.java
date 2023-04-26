package dao;

import config.ConnectionDB;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import javax.xml.ws.Holder;
import model.ModelVendedor;

public class DaoLogin {

    String strSQL = "";

    private Connection conn = null;

    public DaoLogin() throws ClassNotFoundException {
        ConnectionDB connDB = new ConnectionDB();
        this.conn = connDB.open();
    }

    public void close() throws Exception {
        ConnectionDB connDB = new ConnectionDB();
        connDB.close();
    }

    //metodo para validar credenciales
    public boolean validarCredenciales(String usuario, String contrasenia, Holder<List<ModelVendedor>> vendedorHolder) {
        boolean resultado = false;
        List<ModelVendedor> vendedorList = new ArrayList<>();
        try {
            strSQL = "SELECT id, nombre, direccion, telefono, email from vendedores where email = ? AND password = ?";

            // Crear una consulta preparada para buscar las credenciales ingresadas
            PreparedStatement ps = conn.prepareStatement(strSQL);
            ps.setString(1, usuario);
            ps.setString(2, contrasenia);

            // Ejecutar la consulta y obtener el resultado
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                ModelVendedor vendedor = new ModelVendedor();
                
                vendedor.setId(rs.getInt("id"));
                vendedor.setNombre(rs.getString("nombre"));
                vendedor.setDireccion(rs.getString("direccion"));
                vendedor.setTelefono(rs.getString("telefono"));
                vendedor.setEmail(rs.getString("email"));

                vendedorList.add(vendedor);
            }

            if (!vendedorList.isEmpty()) {
                resultado = true;
            }

            // Cerrar la conexión y liberar los recursos
            rs.close();
            ps.close();
            conn.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        vendedorHolder.value = vendedorList;
        return resultado;
    }
}
