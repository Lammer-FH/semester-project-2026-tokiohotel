-- 1. INSERT EXTRAS
INSERT INTO extras (id, name, icon) VALUES (1, 'Klimaanlage', 'snow-outline');
INSERT INTO extras (id, name, icon) VALUES (2, 'WLAN (High-Speed)', 'wifi-outline');
INSERT INTO extras (id, name, icon) VALUES (3, 'Minibar', 'wine-outline');
INSERT INTO extras (id, name, icon) VALUES (4, 'Whirlpool', 'water-outline');

-- 2. INSERT ROOM TYPES
INSERT INTO room_types (id, title, capacity, cost, description, images) VALUES
    (1, 'Standard Einzelzimmer', 1, 85.00, 'Ein gemütliches Zimmer für Alleinreisende.', 'single_1.jpg');

INSERT INTO room_types (id, title, capacity, cost, description, images) VALUES
    (2, 'Standard Doppelzimmer', 2, 130.00, 'Perfekt für Paare mit komfortablem Doppelbett.', 'double_1.webp');

INSERT INTO room_types (id, title, capacity, cost, description, images) VALUES
    (3, 'Familienzimmer', 4, 180.00, 'Geräumiges Zimmer mit Platz für die ganze Familie.', 'family.webp');

INSERT INTO room_types (id, title, capacity, cost, description, images) VALUES
    (4, 'Junior Suite', 2, 250.00, 'Elegante Suite mit separatem Wohnbereich für gehobene Ansprüche.', 'junior.jpg');

INSERT INTO room_types (id, title, capacity, cost, description, images) VALUES
    (5, 'Tokio Hotel Luxus-Suite', 4, 350.00, 'Die ultimative Suite mit Blick auf die Bühne und maximalem Luxus.', 'suite_1.jpg');

INSERT INTO room_types (id, title, capacity, cost, description, images) VALUES
    (6, 'Penthouse Suite', 6, 500.00, 'Exklusives Penthouse über den Dächern der Stadt mit Panoramablick.', 'penthouse.jpg');


-- 3. LINKING: ROOM TYPES <-> EXTRAS
-- Standard single room gets only Wi-Fi (2)
INSERT INTO room_type_extras (room_type_id, extra_id) VALUES (1, 2);

-- Standard double room gets air conditioning (1) and Wi-Fi (2)
INSERT INTO room_type_extras (room_type_id, extra_id) VALUES (2, 1);
INSERT INTO room_type_extras (room_type_id, extra_id) VALUES (2, 2);

-- Family room gets air conditioning (1) and Wi-Fi (2)
INSERT INTO room_type_extras (room_type_id, extra_id) VALUES (3, 1);
INSERT INTO room_type_extras (room_type_id, extra_id) VALUES (3, 2);

-- Junior suite gets air conditioning (1), Wi-Fi (2) and minibar (3)
INSERT INTO room_type_extras (room_type_id, extra_id) VALUES (4, 1);
INSERT INTO room_type_extras (room_type_id, extra_id) VALUES (4, 2);
INSERT INTO room_type_extras (room_type_id, extra_id) VALUES (4, 3);

-- Luxury suite gets all extras (1, 2, 3, 4)
INSERT INTO room_type_extras (room_type_id, extra_id) VALUES (5, 1);
INSERT INTO room_type_extras (room_type_id, extra_id) VALUES (5, 2);
INSERT INTO room_type_extras (room_type_id, extra_id) VALUES (5, 3);
INSERT INTO room_type_extras (room_type_id, extra_id) VALUES (5, 4);

-- Penthouse suite gets all extras (1, 2, 3, 4)
INSERT INTO room_type_extras (room_type_id, extra_id) VALUES (6, 1);
INSERT INTO room_type_extras (room_type_id, extra_id) VALUES (6, 2);
INSERT INTO room_type_extras (room_type_id, extra_id) VALUES (6, 3);
INSERT INTO room_type_extras (room_type_id, extra_id) VALUES (6, 4);


-- 4. INSERT SPECIFIC ROOMS (exactly one room per room type)
INSERT INTO rooms (id, room_number, room_type_id) VALUES (1, '101', 1);
INSERT INTO rooms (id, room_number, room_type_id) VALUES (2, '201', 2);
INSERT INTO rooms (id, room_number, room_type_id) VALUES (3, '301', 3);
INSERT INTO rooms (id, room_number, room_type_id) VALUES (4, '401', 4);
INSERT INTO rooms (id, room_number, room_type_id) VALUES (5, '501', 5);
INSERT INTO rooms (id, room_number, room_type_id) VALUES (6, '601', 6);


-- 5. INSERT SAMPLE GUEST + BOOKING (blocks room 6 for CURRENT_DATE + 7..+9 to demonstrate filter and 409)
INSERT INTO guests (id, first_name, last_name, email) VALUES (1, 'Bill', 'Kaulitz', 'bill@tokiohotel.de');
INSERT INTO bookings (id, guest_id, room_id, total_cost, booking_date, start_date, end_date, with_breakfast)
    VALUES (1, 1, 6, 730.00, CURRENT_DATE, DATEADD('DAY', 7, CURRENT_DATE), DATEADD('DAY', 9, CURRENT_DATE), TRUE);

-- 6. ADVANCE IDENTITY COUNTERS past the seeded explicit ids so runtime inserts don't collide
ALTER TABLE extras ALTER COLUMN id RESTART WITH 100;
ALTER TABLE room_types ALTER COLUMN id RESTART WITH 100;
ALTER TABLE rooms ALTER COLUMN id RESTART WITH 100;
ALTER TABLE guests ALTER COLUMN id RESTART WITH 100;
ALTER TABLE bookings ALTER COLUMN id RESTART WITH 100;
