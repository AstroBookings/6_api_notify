/**
 * SQL_SCRIPTS
 * @description Constants containing SQL scripts for database operations
 */
export const SQL_SCRIPTS = {
  CLEAR_DATABASE: `
-- Drop existing tables

DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS templates CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS invoices CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS launches CASCADE;
DROP TABLE IF EXISTS rockets CASCADE;
DROP TABLE IF EXISTS agencies CASCADE;
DROP TABLE IF EXISTS travelers CASCADE;
`,

  CREATE_DATABASE: `
-- Create AstroBookings Operations Schema

-- Travelers Table
CREATE TABLE IF NOT EXISTS travelers (
  user_id TEXT PRIMARY KEY,
  contact_phone TEXT,
  contact_email TEXT NOT NULL,
  emergency_contact TEXT,
  travel_preferences JSON
);

-- Agencies Table
CREATE TABLE IF NOT EXISTS agencies (
  user_id TEXT PRIMARY KEY,
  description TEXT,
  contact_info TEXT,
  contact_email TEXT NOT NULL,
  legal_name TEXT NOT NULL,
  legal_tax_id TEXT NOT NULL,
  legal_address TEXT NOT NULL
);

-- Rockets Table
CREATE TABLE IF NOT EXISTS rockets (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id TEXT NOT NULL REFERENCES agencies(user_id),
  name TEXT NOT NULL,
  capacity INT NOT NULL,
  range TEXT CHECK (range IN ('low_earth', 'moon', 'mars'))
);

-- Launches Table
CREATE TABLE IF NOT EXISTS launches (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id TEXT NOT NULL REFERENCES agencies(user_id),
  rocket_id TEXT NOT NULL REFERENCES rockets(id),
  date TIMESTAMP NOT NULL,
  mission TEXT NOT NULL,
  destination TEXT NOT NULL,
  price_per_seat NUMERIC NOT NULL,
  status TEXT CHECK (status IN ('scheduled', 'confirmed', 'launched', 'delayed', 'aborted'))
);

-- Bookings Table
CREATE TABLE bookings (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  traveler_id TEXT NOT NULL REFERENCES travelers(user_id),
  launch_id TEXT NOT NULL REFERENCES launches(id),
  number_of_seats INT NOT NULL,
  total_price NUMERIC NOT NULL,
  status TEXT CHECK (status IN('pending', 'confirmed', 'canceled'))
);

-- Invoices Table
CREATE TABLE invoices (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  number TEXT NOT NULL,
  agency_id TEXT NOT NULL REFERENCES agencies(user_id),
  launch_id TEXT NOT NULL REFERENCES launches(id),
  amount NUMERIC NOT NULL,
  issued_at TIMESTAMP DEFAULT NOW(),
  status TEXT CHECK (status IN ('pending', 'paid', 'failed'))
);

-- Payments Table
CREATE TABLE payments (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id TEXT NOT NULL REFERENCES invoices(id),
  amount NUMERIC NOT NULL,
  paid_at TIMESTAMP DEFAULT NOW()
);

-- Templates Table
CREATE TABLE templates (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name TEXT CHECK (event_name IN ('launch_scheduled', 'launch_confirmed', 'launch_launched', 'launch_delayed', 'launch_aborted', 'booking_confirmed', 'booking_canceled', 'invoice_issued')),
  subject TEXT NOT NULL,
  message TEXT NOT NULL
);

-- Notifications Table
DROP TABLE IF EXISTS notifications CASCADE;
CREATE TABLE notifications (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id TEXT NOT NULL REFERENCES templates(id),
  user_id TEXT NOT NULL ,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  recipient TEXT NOT NULL,
  data JSON,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP ,
  status TEXT CHECK (status IN ('pending', 'read', 'sent', 'failed'))
);
`,

  SEED_DATABASE: `
-- Travelers
INSERT INTO travelers (user_id, contact_phone, contact_email, emergency_contact, travel_preferences)
VALUES 
  ('usr_t1', '+1-555-123-4567', 'john.doe@email.com', 'Jane Doe: +1-555-987-6543', '{"preferred_destination": "Moon", "dietary_restrictions": "Vegetarian"}'),
  ('usr_t2', '+44-20-1234-5678', 'emma.smith@email.co.uk', 'James Smith: +44-20-8765-4321', '{"preferred_destination": "Mars", "medical_conditions": "None"}');

-- Agencies
INSERT INTO agencies (user_id, description, contact_info, contact_email, legal_name, legal_tax_id, legal_address)
VALUES 
  ('usr_a1', 'Pioneering space travel since 2030', 'Phone: +1-800-SPACE-X1', 'info@spacex.com', 'SpaceX Corporation', 'US123456789', '1 Rocket Road, Hawthorne, CA 90250, USA'),
  ('usr_a2', 'Your gateway to the stars', 'Phone: +44-20-STAR-TREK', 'contact@virgingalactic.com', 'Virgin Galactic Ltd', 'UK987654321', '166 Tooley Street, London, SE1 2QH, UK');

-- Rockets
INSERT INTO rockets (id, agency_id, name, capacity, range)
VALUES 
  ('rkt_1', 'usr_a1', 'Falcon Heavy', 100, 'mars'),
  ('rkt_2', 'usr_a2', 'SpaceShipTwo', 6, 'low_earth'),
  ('rkt_3', 'usr_a1', 'Starship', 100, 'mars');

-- Launches
INSERT INTO launches (id, agency_id, rocket_id, date, mission,destination, price_per_seat, status)
VALUES 
  ('lnch_1', 'usr_a1', 'rkt_1', '2025-07-20 10:00:00', 'Artemis I', 'Moon', 28000000, 'scheduled'),
  ('lnch_2', 'usr_a2', 'rkt_2', '2025-09-15 14:30:00', 'Space walk', 'Earth', 250000, 'confirmed'),
  ('lnch_3', 'usr_a1', 'rkt_3', '2026-01-01 00:00:00', 'Red Planet', 'Mars', 55000000, 'scheduled');

-- Bookings
INSERT INTO bookings (id, traveler_id, launch_id, number_of_seats, total_price, status)
VALUES 
  ('bkg_1', 'usr_t1', 'lnch_1', 1, 28000000, 'confirmed'),
  ('bkg_2', 'usr_t2', 'lnch_2', 2, 500000, 'pending'),
  ('bkg_3', 'usr_t1', 'lnch_3', 1, 55000000, 'confirmed');

-- Invoices
INSERT INTO invoices (id, number, agency_id, launch_id, amount, issued_at, status)
VALUES 
  ('inv_1', 'INV-2025-001', 'usr_a1', 'lnch_1', 28000000, '2024-07-20 12:00:00', 'paid'),
  ('inv_2', 'INV-2025-002', 'usr_a2', 'lnch_2', 500000, '2024-09-01 09:00:00', 'pending'),
  ('inv_3', 'INV-2026-001', 'usr_a1', 'lnch_3', 55000000, '2025-01-01 00:00:00', 'pending');

-- Payments
INSERT INTO payments (id, invoice_id, amount, paid_at)
VALUES 
  ('pmt_1', 'inv_1', 28000000, '2024-07-21 14:30:00'),
  ('pmt_2', 'inv_2', 250000, '2024-09-10 11:15:00');

-- Templates
INSERT INTO templates (id, event_name, subject, message) 
VALUES 
  ('tmpl_1', 'booking_confirmed', 'Booking Confirmation for launch to {destination}', 'A new booking for {number_of_seats} seat(s) on the launch {mission} to {destination} on {date} has been confirmed. \n Congratulations!'),
  ('tmpl_2', 'launch_scheduled', 'Launch {mission} Scheduled', 'The launch {mission} to {destination} has been scheduled for {date}. \n We will send you a notification when the launch is confirmed.'),
  ('tmpl_3', 'invoice_issued', 'Invoice {number} Issued for launch {mission}', 'The invoice {number} for the launch {mission} to {destination} has been issued. \n The total price is {amount}. \n Please pay within 30 days.');

-- Notifications
INSERT INTO notifications (id, template_id, user_id, subject, message, recipient, data, status)
VALUES 
  ('notif_1', 'tmpl_1', 'usr_t1', 'Booking Confirmation', 'Your booking for 1 seat(s) on the launch to Moon on 2025-07-20 has been confirmed.', 'john.doe@email.com', '{"launch_id": "lnch_1", "destination": "Moon", "date": "2025-07-20"}', 'sent'),
  ('notif_2', 'tmpl_2', 'usr_a1', 'Launch Scheduled', 'The launch has been scheduled for 2026-01-01.', 'info@spacex.com', '{"launch_id": "lnch_3", "date": "2026-01-01"}', 'pending'),
  ('notif_3', 'tmpl_3', 'usr_a1', 'Invoice Issued', 'The invoice for the launch Red Planet has been issued.', 'info@spacex.com', '{"launch_id": "lnch_3"}', 'pending'),
  ('notif_4', 'tmpl_1', 'usr_t2', 'Booking Confirmation', 'Your booking for 2 seat(s) on the launch to Earth on 2025-09-15 has been confirmed.', 'emma.smith@email.co.uk', '{"launch_id": "lnch_2", "destination": "Earth", "date": "2025-09-15"}', 'pending');
`,
} as const;
