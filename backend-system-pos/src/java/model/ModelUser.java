package model;


public class ModelUser {
    
    //principales db
    private int id;
    private String nombre;
    private String apellido;
    private String direccion;
    private String telefono;
    private String usuario;
    private String email;
    private String password;
    private boolean RegistrarEstado;
    private boolean isAdmin;
    
    //mostrar en table
    private String estado;

    public ModelUser() {
    }

    public ModelUser(int id, String nombre, String apellido, String direccion, String telefono, String usuario, String email, String password, boolean RegistrarEstado, boolean isAdmin, String estado) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
        this.telefono = telefono;
        this.usuario = usuario;
        this.email = email;
        this.password = password;
        this.RegistrarEstado = RegistrarEstado;
        this.isAdmin = isAdmin;
        this.estado = estado;
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

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isRegistrarEstado() {
        return RegistrarEstado;
    }

    public void setRegistrarEstado(boolean RegistrarEstado) {
        this.RegistrarEstado = RegistrarEstado;
    }

    public boolean isIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }


}
