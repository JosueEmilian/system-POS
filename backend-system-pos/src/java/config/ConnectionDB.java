package config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class ConnectionDB {

    private PreparedStatement pst = null;
    private Connection con = null;
    private ResultSet rs = null;

    //Connection String
    String url = "jdbc:mysql://localhost:3306/POS_SYSTEM_NEW?useSSL=false&useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC";
    String driver = "com.mysql.cj.jdbc.Driver";

    public Connection open() throws ClassNotFoundException {
        try {
            Class.forName(driver);
            con = DriverManager.getConnection(url, "root", "Administrador_123");
        } catch (SQLException e) {
            Logger.getLogger(Connection.class.getName()).log(Level.SEVERE, null, e);
            System.out.println("Excepción: " + e.getMessage());
        }
        return con;
    }

    public void close() throws Exception {
        try {
            if (con != null) {
                con.clearWarnings();
                con.close();
            }
        } catch (SQLException e) {
            con = null;
            throw new Exception(e.getMessage());
        }
    }

    public boolean executeSql(String cmd) throws Exception {
        if (cmd != null)
            try {
            this.pst = this.con.prepareStatement(cmd);
            this.pst.executeUpdate();
        } catch (SQLException e) {
            throw new Exception(e.getMessage());
        } else {
            throw new Exception("El comando a ejecutar es nulo!");
        }
        return true;
    }

    public ResultSet executeQuery(String strSQL) {

        if (strSQL != null)
            try {

            pst = con.prepareStatement(strSQL);
            rs = pst.executeQuery();
        } catch (SQLException e) {
            System.out.println("Error al ejecutar el query en Clase: Conexion: " + e.toString());
            Logger.getLogger(Connection.class.getName()).log(Level.SEVERE, null, e);
        }
        //close();
        return rs;
    }

//     TEST CONEXION
//    public static void main(String[] args) {
//        ConnectionDB connectionDB = new ConnectionDB();
//        try {
//            Connection connection = connectionDB.open();
//            System.out.println("Conexión exitosa!");
//            
//        } catch (Exception e) {
//        }
//    }

}
