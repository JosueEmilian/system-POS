package dao;

import interfaces.InterfaceVentas;
import config.ConnectionDB;
import java.sql.*;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import model.ModelVentas;

/**
 *
 * @author josueemilian
 */
public class DaoVentas implements InterfaceVentas {

    ConnectionDB conexion = new ConnectionDB();
    ResultSet rs = null;
    String strSQL = "";

    @Override
    public List<ModelVentas> listar() {
        ArrayList<ModelVentas> lstVentas = new ArrayList<>();
        try {
            strSQL = "SELECT ventas.id AS id_venta, vendedores.nombre AS vendedor, "
                    + "clientes.nombre AS cliente, productos.nombre AS producto, "
                    + "proveedores.nombre AS proveedor, ventas.cantidad, ventas.precio, "
                    + "ventas.cantidad * ventas.precio AS total\n"
                    + "FROM ventas\n"
                    + "JOIN vendedores ON ventas.vendedor_id = vendedores.id\n"
                    + "JOIN clientes ON ventas.cliente_id = clientes.id\n"
                    + "JOIN productos ON ventas.producto_id = productos.id\n"
                    + "JOIN proveedores ON ventas.proveedor_id = proveedores.id;";
            ConnectionDB conexion = new ConnectionDB();
            Connection conn = conexion.open();
            PreparedStatement pst = conn.prepareStatement(strSQL);
            ResultSet rs = (ResultSet) pst.executeQuery();

            while (rs.next()) {
                ModelVentas ventas = new ModelVentas();
                ventas.setId(rs.getInt("id_venta"));
                ventas.setVendedor(rs.getString("vendedor"));
                ventas.setCliente(rs.getString("cliente"));
                ventas.setProducto(rs.getString("producto"));
                ventas.setProveedor(rs.getString("proveedor"));
                ventas.setCantidad(rs.getInt("cantidad"));
                ventas.setPrecio(rs.getDouble("precio"));
                ventas.setTotal(rs.getDouble("total"));
                lstVentas.add(ventas);
            }

            rs.close();
            pst.close();
            conn.close();

        } catch (ClassNotFoundException | SQLException ex) {
            Logger.getLogger(DaoVentas.class.getName()).log(Level.SEVERE, null, ex);
        }
        return lstVentas;
    }

    @Override
    public ModelVentas list(int id) {
        ModelVentas ventas = new ModelVentas();
        try {
            strSQL = "SELECT ventas.id AS id_venta, vendedores.nombre AS vendedor, clientes.nombre AS cliente, productos.nombre AS producto, proveedores.nombre AS proveedor, ventas.cantidad, ventas.precio, ventas.cantidad * ventas.precio AS total\n"
                    + "FROM ventas\n"
                    + "JOIN vendedores ON ventas.vendedor_id = vendedores.id\n"
                    + "JOIN clientes ON ventas.cliente_id = clientes.id\n"
                    + "JOIN productos ON ventas.producto_id = productos.id\n"
                    + "JOIN proveedores ON ventas.proveedor_id = proveedores.id\n"
                    + "where ventas.id = ?";

            Connection con = conexion.open();
            PreparedStatement pst = con.prepareStatement(strSQL);
            pst.setInt(1, id);
            rs = pst.executeQuery();

            while (rs.next()) {
           ventas.setId(rs.getInt("id_venta"));
                ventas.setVendedor(rs.getString("vendedor"));
                ventas.setCliente(rs.getString("cliente"));
                ventas.setProducto(rs.getString("producto"));
                ventas.setProveedor(rs.getString("proveedor"));
                ventas.setCantidad(rs.getInt("cantidad"));
                ventas.setPrecio(rs.getDouble("precio"));
                ventas.setTotal(rs.getDouble("total"));
            }
            rs.close();
            pst.close();
            conexion.close();

        } catch (ClassNotFoundException ex) {
            Logger.getLogger(DaoVentas.class.getName()).log(Level.SEVERE, null, ex);
        } catch (Exception ex) {
            Logger.getLogger(DaoVentas.class.getName()).log(Level.SEVERE, null, ex);
        }

        return ventas;
    }

    @Override
    public boolean Register(ModelVentas venta) {
        boolean res = false;
        try {
            strSQL = "INSERT INTO ventas (cliente_id, proveedor_id, producto_id, vendedor_id, cantidad, precio) "
                    + "VALUES (?, ?, ?, ?, ?, ?)";
            Connection con = conexion.open();
            PreparedStatement pst = con.prepareStatement(strSQL);

            pst.setInt(1, venta.getIdCliente());
            pst.setInt(2, venta.getIdProveedor());
            pst.setInt(3, venta.getIdProducto());
            pst.setInt(4, venta.getIdVendedor());
            pst.setInt(5, venta.getCantidad());
            pst.setDouble(6, venta.getPrecio());

            int result = pst.executeUpdate();

            if (result > 0) {
                res = true;
            }

            pst.close();
            con.close();

        } catch (ClassNotFoundException | SQLException ex) {
            Logger.getLogger(DaoVentas.class.getName()).log(Level.SEVERE, null, ex);
            res = false;
        }

        return res;
    }

    @Override
    public boolean Delete(ModelVentas venta) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public List<ModelVentas> Search(String venta) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

}
