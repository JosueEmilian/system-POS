package dao;

import config.ConnectionDB;
import interfaces.CrudProductos;
import model.ModelProductos;
import java.sql.*;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author josueemilian
 */
public class DaoProductos implements CrudProductos {

    ConnectionDB conexion = new ConnectionDB();
    ResultSet rs = null;
    String strSQL = "";

    @Override
    public List<ModelProductos> listar() {
        ArrayList<ModelProductos> lstProductos = new ArrayList<>();
        try {
            strSQL = "SELECT productos.id, productos.nombre, categorias.nombre AS categoria, productos.descripcion, productos.precio, productos.stock\n"
                    + "FROM productos\n"
                    + "JOIN categorias\n"
                    + "ON productos.categoria_id = categorias.id;";
            ConnectionDB conexion = new ConnectionDB();
            Connection conn = conexion.open();
            PreparedStatement pst = conn.prepareStatement(strSQL);
            ResultSet rs = (ResultSet) pst.executeQuery();

            while (rs.next()) {
                ModelProductos productos = new ModelProductos();
                productos.setId(rs.getInt("id"));
                productos.setNombre(rs.getString("nombre"));
                productos.setCategoria(rs.getString("categoria"));
                productos.setDescripcion(rs.getString("descripcion"));
                productos.setPrecio(rs.getDouble("precio"));
                productos.setStock(rs.getInt("stock"));
                lstProductos.add(productos);
            }

            rs.close();
            pst.close();
            conn.close();

        } catch (ClassNotFoundException | SQLException ex) {
            Logger.getLogger(DaoProductos.class.getName()).log(Level.SEVERE, null, ex);
        }
        return lstProductos;
    }

    @Override
    public ModelProductos list(int id) {
        ModelProductos productos = new ModelProductos();
        try {
            strSQL = "SELECT productos.id, productos.nombre, categorias.nombre AS categoria, productos.descripcion, productos.precio, productos.stock\n"
                    + "FROM productos\n"
                    + "JOIN categorias\n"
                    + "ON productos.categoria_id = categorias.id\n"
                    + "where productos.id = ?";

            Connection con = conexion.open();
            PreparedStatement pst = con.prepareStatement(strSQL);
            pst.setInt(1, id);
            rs = pst.executeQuery();

            while (rs.next()) {
                productos.setId(rs.getInt("id"));
                productos.setNombre(rs.getString("nombre"));
                productos.setCategoria(rs.getString("categoria"));
                productos.setDescripcion(rs.getString("descripcion"));
                productos.setPrecio(rs.getDouble("precio"));
                productos.setStock(rs.getInt("stock"));
            }
            rs.close();
            pst.close();
            conexion.close();

        } catch (ClassNotFoundException ex) {
            Logger.getLogger(DaoProductos.class.getName()).log(Level.SEVERE, null, ex);
        } catch (Exception ex) {
            Logger.getLogger(DaoProductos.class.getName()).log(Level.SEVERE, null, ex);
        }

        return productos;
    }

    @Override
    public boolean Register(ModelProductos producto) {
        boolean res = false;
        try {
            strSQL = "INSERT INTO productos (nombre, categoria_id, descripcion, precio, stock) VALUES (?, ?, ?, ?, ?)";
            Connection con = conexion.open();
            PreparedStatement pst = con.prepareStatement(strSQL);

            pst.setString(1, producto.getNombre());
            pst.setInt(2, producto.getAsignarCategoria());
            pst.setString(3, producto.getDescripcion());
            pst.setDouble(4, producto.getPrecio());
            pst.setInt(5, producto.getStock());

            int result = pst.executeUpdate();

            if (result > 0) {
                res = true;
            }

            pst.close();
            con.close();

        } catch (ClassNotFoundException | SQLException ex) {
            Logger.getLogger(DaoProductos.class.getName()).log(Level.SEVERE, null, ex);
            res = false;
        }

        return res;
    }

    @Override
    public boolean Update(ModelProductos producto) {
        boolean cambioExitoso = false;
        Connection con = null;
        PreparedStatement pst = null;
        try {
            strSQL = "UPDATE productos SET nombre=?, categoria_id=?, descripcion=?, precio=?, stock=? WHERE id=?";
            con = conexion.open();
            pst = con.prepareStatement(strSQL);

            pst.setString(1, producto.getNombre());
            pst.setInt(2, producto.getAsignarCategoria());
            pst.setString(3, producto.getDescripcion());
            pst.setDouble(4, producto.getPrecio());
            pst.setInt(5, producto.getStock());
            pst.setInt(6, producto.getId());

            // Se ejecuta la consulta y se obtiene el resultado
            int resultado = pst.executeUpdate();
            if (resultado > 0) {
                cambioExitoso = true;
            }
        } catch (ClassNotFoundException | SQLException ex) {
            Logger.getLogger(DaoProductos.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            try {
                if (pst != null) {
                    pst.close();
                }
                if (con != null) {
                    con.close();
                }
            } catch (SQLException ex) {
                Logger.getLogger(DaoProductos.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

        return cambioExitoso;
    }

    @Override
    public boolean Delete(ModelProductos producto) {
        try {
            strSQL = "DELETE FROM productos WHERE id = ?";

            Connection con = conexion.open();
            PreparedStatement pst = con.prepareStatement(strSQL);
            pst.setInt(1, producto.getId());

            int result = pst.executeUpdate();
            return (result > 0);
        } catch (Exception e) {
            System.out.println("Error al eliminar el producto: " + e.getMessage());
            return false;
        } finally {
            try {
                conexion.close();
            } catch (Exception e) {
                System.out.println("Error al eliminar productos (cerrando conexión): " + e.getMessage());
            }
        }
    }

    @Override
    public List<ModelProductos> Search(String producto) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

}
