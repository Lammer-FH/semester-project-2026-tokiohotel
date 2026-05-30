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
    (3, 'Tokio Hotel Luxus-Suite', 4, 350.00, 'Die ultimative Suite mit Blick auf die Bühne und maximalem Luxus.', 'suite_1.jpg');


-- 3. LINKING: ROOM TYPES <-> EXTRAS
-- Standard single room gets only Wi-Fi (2)
INSERT INTO room_type_extras (room_type_id, extra_id) VALUES (1, 2);

-- Standard double room gets air conditioning (1) and Wi-Fi (2)
INSERT INTO room_type_extras (room_type_id, extra_id) VALUES (2, 1);
INSERT INTO room_type_extras (room_type_id, extra_id) VALUES (2, 2);

-- Luxury suite gets all extras (1, 2, 3, 4)
INSERT INTO room_type_extras (room_type_id, extra_id) VALUES (3, 1);
INSERT INTO room_type_extras (room_type_id, extra_id) VALUES (3, 2);
INSERT INTO room_type_extras (room_type_id, extra_id) VALUES (3, 3);
INSERT INTO room_type_extras (room_type_id, extra_id) VALUES (3, 4);


-- 4. INSERT SPECIFIC ROOMS
-- Single rooms (assigned to RoomType ID 1)
INSERT INTO rooms (id, room_number, room_type_id) VALUES (1, '101', 1);
INSERT INTO rooms (id, room_number, room_type_id) VALUES (2, '102', 1);

-- Double rooms (assigned to RoomType ID 2)
INSERT INTO rooms (id, room_number, room_type_id) VALUES (3, '201', 2);
INSERT INTO rooms (id, room_number, room_type_id) VALUES (4, '202', 2);
INSERT INTO rooms (id, room_number, room_type_id) VALUES (5, '203', 2);

-- Luxury suites (assigned to RoomType ID 3)
INSERT INTO rooms (id, room_number, room_type_id) VALUES (6, '483', 3);
INSERT INTO rooms (id, room_number, room_type_id) VALUES (7, '501', 3);


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
