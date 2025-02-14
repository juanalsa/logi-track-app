-- Inserts Estado Orden
INSERT INTO order_status (name, created_at) VALUES
('En espera', NOW()),
('En transito', NOW()),
('Entregado', NOW());

-- Inserts Tipo Producto
INSERT INTO product_type (name, created_at) VALUES
('Electronica', NOW()),
('Ropa', NOW()),
('Documentos', NOW()),
('Alimentos', NOW()),
('Medicamentos', NOW()),
('Juguetes', NOW()),
('Hogar', NOW()),
('Herramientas', NOW());

-- Inserts Ciudad
INSERT INTO city (name, department, country, created_at) VALUES
('Bogota', 'Cundinamarca', 'Colombia', NOW()),
('Medellin', 'Antioquia', 'Colombia', NOW()),
('Cali', 'Valle del Cauca', 'Colombia', NOW()),
('Barranquilla', 'Atlantico', 'Colombia', NOW()),
('Cartagena', 'Bolivar', 'Colombia', NOW()),
('Bucaramanga', 'Santander', 'Colombia', NOW());

-- Inserts Ruta
INSERT INTO route (name, distance_km, estimated_time, origin_city_id, destination_city_id, created_at) VALUES
('Cali -> Bogota', 500.00, '10:00:00', 3, 1, NOW()),
('Medellin -> Barranquilla', 700.00, '12:00:00', 2, 4, NOW()),
('Cartagena -> Bucaramanga', 600.00, '11:00:00', 5, 6, NOW()),
('Bogota -> Cali', 500.00, '10:00:00', 1, 3, NOW()),
('Barranquilla -> Medellin', 700.00, '12:00:00', 4, 2, NOW()),
('Bucaramanga -> Cartagena', 600.00, '11:00:00', 6, 5, NOW());

-- Inserts Transportista
INSERT INTO carrier (name, vehicle_type, max_capacity, availability, created_at) VALUES
('Juan Perez', 'Moto', 20.00, 1, NOW()),
('Carlos Gomez', 'Furgon', 500.00, 1, NOW()),
('Luis Rodriguez', 'Camion pequeno', 1000.00, 1, NOW()),
('Pedro Martinez', 'Camion grande', 5000.00, 1, NOW()),
('Jorge Ramirez', 'Moto', 20.00, 1, NOW()),
('Andres Herrera', 'Furgon', 500.00, 1, NOW()),
('Sergio Torres', 'Camion pequeno', 1000.00, 1, NOW()),
('Daniel Castro', 'Camion grande', 5000.00, 1, NOW()),
('Fernando Rios', 'Moto', 20.00, 1, NOW()),
('Ricardo Fernandez', 'Furgon', 500.00, 1, NOW()),
('Oscar Salazar', 'Camion pequeno', 1000.00, 1, NOW()),
('Hugo Mendoza', 'Camion grande', 5000.00, 1, NOW()),
('Victor Figueroa', 'Moto', 20.00, 1, NOW()),
('Raul Ortega', 'Furgon', 500.00, 1, NOW()),
('Julian Cardenas', 'Camion pequeno', 1000.00, 1, NOW()),
('Alejandro Mora', 'Camion grande', 5000.00, 1, NOW()),
('Manuel Vargas', 'Moto', 20.00, 1, NOW()),
('Rodrigo Suarez', 'Furgon', 500.00, 1, NOW()),
('Camilo Pineda', 'Camion pequeno', 1000.00, 1, NOW()),
('Esteban Chavez', 'Camion grande', 5000.00, 1, NOW());
