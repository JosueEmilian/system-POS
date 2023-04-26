package model;

/**
 *
 * @author josueemilian
 */
public class ModelProductos {
    private int id;
    private String nombre;
    private String categoria;
    private int asignarCategoria;
    private String descripcion;
    private double precio;
    private int stock;

    public ModelProductos() {
    }

    public ModelProductos(int id, String nombre, String categoria, int asignarCategoria, String descripcion, double precio, int stock) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.asignarCategoria = asignarCategoria;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public int getAsignarCategoria() {
        return asignarCategoria;
    }

    public void setAsignarCategoria(int asignarCategoria) {
        this.asignarCategoria = asignarCategoria;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }
    
    
}
