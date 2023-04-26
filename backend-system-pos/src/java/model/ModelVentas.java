package model;

/**
 *
 * @author josueemilian
 */
public class ModelVentas {
    
    //VAR INGRESO
    private int id;
    private int idCliente;
    private int idProveedor;
    private int idProducto;
    private int idVendedor;
    private int cantidad;
    private double precio;
    
    //VAR VISUALIZACION
    private String vendedor;
    private String cliente;
    private String producto;
    private String proveedor;
    private double total;

    public ModelVentas() {
    }

    public ModelVentas(int id, int idCliente, int idProveedor, int idProducto, int idVendedor, int cantidad, double precio, String vendedor, String cliente, String producto, String proveedor, double total) {
        this.id = id;
        this.idCliente = idCliente;
        this.idProveedor = idProveedor;
        this.idProducto = idProducto;
        this.idVendedor = idVendedor;
        this.cantidad = cantidad;
        this.precio = precio;
        this.vendedor = vendedor;
        this.cliente = cliente;
        this.producto = producto;
        this.proveedor = proveedor;
        this.total = total;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(int idCliente) {
        this.idCliente = idCliente;
    }

    public int getIdProveedor() {
        return idProveedor;
    }

    public void setIdProveedor(int idProveedor) {
        this.idProveedor = idProveedor;
    }

    public int getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(int idProducto) {
        this.idProducto = idProducto;
    }

    public int getIdVendedor() {
        return idVendedor;
    }

    public void setIdVendedor(int idVendedor) {
        this.idVendedor = idVendedor;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public String getVendedor() {
        return vendedor;
    }

    public void setVendedor(String vendedor) {
        this.vendedor = vendedor;
    }

    public String getCliente() {
        return cliente;
    }

    public void setCliente(String cliente) {
        this.cliente = cliente;
    }

    public String getProducto() {
        return producto;
    }

    public void setProducto(String producto) {
        this.producto = producto;
    }

    public String getProveedor() {
        return proveedor;
    }

    public void setProveedor(String proveedor) {
        this.proveedor = proveedor;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }
    
    
}
