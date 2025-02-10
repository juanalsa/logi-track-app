CREATE DATABASE IF NOT EXISTS logistics_db;
USE logistics_db;

-- Tabla de Ciudades
CREATE TABLE Ciudad (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    departamento VARCHAR(100) NOT NULL,
    pais VARCHAR(100) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Contactos
CREATE TABLE Contacto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    correo VARCHAR(100) UNIQUE,
    ciudad_id INT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ciudad_id) REFERENCES Ciudad(id)
);

-- Tabla de Usuarios
CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    correo VARCHAR(100) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'user') NOT NULL,
    estado BOOLEAN DEFAULT 1,
    contacto_id INT UNIQUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (contacto_id) REFERENCES Contacto(id)
);

-- Tabla de Estados de Orden de Envío
CREATE TABLE EstadoOrden (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Tipos de Producto
CREATE TABLE TipoProducto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Transportistas
CREATE TABLE Transportista (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tipo_vehiculo VARCHAR(50) NOT NULL,
    capacidad_maxima DECIMAL(10,2) NOT NULL,
    disponibilidad BOOLEAN DEFAULT 1,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Rutas
CREATE TABLE Ruta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    distancia_km DECIMAL(10,2) NOT NULL,
    tiempo_estimado TIME NOT NULL,
    ciudad_origen_id INT NOT NULL,
    ciudad_destino_id INT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ciudad_origen_id) REFERENCES Ciudad(id),
    FOREIGN KEY (ciudad_destino_id) REFERENCES Ciudad(id)
);

-- Tabla de Órdenes de Envío
CREATE TABLE OrdenEnvio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    remitente_id INT NOT NULL,
    destinatario_id INT NOT NULL,
    peso DECIMAL(10,2) NOT NULL,
    dimensiones VARCHAR(100) NOT NULL,
    tipo_producto_id INT NOT NULL,
    descripcion TEXT,
    valor_declarado DECIMAL(10,2),
    valor_flete DECIMAL(10,2),
    estado_id INT NOT NULL,
    transportista_id INT,
    ruta_id INT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
    FOREIGN KEY (remitente_id) REFERENCES Contacto(id),
    FOREIGN KEY (destinatario_id) REFERENCES Contacto(id),
    FOREIGN KEY (tipo_producto_id) REFERENCES TipoProducto(id),
    FOREIGN KEY (estado_id) REFERENCES EstadoOrden(id),
    FOREIGN KEY (transportista_id) REFERENCES Transportista(id),
    FOREIGN KEY (ruta_id) REFERENCES Ruta(id)
);

-- Tabla de Seguimiento de Órdenes
CREATE TABLE SeguimientoOrden (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orden_envio_id INT NOT NULL,
    estado_id INT NOT NULL,
    descripcion TEXT,
    ciudad_id INT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (orden_envio_id) REFERENCES OrdenEnvio(id),
    FOREIGN KEY (estado_id) REFERENCES EstadoOrden(id),
    FOREIGN KEY (ciudad_id) REFERENCES Ciudad(id)
);
