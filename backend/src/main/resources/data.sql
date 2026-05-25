-- 1. EXTRAS EINFÜGEN
INSERT INTO extras (id, name, icon) VALUES (1, 'Klimaanlage', 'ac_unit');
INSERT INTO extras (id, name, icon) VALUES (2, 'WLAN (High-Speed)', 'wifi');
INSERT INTO extras (id, name, icon) VALUES (3, 'Minibar', 'local_bar');
INSERT INTO extras (id, name, icon) VALUES (4, 'Whirlpool', 'hot_tub');

-- 2. ZIMMERTYPEN (ROOM TYPES) EINFÜGEN
-- Hinweis: Die ID-Zuweisung erfolgt hier manuell für die Verknüpfung, H2 setzt die Identity-Sequenz automatisch fort.
INSERT INTO room_types (id, title, capacity, cost, description, images) VALUES
    (1, 'Standard Einzelzimmer', 1, 85.00, 'Ein gemütliches Zimmer für Alleinreisende.', 'img_single_1.jpg,img_single_2.jpg');

INSERT INTO room_types (id, title, capacity, cost, description, images) VALUES
    (2, 'Standard Doppelzimmer', 2, 130.00, 'Perfekt für Paare mit komfortablem Doppelbett.', 'img_double_1.jpg');

INSERT INTO room_types (id, title, capacity, cost, description, images) VALUES
    (3, 'Tokio Hotel Luxus-Suite', 4, 350.00, 'Die ultimative Suite mit Blick auf die Bühne und maximalem Luxus.', 'suite_1.jpg,suite_2.jpg,suite_3.jpg');


-- 3. VERKNÜPFUNG: ROOM TYPES <-> EXTRAS (Many-To-Many Zwischentabelle)
-- Standard Einzelzimmer erhält nur WLAN (2)
INSERT INTO room_type_extras (room_type_id, extra_id) VALUES (1, 2);

-- Standard Doppelzimmer erhält Klimaanlage (1) und WLAN (2)
INSERT INTO room_type_extras (room_type_id, extra_id) VALUES (2, 1);
INSERT INTO room_type_extras (room_type_id, extra_id) VALUES (2, 2);

-- Luxus-Suite erhält alle Extras (1, 2, 3, 4)
INSERT INTO room_type_extras (room_type_id, extra_id) VALUES (3, 1);
INSERT INTO room_type_extras (room_type_id, extra_id) VALUES (3, 2);
INSERT INTO room_type_extras (room_type_id, extra_id) VALUES (3, 3);
INSERT INTO room_type_extras (room_type_id, extra_id) VALUES (3, 4);


-- 4. KONKRETE ZIMMER (ROOMS) EINFÜGEN
-- Einzelzimmer (Zugeordnet zu RoomType ID 1)
INSERT INTO rooms (id, room_number, room_type_id) VALUES (1, '101', 1);
INSERT INTO rooms (id, room_number, room_type_id) VALUES (2, '102', 1);

-- Doppelzimmer (Zugeordnet zu RoomType ID 2)
INSERT INTO rooms (id, room_number, room_type_id) VALUES (3, '201', 2);
INSERT INTO rooms (id, room_number, room_type_id) VALUES (4, '202', 2);
INSERT INTO rooms (id, room_number, room_type_id) VALUES (5, '203', 2);

-- Luxus-Suiten (Zugeordnet zu RoomType ID 3)
INSERT INTO rooms (id, room_number, room_type_id) VALUES (6, '483', 3); -- Kleine Anspielung ;)
INSERT INTO rooms (id, room_number, room_type_id) VALUES (7, '501', 3);