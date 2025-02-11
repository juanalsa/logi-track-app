CREATE DATABASE IF NOT EXISTS logistics_db;
USE logistics_db;

-- Tabla de Ciudades
CREATE TABLE city (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Info de contacto
CREATE TABLE contact (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    city_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (city_id) REFERENCES city(id)
);

-- Tabla de Usuarios
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') NOT NULL,
    is_active BOOLEAN DEFAULT 1,
    contact_id INT UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (contact_id) REFERENCES contact(id)
);

-- Tabla de Estados de Orden de Envío
CREATE TABLE order_status (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Tipos de Producto
CREATE TABLE product_type (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Transportistas
CREATE TABLE carrier (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    vehicle_type VARCHAR(50) NOT NULL,
    max_capacity DECIMAL(10,2) NOT NULL,
    availability BOOLEAN NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Rutas
CREATE TABLE route (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    distance_km DECIMAL(10,2) NOT NULL,
    estimated_time TIME NOT NULL,
    origin_city_id INT NOT NULL,
    destination_city_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (origin_city_id) REFERENCES city(id),
    FOREIGN KEY (destination_city_id) REFERENCES city(id)
);

-- Tabla de Órdenes de Envío
CREATE TABLE shipment_order (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    sender_contact_id INT NOT NULL,
    recipient_contact_id INT NOT NULL,
    weight DECIMAL(10,2) NOT NULL,
    dimensions VARCHAR(100) NOT NULL,
    product_type_id INT NOT NULL,
    description TEXT,
    declared_value DECIMAL(10,2),
    shipping_cost DECIMAL(10,2),
    order_status_id INT NOT NULL,
    carrier_id INT,
    route_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (sender_contact_id) REFERENCES contact(id),
    FOREIGN KEY (recipient_contact_id) REFERENCES contact(id),
    FOREIGN KEY (product_type_id) REFERENCES product_type(id),
    FOREIGN KEY (order_status_id) REFERENCES order_status(id),
    FOREIGN KEY (carrier_id) REFERENCES carrier(id),
    FOREIGN KEY (route_id) REFERENCES route(id)
);

-- Tabla de Seguimiento de Órdenes
CREATE TABLE shipment_tracking (
    id INT AUTO_INCREMENT PRIMARY KEY,
    shipment_order_id INT NOT NULL,
    order_status_id INT NOT NULL,
    description TEXT NOT NULL,
    current_city_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (shipment_order_id) REFERENCES shipment_order(id),
    FOREIGN KEY (order_status_id) REFERENCES order_status(id),
    FOREIGN KEY (current_city_id) REFERENCES city(id)
);