package dao;

import interfaces.CrudProveedor;
import config.ConnectionDB;
import java.sql.*;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import model.ModelProveedor;

/**
 *
 * @author josueemilian
 */
public class DaoProveedor implements CrudProveedor {

    ConnectionDB conexion = new ConnectionDB();
    ResultSet rs = null;
    String strSQL = "";

    @Override
    public List<ModelProveedor> listar() {
        ArrayList<ModelProveedor> lstProveedor = new ArrayList<>();
        try {
            strSQL = "SELECT * FROM PROVEEDORES";
            ConnectionDB conexion = new ConnectionDB();
            Connection conn = conexion.open();
            PreparedStatement pst = conn.prepareStatement(strSQL);
            ResultSet rs = (ResultSet) pst.executeQuery();

            while (rs.next()) {
                ModelProveedor proveedor = new ModelProveedor();
                proveedor.setId(rs.getInt("id"));
                proveedor.setNombre(rs.getString("nombre"));
                proveedor.setEmail(rs.getString("email"));
                proveedor.setTelefono(rs.getString("telefono"));
                lstProveedor.add(proveedor);
            }

            rs.close();
            pst.close();
            conn.close();

        } catch (ClassNotFoundException | SQLException ex) {
            Logger.getLogger(DaoProveedor.class.getName()).log(Level.SEVERE, null, ex);
        }
        return lstProveedor;
    }

    @Override
    public ModelProveedor list(int id) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public boolean Register(ModelProveedor proveedor) {
        boolean res = false;
        try {
            strSQL = "INSERT INTO proveedores (nombre, email, telefono) " +
                       "VALUES (?, ?, ?)";
            Connection con = conexion.open();
            PreparedStatement pst = con.prepareStatement(strSQL);

            pst.setString(1, proveedor.getNombre());
            pst.setString(2, proveedor.getEmail());
            pst.setString(3, proveedor.getTelefono());

            int result = pst.executeUpdate();

            if (result > 0) {
                res = true;
            }

            pst.close();
            con.close();

        } catch (ClassNotFoundException | SQLException ex) {
            Logger.getLogger(DaoProveedor.class.getName()).log(Level.SEVERE, null, ex);
            res = false;
        }

        return res;
    }

    @Override
    public boolean Update(ModelProveedor proveedor) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public boolean Delete(ModelProveedor proveedor) {
        try {
            strSQL = "DELETE FROM proveedores WHERE id = ?";

            Connection con = conexion.open();
            PreparedStatement pst = con.prepareStatement(strSQL);
            pst.setInt(1, proveedor.getId());

            int result = pst.executeUpdate();
            return (result > 0);
        } catch (Exception e) {
            System.out.println("Error al eliminar el proveedor: " + e.getMessage());
            return false;
        } finally {
            try {
                conexion.close();
            } catch (Exception e) {
                System.out.println("Error al eliminar proveedor (cerrando conexión): " + e.getMessage());
            }
        }
    }

    @Override
    public List<ModelProveedor> Search(String proveedor) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

}
