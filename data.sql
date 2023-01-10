INSERT INTO categories (id,name) values (0,'PC');
INSERT INTO categories (id,name) values (1,'Phone');
INSERT INTO categories (id,name) values (2,'Audio');
INSERT INTO categories (id,name) values (3,'Screen');
INSERT INTO categories (id,name) values (4,'Other');

SELECT * FROM categories;

INSERT INTO products  (name,price,category_id,img1,img2,description,discount) values ('MOTHER GIGABYTE B660M AORUS PRO DDR4 S1700',51490,4,'mother-aorus1.jpg','mother-aorus2.jpg','Intel® B660 AORUS Motherboard with 12*+1+1 Twin Hybrid Phases Digital VRM Design, Fully Covered Thermal Design , 2 x PCIe 4.0 M.2 with Thermal Guard, Intel® 2.5GbE LAN, Rear USB 3.2 Gen 2x2 Type-C®, RGB FUSION 2.0, Q-Flash Plus',5);
INSERT INTO products  (name,price,category_id,img1,img2,description,discount) values ('NOTEBOOK LENOVO 15.6 V15 I5-1135G7 8GB 256GB',174860,0,'lenovo-1.jpg','lenovo-2.jpg','Modelo Lenovo V15 IIL, Procesador Intel Core i5-1135G7, Graficos Integrated Intel UHD Graphics',10);
INSERT INTO products  (name,price,category_id,img1,img2,description,discount) values ('VIDEO GEFORCE RTX 3080 10GB MSI GAMING Z TRIO LHR',294030,4,'geforce-1.jpg','geforce-2.jpg','Núcleos 8704 Unidades, Velocidad clock núcleo (MHz) Boost: 1830 MHz, Resolución máxima digital 7680x4320',5);
INSERT INTO products  (name,price,category_id,img1,img2,description,discount) values ('MONITOR 24 SAMSUNG LED IPS T350 FULL HD 75HZ FREESYNC',48200,3,'monitor-1.jpg','monitor-2.jpg','Modelo Samsung F24T350FHL, panel IPS, 75MHZ',10);
INSERT INTO products  (name,price,category_id,img1,img2,description,discount) values ('AURICULARES CORSAIR GAMING HS35 GREEN',11730,2,'corsair-1.jpg','corsair-2.jpg','Compatibilad con PC, PS4, XBOX One, Nintendo Switch & Mobile devices',7);
INSERT INTO products  (name,price,category_id,img1,img2,description,discount) values ('PC AMD RYZEN 5 5600G+A320+16GB+480GB',92440,0,'pc-completa-1.jpg','pc-completa-1.jpg','PC con procesadord AMD RYZEN 5 5600G, Motherboard A320AM4, Memoria Ram 3200mhz DDR4 8GB & Disco SSD 480GB',5);
INSERT INTO products  (name,price,category_id,img1,img2,description,discount) values ('SAMSUNG GALAXY Z FLIP 3',150340,1,'galaxy-flip-3.jpg','galaxy-flip-3.jpg','Celular Samsung galaxy Z Flip 3 color Violeta',4);
INSERT INTO products  (name,price,category_id,img1,img2,description,discount) values ('TECLADO HP HYPERX ALLOY ORIGINS 65 MECANICO 4P5D6AA',13990,4,'teclado-1.jpg','teclado-2.jpg','Teclado mecanico HyperX 65% red Switches',12);

select * from products;

delete from products 
where id = 9;

select * FROM users;