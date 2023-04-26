package dao;

import interfaces.CrudVendedor;
import config.ConnectionDB;
import java.sql.*;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import model.ModelVendedor;

/**
 *
 * @author josueemilian
 */
public class DaoVendedor implements CrudVendedor {

    ConnectionDB conexion = new ConnectionDB();
    ResultSet rs = null;
    String strSQL = "";

    @Override
    public List<ModelVendedor> listar() {
        ArrayList<ModelVendedor> lstVendedor = new ArrayList<>();
        try {
            strSQL = "SELECT ID, NOMBRE, DIRECCION, TELEFONO, EMAIL FROM VENDEDORES";
            ConnectionDB conexion = new ConnectionDB();
            Connection conn = conexion.open();
            PreparedStatement pst = conn.prepareStatement(strSQL);
            ResultSet rs = (ResultSet) pst.executeQuery();

            while (rs.next()) {
                ModelVendedor vendedor = new ModelVendedor();
                vendedor.setId(rs.getInt("ID"));
                vendedor.setNombre(rs.getString("NOMBRE"));
                vendedor.setDireccion(rs.getString("DIRECCION"));
                vendedor.setTelefono(rs.getString("TELEFONO"));
                vendedor.setEmail(rs.getString("EMAIL"));
                lstVendedor.add(vendedor);
            }

            rs.close();
            pst.close();
            conn.close();

        } catch (ClassNotFoundException | SQLException ex) {
            Logger.getLogger(DaoVendedor.class.getName()).log(Level.SEVERE, null, ex);
        }
        return lstVendedor;
    }

    @Override
    public ModelVendedor list(int id) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public boolean Register(ModelVendedor vendedor) {
        boolean res = false;
        try {
            strSQL = "INSERT INTO vendedores (nombre, direccion, telefono, email, password) VALUES (?, ?, ?, ?, ?)";
            Connection con = conexion.open();
            PreparedStatement pst = con.prepareStatement(strSQL);

            pst.setString(1, vendedor.getNombre());
            pst.setString(2, vendedor.getDireccion());
            pst.setString(3, vendedor.getTelefono());
            pst.setString(4, vendedor.getEmail());
            pst.setString(5, vendedor.getPassword());

            int result = pst.executeUpdate();

            if (result > 0) {
                res = true;
            }

            pst.close();
            con.close();

        } catch (ClassNotFoundException | SQLException ex) {
            Logger.getLogger(DaoVendedor.class.getName()).log(Level.SEVERE, null, ex);
            res = false;
        }

        return res;
    }

    @Override
    public boolean Update(ModelVendedor vendedor) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public boolean Delete(ModelVendedor vendedor) {
        try {
            strSQL = "DELETE FROM vendedores WHERE id = ?";

            Connection con = conexion.open();
            PreparedStatement pst = con.prepareStatement(strSQL);
            pst.setInt(1, vendedor.getId());

            int result = pst.executeUpdate();
            return (result > 0);
        } catch (Exception e) {
            System.out.println("Error al eliminar el vendedor: " + e.getMessage());
            return false;
        } finally {
            try {
                conexion.close();
            } catch (Exception e) {
                System.out.println("Error al eliminar vendedor (cerrando conexión): " + e.getMessage());
            }
        }
    }

    @Override
    public List<ModelVendedor> Search(String vendedor) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

}
