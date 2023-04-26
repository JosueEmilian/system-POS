package dao;

import config.ConnectionDB;
import interfaces.CrudCategoria;
import java.sql.*;
import java.util.*;
import model.ModelCategoria;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author josueemilian
 */
public class DaoCategoria implements CrudCategoria {

    ConnectionDB conexion = new ConnectionDB();
    ResultSet rs = null;
    String strSQL = "";

    @Override
    public List<ModelCategoria> listar() {
        ArrayList<ModelCategoria> lstCategoria = new ArrayList<>();
        try {
            String strSQL = "SELECT * FROM categorias";
            ConnectionDB conexion = new ConnectionDB();
            Connection conn = conexion.open();
            PreparedStatement pst = conn.prepareStatement(strSQL);
            ResultSet rs = (ResultSet) pst.executeQuery();

            while (rs.next()) {
                ModelCategoria categoria = new ModelCategoria();
                categoria.setId(rs.getInt("id"));
                categoria.setNombre(rs.getString("nombre"));
                categoria.setDescripcion(rs.getString("descripcion"));
                lstCategoria.add(categoria);
            }

            rs.close();
            pst.close();
            conn.close();

        } catch (ClassNotFoundException | SQLException ex) {
            Logger.getLogger(DaoCategoria.class.getName()).log(Level.SEVERE, null, ex);
        }
        return lstCategoria;
    }

    @Override
    public ModelCategoria list(int id) {
        ModelCategoria categoria = new ModelCategoria();
        try {
            strSQL = "SELECT * FROM categorias WHERE ID = ?";

            Connection con = conexion.open();
            PreparedStatement pst = con.prepareStatement(strSQL);
            pst.setInt(1, id);
            rs = pst.executeQuery();

            while (rs.next()) {
                categoria.setId(rs.getInt("id"));
                categoria.setNombre(rs.getString("nombre"));
                categoria.setDescripcion(rs.getString("descripcion"));
            }
            rs.close();
            pst.close();
            conexion.close();

        } catch (ClassNotFoundException ex) {
            Logger.getLogger(DaoCategoria.class.getName()).log(Level.SEVERE, null, ex);
        } catch (Exception ex) {
            Logger.getLogger(DaoCategoria.class.getName()).log(Level.SEVERE, null, ex);
        }

        return categoria;
    }

    @Override
    public boolean Register(ModelCategoria categoria) {
        boolean res = false;
        try {
            strSQL = "INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)";
            Connection con = conexion.open();
            PreparedStatement pst = con.prepareStatement(strSQL);

            pst.setString(1, categoria.getNombre());
            pst.setString(2, categoria.getDescripcion());

            int result = pst.executeUpdate();

            if (result > 0) {
                res = true;
            }

            pst.close();
            con.close();

        } catch (ClassNotFoundException | SQLException ex) {
            Logger.getLogger(DaoCategoria.class.getName()).log(Level.SEVERE, null, ex);
            res = false;
        }

        return res;
    }

    @Override
    public boolean Update(ModelCategoria categoria) {
        boolean cambioExitoso = false;
        Connection con = null;
        PreparedStatement pst = null;
        try {
            strSQL = "UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?";
            con = conexion.open();
            pst = con.prepareStatement(strSQL);

            pst.setString(1, categoria.getNombre());
            pst.setString(2, categoria.getDescripcion());
            pst.setInt(3, categoria.getId()); 

            // Se ejecuta la consulta y se obtiene el resultado
            int resultado = pst.executeUpdate();
            if (resultado > 0) {
                cambioExitoso = true;
            }
        } catch (ClassNotFoundException | SQLException ex) {
            Logger.getLogger(DaoCategoria.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            try {
                if (pst != null) {
                    pst.close();
                }
                if (con != null) {
                    con.close();
                }
            } catch (SQLException ex) {
                Logger.getLogger(DaoCategoria.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

        return cambioExitoso;
    }

    @Override
    public boolean Delete(ModelCategoria categoria) {
        try {
            strSQL = "DELETE FROM categorias WHERE id = ?";

            Connection con = conexion.open();
            PreparedStatement pst = con.prepareStatement(strSQL);
            pst.setInt(1, categoria.getId());

            int result = pst.executeUpdate();
            return (result > 0);
        } catch (Exception e) {
            System.out.println("Error al eliminar la categoria: " + e.getMessage());
            return false;
        } finally {
            try {
                conexion.close();
            } catch (Exception e) {
                System.out.println("Error al eliminar categoria (cerrando conexión): " + e.getMessage());
            }
        }
    }

    @Override
    public List<ModelCategoria> Search(String categoria) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

}
