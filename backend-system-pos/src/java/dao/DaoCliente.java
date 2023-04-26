package dao;

import interfaces.CrudCliente;
import config.ConnectionDB;
import java.sql.*;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import model.ModelCliente;

/**
 *
 * @author josueemilian
 */
public class DaoCliente implements CrudCliente {

    ConnectionDB conexion = new ConnectionDB();
    ResultSet rs = null;
    String strSQL = "";

    @Override
    public List<ModelCliente> listar() {
        ArrayList<ModelCliente> lstClientes = new ArrayList<>();
        try {
            strSQL = "SELECT * FROM CLIENTES";
            ConnectionDB conexion = new ConnectionDB();
            Connection conn = conexion.open();
            PreparedStatement pst = conn.prepareStatement(strSQL);
            ResultSet rs = (ResultSet) pst.executeQuery();

            while (rs.next()) {
                ModelCliente cliente = new ModelCliente();
                cliente.setId(rs.getInt("id"));
                cliente.setNombre(rs.getString("nombre"));
                cliente.setEmail(rs.getString("email"));
                cliente.setTelefono(rs.getString("telefono"));
                lstClientes.add(cliente);
            }

            rs.close();
            pst.close();
            conn.close();

        } catch (ClassNotFoundException | SQLException ex) {
            Logger.getLogger(DaoCliente.class.getName()).log(Level.SEVERE, null, ex);
        }
        return lstClientes;
    }

    @Override
    public ModelCliente list(int id) {
        ModelCliente cliente = new ModelCliente();
        try {
            strSQL = "SELECT * FROM CLIENTES WHERE ID = ?";

            Connection con = conexion.open();
            PreparedStatement pst = con.prepareStatement(strSQL);
            pst.setInt(1, id);
            rs = pst.executeQuery();

            while (rs.next()) {
                cliente.setId(rs.getInt("id"));
                cliente.setNombre(rs.getString("nombre"));
                cliente.setEmail(rs.getString("email"));
                cliente.setTelefono(rs.getString("telefono"));
            }
            rs.close();
            pst.close();
            conexion.close();

        } catch (ClassNotFoundException ex) {
            Logger.getLogger(DaoCliente.class.getName()).log(Level.SEVERE, null, ex);
        } catch (Exception ex) {
            Logger.getLogger(DaoCliente.class.getName()).log(Level.SEVERE, null, ex);
        }

        return cliente;
    }

    @Override
    public boolean Register(ModelCliente cliente) {
        boolean res = false;
        try {
            strSQL = "INSERT INTO clientes (nombre, email, telefono) VALUES (?, ?, ?)";
            Connection con = conexion.open();
            PreparedStatement pst = con.prepareStatement(strSQL);

            pst.setString(1, cliente.getNombre());
            pst.setString(2, cliente.getEmail());
            pst.setString(3, cliente.getTelefono());

            int result = pst.executeUpdate();

            if (result > 0) {
                res = true;
            }

            pst.close();
            con.close();

        } catch (ClassNotFoundException | SQLException ex) {
            Logger.getLogger(DaoCliente.class.getName()).log(Level.SEVERE, null, ex);
            res = false;
        }

        return res;
    }

    @Override
    public boolean Update(ModelCliente cliente) {
        boolean cambioExitoso = false;
        Connection con = null;
        PreparedStatement pst = null;
        try {
            strSQL = "UPDATE clientes SET nombre=?, email=?, telefono=? WHERE id=?";
            con = conexion.open();
            pst = con.prepareStatement(strSQL);

            pst.setString(1, cliente.getNombre());
            pst.setString(2, cliente.getEmail());
            pst.setString(3, cliente.getTelefono());
            pst.setInt(4, cliente.getId());

            // Se ejecuta la consulta y se obtiene el resultado
            int resultado = pst.executeUpdate();
            if (resultado > 0) {
                cambioExitoso = true;
            }
        } catch (ClassNotFoundException | SQLException ex) {
            Logger.getLogger(DaoCliente.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            try {
                if (pst != null) {
                    pst.close();
                }
                if (con != null) {
                    con.close();
                }
            } catch (SQLException ex) {
                Logger.getLogger(DaoCliente.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

        return cambioExitoso;
    }

    @Override
    public boolean Delete(ModelCliente cliente) {
        try {
            strSQL = "DELETE FROM clientes WHERE id = ?";

            Connection con = conexion.open();
            PreparedStatement pst = con.prepareStatement(strSQL);
            pst.setInt(1, cliente.getId());

            int result = pst.executeUpdate();
            return (result > 0);
        } catch (Exception e) {
            System.out.println("Error al eliminar el cliente: " + e.getMessage());
            return false;
        } finally {
            try {
                conexion.close();
            } catch (Exception e) {
                System.out.println("Error al eliminar cliente (cerrando conexión): " + e.getMessage());
            }
        }
    }

    @Override
    public List<ModelCliente> Search(String cliente) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

}
