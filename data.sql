INSERT INTO categories (id,name) VALUES (0,'PC');
INSERT INTO categories (id,name) VALUES (1,'Phone');
INSERT INTO categories (id,name) VALUES (2,'Audio');
INSERT INTO categories (id,name) VALUES (3,'Screen');
INSERT INTO categories (id,name) VALUES (4,'Other');

-- La contraseña del usuario es: 123456789Dh*
INSERT INTO users (mail,name,last_name,password,picture,is_admin) VALUES ('correofalso@dh.com','Admin','Allstartech','$2b$10$rYjW0D1uzUmaaK.mPNDs4.5kACwZbKhLUEJvg6sYM4sRzledO1inq','userDefault.png',1);

INSERT INTO products  (name,price,category_id,seller_id,img1,img2,description,discount) VALUES ('MOTHER GIGABYTE B660M AORUS PRO DDR4 S1700',51490,4,1,'mother-aorus1.jpg','mother-aorus2.jpg','Intel® B660 AORUS Motherboard with 12*+1+1 Twin Hybrid Phases Digital VRM Design, Fully Covered Thermal Design , 2 x PCIe 4.0 M.2 with Thermal Guard, Intel® 2.5GbE LAN, Rear USB 3.2 Gen 2x2 Type-C®, RGB FUSION 2.0, Q-Flash Plus',5);
INSERT INTO products  (name,price,category_id,seller_id,img1,img2,description,discount) VALUES ('NOTEBOOK LENOVO 15.6 V15 I5-1135G7 8GB 256GB',174860,0,1,'lenovo-1.jpg','lenovo-2.jpg','Modelo Lenovo V15 IIL, Procesador Intel Core i5-1135G7, Graficos Integrated Intel UHD Graphics',10);
INSERT INTO products  (name,price,category_id,seller_id,img1,img2,description,discount) VALUES ('VIDEO GEFORCE RTX 3080 10GB MSI GAMING Z TRIO LHR',294030,4,1,'geforce-1.jpg','geforce-2.jpg','Núcleos 8704 Unidades, Velocidad clock núcleo (MHz) Boost: 1830 MHz, Resolución máxima digital 7680x4320',5);
INSERT INTO products  (name,price,category_id,seller_id,img1,img2,description,discount) VALUES ('MONITOR 24 SAMSUNG LED IPS T350 FULL HD 75HZ FREESYNC',48200,3,1,'monitor-1.jpg','monitor-2.jpg','Modelo Samsung F24T350FHL, panel IPS, 75MHZ',10);
INSERT INTO products  (name,price,category_id,seller_id,img1,img2,description,discount) VALUES ('AURICULARES CORSAIR GAMING HS35 GREEN',11730,2,1,'corsair-1.jpg','corsair-2.jpg','Compatibilad con PC, PS4, XBOX One, Nintendo Switch & Mobile devices',7);
INSERT INTO products  (name,price,category_id,seller_id,img1,img2,description,discount) VALUES ('PC AMD RYZEN 5 5600G+A320+16GB+480GB',92440,0,1,'pc-completa-1.jpg','pc-completa-1.jpg','PC con procesadord AMD RYZEN 5 5600G, Motherboard A320AM4, Memoria Ram 3200mhz DDR4 8GB & Disco SSD 480GB',5);
INSERT INTO products  (name,price,category_id,seller_id,img1,img2,description,discount) VALUES ('SAMSUNG GALAXY Z FLIP 3',150340,1,1,'galaxy-flip-3.jpg','galaxy-flip-3.jpg','Celular Samsung galaxy Z Flip 3 color Violeta',4);
INSERT INTO products  (name,price,category_id,seller_id,img1,img2,description,discount) VALUES ('TECLADO HP HYPERX ALLOY ORIGINS 65 MECANICO 4P5D6AA',13990,4,1,'teclado-1.jpg','teclado-2.jpg','Teclado mecanico HyperX 65% red Switches',12);

SELECT * FROM categories;
select * from products;
select * FROM users;