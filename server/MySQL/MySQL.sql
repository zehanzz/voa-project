DROP DATABASE IF EXISTS voa_database;
CREATE DATABASE voa_database;
USE voa_database;

CREATE TABLE hzb_card (
  pay_id INT(10) NOT NULL,
  ch_fname VARCHAR(20) NOT NULL,
  ch_lname VARCHAR(20) NOT NULL,
  c_number BIGINT(50) NOT NULL,
  exp_date DATE NOT NULL,
  cvv INT(3) NOT NULL,
  type VARCHAR(20) NOT NULL
);
ALTER TABLE hzb_card
ADD CONSTRAINT hzb_card_pk PRIMARY KEY (pay_id);
ALTER TABLE hzb_card
MODIFY pay_id INT(10) NOT NULL COMMENT 'Cash, credit or debit card',
  MODIFY ch_fname VARCHAR(20) NOT NULL COMMENT 'card host first name',
  MODIFY ch_lname VARCHAR(20) NOT NULL COMMENT 'card host last name',
  MODIFY c_number VARCHAR(20) NOT NULL COMMENT 'card number',
  MODIFY exp_date DATE NOT NULL COMMENT 'card expiration date',
  MODIFY cvv VARCHAR(3) NOT NULL COMMENT 'card CVV three digit number',
  MODIFY type VARCHAR(10) NOT NULL COMMENT 'card type, debit or credit';
CREATE TABLE hzb_attract (
  attract_id INT(10) NOT NULL AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL,
  description VARCHAR(100) NOT NULL,
  type VARCHAR(15) NOT NULL,
  status VARCHAR(20) NOT NULL,
  cpacity INT(4) NOT NULL,
  min_height INT(3) NOT NULL,
  duration INT(3) NOT NULL,
  section VARCHAR(1) NOT NULL,
  PRIMARY KEY (attract_id)
);
ALTER TABLE hzb_attract
MODIFY name VARCHAR(20) NOT NULL COMMENT 'attraction name',
  MODIFY description VARCHAR(100) NOT NULL COMMENT 'attraction description',
  MODIFY type VARCHAR(15) NOT NULL COMMENT 'attraction type',
  MODIFY status VARCHAR(20) NOT NULL COMMENT 'attraction status, open, closed, under maintenance',
  MODIFY cpacity INT(4) NOT NULL COMMENT 'attraction audience capacity',
  MODIFY min_height INT(3) NOT NULL COMMENT 'visitor minimum height that can attend attraction in cm.',
  MODIFY duration INT(3) NOT NULL COMMENT 'attraction duration in minutes',
  MODIFY section VARCHAR(1) NOT NULL COMMENT 'attraction section';
CREATE TABLE hzb_group (
  visitor_id INT(10) NOT NULL,
  group_size INT(3) NOT NULL,
  PRIMARY KEY (visitor_id)
);
ALTER TABLE hzb_group
MODIFY visitor_id INT(10) NOT NULL COMMENT '',
  MODIFY group_size INT(3) NOT NULL COMMENT '';
CREATE TABLE hzb_individual (
  visitor_id INT(10) NOT NULL,
  gender VARCHAR(12) NOT NULL,
  nationality VARCHAR(20) NOT NULL,
  PRIMARY KEY (visitor_id)
);
ALTER TABLE hzb_individual
MODIFY visitor_id INT(10) NOT NULL COMMENT '',
  MODIFY gender VARCHAR(12) NOT NULL COMMENT '',
  MODIFY nationality VARCHAR(20) NOT NULL COMMENT '';
CREATE TABLE hzb_member (
  visitor_id INT(10) NOT NULL,
  mem_id INT(10) NOT NULL,
  mem_date DATE NOT NULL,
  num INT(5) NOT NULL,
  PRIMARY KEY (visitor_id)
);
ALTER TABLE hzb_member
MODIFY visitor_id INT(10) NOT NULL COMMENT '',
  MODIFY mem_id INT(10) NOT NULL COMMENT 'rest of number of discount ticket this member',
  MODIFY mem_date DATE NOT NULL COMMENT '',
  MODIFY num INT(5) NOT NULL COMMENT '';
CREATE TABLE hzb_order (
  ord_id INT(10) NOT NULL AUTO_INCREMENT,
  ord_date DATE NOT NULL,
  ord_quantity INT(5) NOT NULL,
  ord_amount INT(4) NOT NULL,
  show_id INT(10),
  store_id INT(10),
  visitor_id INT(10) NOT NULL,
  park_id INT(10),
  tickets_id INT(10),
  pay_id INT(10),
  PRIMARY KEY (ord_id)
);
ALTER TABLE hzb_order
MODIFY ord_date DATE NOT NULL COMMENT 'order date',
  MODIFY ord_quantity INT(5) NOT NULL COMMENT 'quantity of item in order',
  MODIFY ord_amount INT(4) NOT NULL COMMENT 'amount of money of this order',
  MODIFY show_id INT(10) COMMENT '',
  MODIFY store_id INT(10) COMMENT '',
  MODIFY visitor_id INT(10) NOT NULL COMMENT '',
  MODIFY park_id INT(10) COMMENT '',
  MODIFY tickets_id INT(10) COMMENT '',
  MODIFY pay_id INT(10) COMMENT '';
CREATE UNIQUE INDEX hzb_order__idx ON hzb_order (park_id ASC);
CREATE UNIQUE INDEX hzb_order__idxv1 ON hzb_order (pay_id ASC);
CREATE UNIQUE INDEX hzb_order__idxv2 ON hzb_order (tickets_id ASC);
CREATE TABLE hzb_parking (
  park_id INT(10) NOT NULL AUTO_INCREMENT,
  lot VARCHAR(1) NOT NULL,
  spot_number INT(3) NOT NULL,
  time_in DATE NOT NULL,
  time_out DATE NOT NULL,
  fee INT(3) NOT NULL,
  visitor_id INT(10),
  PRIMARY KEY (park_id)
);
ALTER TABLE hzb_parking
MODIFY lot VARCHAR(1) NOT NULL COMMENT 'parking lot number',
  MODIFY spot_number INT(3) NOT NULL COMMENT 'spot number of this parking position',
  MODIFY time_in DATE NOT NULL COMMENT 'time start parking in this parking lot',
  MODIFY time_out DATE NOT NULL COMMENT 'time leave parking lot',
  MODIFY fee INT(3) NOT NULL COMMENT 'parking fee',
  MODIFY visitor_id INT(10) COMMENT '';
CREATE TABLE hzb_payment (
  pay_id INT(10) NOT NULL AUTO_INCREMENT,
  pay_method VARCHAR(16) NOT NULL,
  pay_date DATE NOT NULL,
  pay_amount INT(5) NOT NULL,
  ch_fname VARCHAR(20),
  ch_lname VARCHAR(20),
  c_number BIGINT(50),
  exp_date DATE,
  cvv INT(3),
  type VARCHAR(20),
  PRIMARY KEY (pay_id),
  CHECK (pay_method IN ('Cash', 'Credit', 'Debit'))
);
ALTER TABLE hzb_payment
MODIFY pay_method VARCHAR(16) NOT NULL COMMENT 'Cash, credit or debit card',
  MODIFY pay_date DATE NOT NULL COMMENT 'payment date',
  MODIFY pay_amount INT(5) NOT NULL COMMENT 'payment amount';
CREATE TABLE hzb_school (
  visitor_id INT(10) NOT NULL,
  school_id VARCHAR(15) NOT NULL,
  school_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (visitor_id)
);
ALTER TABLE hzb_school
MODIFY school_id VARCHAR(15) NOT NULL COMMENT '',
  MODIFY school_name VARCHAR(30) NOT NULL COMMENT '';
CREATE TABLE hzb_show (
  show_id INT(10) NOT NULL AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL,
  description VARCHAR(100) NOT NULL,
  type VARCHAR(20) NOT NULL,
  s_time DATE NOT NULL,
  e_time DATE NOT NULL,
  wchair_access CHAR(1) NOT NULL,
  price INT(3) NOT NULL,
  PRIMARY KEY (show_id)
);
ALTER TABLE hzb_show
MODIFY name VARCHAR(20) NOT NULL COMMENT 'show name',
  MODIFY description VARCHAR(100) NOT NULL COMMENT 'show description',
  MODIFY type VARCHAR(20) NOT NULL COMMENT 'show type, drama, musical, comedy, horror, adventure',
  MODIFY s_time DATE NOT NULL COMMENT 'start time of the show',
  MODIFY e_time DATE NOT NULL COMMENT 'End time of the show',
  MODIFY wchair_access CHAR(1) NOT NULL COMMENT 'Wheelchair Accessibility yes or no',
  MODIFY price INT(3) NOT NULL COMMENT 'show price';
CREATE TABLE hzb_store (
  store_id INT(10) NOT NULL AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL,
  category VARCHAR(20) NOT NULL,
  description VARCHAR(100) NOT NULL,
  menu_item VARCHAR(20) NOT NULL,
  unit_price INT(5) NOT NULL,
  PRIMARY KEY (store_id)
);
ALTER TABLE hzb_store
MODIFY name VARCHAR(20) NOT NULL COMMENT 'store name',
  MODIFY category VARCHAR(20) NOT NULL COMMENT 'store category Food stall, Ice cream parlor, Restaurant, Gift Shop, Apparels',
  MODIFY description VARCHAR(100) NOT NULL COMMENT 'store description',
  MODIFY menu_item VARCHAR(20) NOT NULL COMMENT 'item in this store menu',
  MODIFY unit_price INT(5) NOT NULL COMMENT 'item unit price';
CREATE TABLE hzb_summ (
  sum_id INT(10) NOT NULL AUTO_INCREMENT,
  amount INT(10) NOT NULL,
  vist_date DATE NOT NULL,
  source VARCHAR(20) NOT NULL,
  source_id INT(10) NOT NULL,
  visitor_id INT(10) NOT NULL,
  PRIMARY KEY (sum_id)
);
ALTER TABLE hzb_summ
MODIFY amount INT(10) NOT NULL COMMENT 'amount of money',
  MODIFY vist_date DATE NOT NULL COMMENT 'visit date of this summary',
  MODIFY source VARCHAR(20) NOT NULL COMMENT 'source of this payment show, store, parking, ticket',
  MODIFY source_id INT(10) NOT NULL COMMENT 'source id of this payment.';
CREATE TABLE hzb_tickets (
  tickets_id INT(10) NOT NULL AUTO_INCREMENT,
  method VARCHAR(20) NOT NULL,
  prch_date DATE NOT NULL,
  vist_date DATE NOT NULL,
  type VARCHAR(20) NOT NULL,
  price INT(3) NOT NULL,
  visitor_id INT(10),
  PRIMARY KEY (tickets_id)
);
ALTER TABLE hzb_tickets
MODIFY method VARCHAR(20) NOT NULL COMMENT 'Online or onsite',
  MODIFY prch_date DATE NOT NULL COMMENT 'Purchase date of the ticket',
  MODIFY vist_date DATE NOT NULL COMMENT 'Visit date of the ticket',
  MODIFY type VARCHAR(20) NOT NULL COMMENT 'Child, adult, senior or member.',
  MODIFY price INT(3) NOT NULL COMMENT 'tickets price';
CREATE TABLE hzb_visit (
  attract_id INT(10) NOT NULL,
  `DATE` DATE NOT NULL,
  visitor_id INT(10) NOT NULL,
  PRIMARY KEY (attract_id, visitor_id)
);
ALTER TABLE hzb_visit
MODIFY `DATE` DATE NOT NULL COMMENT 'date visitor attend attraction';
CREATE TABLE hzb_visitor (
  visitor_id INT(10) NOT NULL AUTO_INCREMENT,
  fname VARCHAR(20) NOT NULL COMMENT 'visitor first name',
  lname VARCHAR(20) NOT NULL COMMENT 'visitor last name',
  street VARCHAR(15) NOT NULL COMMENT 'visitor address',
  city VARCHAR(15) NOT NULL,
  state VARCHAR(15) NOT NULL,
  zipcode VARCHAR(12) NOT NULL,
  country VARCHAR(15) NOT NULL,
  email VARCHAR(30) NOT NULL COMMENT 'visitor email',
  password VARCHAR(100) NOT NULL,
  cell_num BIGINT(13) NOT NULL COMMENT 'visitor cell number',
  dob DATE NOT NULL COMMENT 'visitor age',
  type VARCHAR(41) NOT NULL COMMENT 'visitor type, individual, group, member, student.',
  visit_date DATE NOT NULL COMMENT 'Last time visit',
  group_size INT(5),
  school_name VARCHAR(20),
  gender VARCHAR(10),
  nationality VARCHAR(15),
  PRIMARY KEY (visitor_id)
);
ALTER TABLE hzb_visitor
ADD CONSTRAINT ch_inh_hzb_visitor CHECK (
    type IN ('Individual', 'Group', 'School', 'Member')
  );
ALTER TABLE hzb_visitor
ADD role ENUM('Employee', 'Customer') DEFAULT 'Customer';
ALTER TABLE hzb_card
ADD CONSTRAINT card_hzb_payment_fk FOREIGN KEY (pay_id) REFERENCES hzb_payment (pay_id);
ALTER TABLE hzb_group
ADD CONSTRAINT group_hzb_visitor_fk FOREIGN KEY (visitor_id) REFERENCES hzb_visitor (visitor_id);
ALTER TABLE hzb_order
ADD CONSTRAINT hzb_order_hzb_parking_fk FOREIGN KEY (park_id) REFERENCES hzb_parking (park_id);
ALTER TABLE hzb_order
ADD CONSTRAINT hzb_order_hzb_payment_fk FOREIGN KEY (pay_id) REFERENCES hzb_payment (pay_id);
ALTER TABLE hzb_order
ADD CONSTRAINT hzb_order_hzb_show_fk FOREIGN KEY (show_id) REFERENCES hzb_show (show_id);
ALTER TABLE hzb_order
ADD CONSTRAINT hzb_order_hzb_store_fk FOREIGN KEY (store_id) REFERENCES hzb_store (store_id);
ALTER TABLE hzb_order
ADD CONSTRAINT hzb_order_hzb_tickets_fk FOREIGN KEY (tickets_id) REFERENCES hzb_tickets (tickets_id);
ALTER TABLE hzb_order
ADD CONSTRAINT hzb_order_hzb_visitor_fk FOREIGN KEY (visitor_id) REFERENCES hzb_visitor (visitor_id);
ALTER TABLE hzb_parking
ADD CONSTRAINT hzb_parking_hzb_visitor_fk FOREIGN KEY (visitor_id) REFERENCES hzb_visitor (visitor_id);
ALTER TABLE hzb_tickets
ADD CONSTRAINT hzb_tickets_hzb_visitor_fk FOREIGN KEY (visitor_id) REFERENCES hzb_visitor (visitor_id);
ALTER TABLE hzb_visit
ADD CONSTRAINT hzb_visit_hzb_attract_fk FOREIGN KEY (attract_id) REFERENCES hzb_attract (attract_id);
ALTER TABLE hzb_visit
ADD CONSTRAINT hzb_visit_hzb_visitor_fk FOREIGN KEY (visitor_id) REFERENCES hzb_visitor (visitor_id);
ALTER TABLE hzb_individual
ADD CONSTRAINT individual_hzb_visitor_fk FOREIGN KEY (visitor_id) REFERENCES hzb_visitor (visitor_id);
ALTER TABLE hzb_member
ADD CONSTRAINT member_hzb_visitor_fk FOREIGN KEY (visitor_id) REFERENCES hzb_visitor (visitor_id);
ALTER TABLE hzb_school
ADD CONSTRAINT school_hzb_visitor_fk FOREIGN KEY (visitor_id) REFERENCES hzb_visitor (visitor_id);
DELIMITER / / CREATE TRIGGER arc_fkarc_8_hzb_individual BEFORE
INSERT ON hzb_individual FOR EACH ROW BEGIN
DECLARE d VARCHAR(41);
SELECT a.type INTO d
FROM hzb_visitor a
WHERE a.visitor_id = NEW.visitor_id;
IF (
  d IS NULL
  OR d <> 'Individual'
) THEN SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'FK INDIVIDUAL_HZB_VISITOR_FK in Table HZB_INDIVIDUAL violates Arc constraint on Table HZB_VISITOR - discriminator column TYPE doesn''t have value ''Individual''';
END IF;
END / / CREATE TRIGGER arc_fkarc_8_hzb_group BEFORE
INSERT ON hzb_group FOR EACH ROW BEGIN
DECLARE d VARCHAR(41);
SELECT a.type INTO d
FROM hzb_visitor a
WHERE a.visitor_id = NEW.visitor_id;
IF (
  d IS NULL
  OR d <> 'Group'
) THEN SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'FK GROUP_HZB_VISITOR_FK in Table HZB_GROUP violates Arc constraint on Table HZB_VISITOR - discriminator column TYPE doesn''t have value ''Group''';
END IF;
END // 
CREATE TRIGGER arc_fkarc_8_hzb_member BEFORE
INSERT ON hzb_member FOR EACH ROW BEGIN
DECLARE d VARCHAR(41);
SELECT a.type INTO d
FROM hzb_visitor a
WHERE a.visitor_id = NEW.visitor_id;
IF (
  d IS NULL
  OR d <> 'Member'
) THEN SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'FK MEMBER_HZB_VISITOR_FK in Table HZB_MEMBER violates Arc constraint on Table HZB_VISITOR - discriminator column TYPE doesn''t have value ''Member''';
END IF;
END // 
CREATE TRIGGER arc_fkarc_8_hzb_school BEFORE
INSERT ON hzb_school FOR EACH ROW BEGIN
DECLARE d VARCHAR(41);
SELECT a.type INTO d
FROM hzb_visitor a
WHERE a.visitor_id = NEW.visitor_id;
IF (
  d IS NULL
  OR d <> 'School'
) THEN SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'FK SCHOOL_HZB_VISITOR_FK in Table HZB_SCHOOL violates Arc constraint on Table HZB_VISITOR - discriminator column TYPE doesn''t have value ''School''';
END IF;
END // 
DELIMITER ;
ALTER TABLE hzb_show
ADD CONSTRAINT CHK_ShowType CHECK (
    type IN (
      'Drama',
      'Musical',
      'Comedy',
      'Horror',
      'Adventure'
    )
  );
ALTER TABLE hzb_show
ADD CONSTRAINT CHK_WheelchairAccessible CHECK (wchair_access IN ('1', '0'));
ALTER TABLE hzb_attract
ADD CONSTRAINT CHK_AttractStatus CHECK (
    status IN ('Open', 'Closed', 'Under Maintenance')
  );
ALTER TABLE hzb_store
ADD CONSTRAINT CHK_StoreCategory CHECK (
    category IN (
      'Food Stall',
      'Ice Cream Parlor',
      'Restaurant',
      'Gift Shop',
      'Apparels'
    )
  );
ALTER TABLE hzb_tickets
ADD CONSTRAINT CHK_TicketMethod CHECK (method IN ('Online', 'Onsite'));
DELIMITER // 
CREATE TRIGGER insert_member
AFTER
INSERT ON hzb_visitor FOR EACH ROW BEGIN
DECLARE v_visitor_id INT;
DECLARE v_visit_date DATE;
SET v_visitor_id = NULL;
SET v_visit_date = NULL;
IF NEW.type = 'Member' THEN
SET v_visitor_id = NEW.visitor_id;
SET v_visit_date = NEW.visit_date;
END IF;
IF v_visitor_id IS NOT NULL THEN
INSERT INTO hzb_member (visitor_id, mem_id, mem_date, num)
VALUES (v_visitor_id, v_visitor_id, v_visit_date, 5);
END IF;
END // 
DELIMITER ;
DELIMITER // 
CREATE TRIGGER insert_group
AFTER
INSERT ON hzb_visitor FOR EACH ROW BEGIN
DECLARE v_visitor_id INT;
DECLARE v_size INT;
SET v_visitor_id = NULL;
SET v_size = 0;
IF NEW.type = 'Group' THEN
SET v_visitor_id = NEW.visitor_id;
SET v_size = NEW.group_size;
END IF;
IF v_visitor_id IS NOT NULL THEN
INSERT INTO hzb_group (visitor_id, group_size)
VALUES (v_visitor_id, v_size);
END IF;
END // 
DELIMITER ;
DELIMITER // 
CREATE TRIGGER insert_card
AFTER
INSERT ON hzb_payment FOR EACH ROW BEGIN
IF NEW.pay_method = 'Credit' OR NEW.pay_method = 'Debit' THEN
INSERT INTO hzb_card (pay_id, ch_fname, ch_lname, c_number, exp_date, cvv, type) 
VALUES (NEW.pay_id, NEW.ch_fname, NEW.ch_lname, NEW.c_number, NEW.exp_date, NEW.cvv, NEW.pay_method);
END IF;
END // 
DELIMITER ;
DELIMITER // 
CREATE TRIGGER insert_school
AFTER
INSERT ON hzb_visitor FOR EACH ROW BEGIN
DECLARE v_visitor_id INT;
DECLARE v_name VARCHAR(100);
SET v_visitor_id = NULL;
SET v_name = NULL;
IF NEW.type = 'School' THEN
SET v_visitor_id = NEW.visitor_id;
SET v_name = NEW.school_name;
END IF;
IF v_visitor_id IS NOT NULL THEN
INSERT INTO hzb_school (visitor_id, school_id, school_name)
VALUES (v_visitor_id, v_visitor_id, v_name);
END IF;
END // 
DELIMITER ;
DELIMITER // 
CREATE TRIGGER insert_individual
AFTER
INSERT ON hzb_visitor FOR EACH ROW BEGIN
DECLARE v_visitor_id INT;
DECLARE v_gender VARCHAR(10);
DECLARE v_nation VARCHAR(15);
IF NEW.type = 'Individual' THEN
SET v_visitor_id = NEW.visitor_id;
SET v_gender = NEW.gender;
SET v_nation = NEW.nationality;
END IF;
IF v_visitor_id IS NOT NULL THEN
INSERT INTO hzb_individual (visitor_id, gender, nationality)
VALUES (v_visitor_id, v_gender, v_nation);
END IF;
END //
DELIMITER ;

DELIMITER // 
CREATE TRIGGER apply_discount_on_parking_purchase
AFTER INSERT ON hzb_parking FOR EACH ROW BEGIN
DECLARE v_discount DECIMAL(4, 2) DEFAULT 0;
DECLARE v_discount_num INT DEFAULT 5;
DECLARE v_id INT DEFAULT 0;
DECLARE v_age INT DEFAULT 0;
INSERT INTO hzb_order (
    visitor_id,
    park_id,
    ord_amount,
    ord_date,
    ord_quantity
  )
VALUES (
    NEW.visitor_id,
    NEW.park_id,
    NEW.fee * (1 - v_discount),
    NEW.time_in,
    2
  );
END // 
DELIMITER ;
DELIMITER // 
CREATE TRIGGER apply_discount_on_show_purchase BEFORE
INSERT ON hzb_order FOR EACH ROW BEGIN
DECLARE v_discount DECIMAL(4, 2) DEFAULT 0;
DECLARE v_discount_num INT DEFAULT 5;
DECLARE v_id INT DEFAULT 0;
DECLARE v_age INT DEFAULT 0;
DECLARE s_price DECIMAL(8, 2) DEFAULT 0;
DECLARE sh_time DATE;
SELECT TIMESTAMPDIFF(YEAR, dob, NOW()) INTO v_age
FROM hzb_visitor
WHERE visitor_id = NEW.visitor_id;
IF NEW.show_id IS NOT NULL THEN
SELECT price INTO s_price
FROM hzb_show
WHERE show_id = NEW.show_id;
SELECT s_time INTO sh_time
FROM hzb_show
WHERE show_id = NEW.show_id;
IF v_age < 7 THEN
SET v_discount = 1;
END IF;
SET NEW.ord_amount = s_price * (1 - v_discount) * NEW.ord_quantity;
END IF;
END // 
DELIMITER ;
DELIMITER // 
CREATE TRIGGER apply_discount_on_tickets_purchase
AFTER
INSERT ON hzb_tickets FOR EACH ROW BEGIN
DECLARE v_discount DECIMAL(5, 2) DEFAULT 0;
DECLARE v_discount_num INT DEFAULT 0;
DECLARE v_id INT DEFAULT 0;
DECLARE v_age INT DEFAULT 0;
DECLARE v_quan INT DEFAULT 1;
DECLARE v_type VARCHAR(10) DEFAULT NULL;
DECLARE v_size INT DEFAULT 0;
DECLARE v_amount DECIMAL(8, 2) DEFAULT 0;
IF NEW.method = 'Online' THEN
SET v_discount = 0.05;
END IF;
SELECT type INTO v_type
FROM hzb_visitor
WHERE visitor_id = NEW.visitor_id;
IF v_type = 'Member' THEN
SELECT num INTO v_discount_num
FROM hzb_member
WHERE visitor_id = NEW.visitor_id;
END IF;
IF v_discount_num != 0
AND v_discount != 0.15 THEN
SET v_discount = v_discount + 0.10;
UPDATE hzb_member
SET num = v_discount_num - 1
WHERE visitor_id = NEW.visitor_id;
END IF;
SELECT TIMESTAMPDIFF(YEAR, dob, NOW()) INTO v_age
FROM hzb_visitor
WHERE visitor_id = NEW.visitor_id;
IF v_age > 60
OR v_age < 7 THEN
SET v_discount = 0.15;
END IF;
IF DAYNAME(NEW.vist_date) IN ('Saturday', 'Sunday')
OR DATE_FORMAT(NEW.vist_date, '%m/%d') IN ('01/01', '06/01', '12/25') THEN
SET v_discount = 0;
END IF;
SET v_amount = NEW.price * (1 - v_discount);
IF v_type = 'Group' THEN
SELECT group_size INTO v_size
FROM hzb_group
WHERE visitor_id = NEW.visitor_id;
IF NEW.method = 'Online' THEN
SET v_amount = NEW.price * (1 - 0.05) * v_size;
ELSE
SET v_amount = NEW.price * v_size;
END IF;
END IF;
IF v_size = 0 THEN
SET v_size = 1;
END IF;
INSERT INTO hzb_order (
    ord_date,
    ord_quantity,
    ord_amount,
    show_id,
    store_id,
    visitor_id,
    park_id,
    tickets_id
  )
VALUES (
    NEW.vist_date,
    v_size,
    v_amount,
    null,
    null,
    NEW.visitor_id,
    null,
    NEW.tickets_id
  );
END // 
DELIMITER ;

DELIMITER // 
CREATE TRIGGER apply_discount_on_store_purchase BEFORE
INSERT ON hzb_order FOR EACH ROW BEGIN
DECLARE u_price INT DEFAULT 0;
IF NEW.store_id IS NOT NULL THEN
SELECT unit_price INTO u_price
FROM hzb_store
WHERE store_id = NEW.store_id;
SET NEW.ord_amount := u_price * NEW.ord_quantity;
END IF;
END // 
DELIMITER ;

DELIMITER //
CREATE PROCEDURE fetch_data(IN input_date DATE) BEGIN TRUNCATE TABLE hzb_summ;
INSERT INTO hzb_summ (amount, vist_date, source, source_id, visitor_id)
SELECT ord_amount,
  ord_date,
  CASE
    WHEN show_id IS NOT NULL THEN 'Show'
    WHEN store_id IS NOT NULL THEN 'Store'
    WHEN park_id IS NOT NULL THEN 'Parking'
    WHEN tickets_id IS NOT NULL THEN 'Tickets'
    ELSE NULL
  END as source,
  CASE
    WHEN show_id IS NOT NULL THEN show_id
    WHEN store_id IS NOT NULL THEN store_id
    WHEN park_id IS NOT NULL THEN park_id
    WHEN tickets_id IS NOT NULL THEN tickets_id
    ELSE NULL
  END as source_id,
  visitor_id
FROM hzb_order
WHERE ord_date = input_date;
SELECT *
FROM hzb_summ;
END //
DELIMITER ;

-- DML FOR PAYMENT
INSERT INTO hzb_payment (pay_method, pay_date, pay_amount, ch_fname, ch_lname, c_number, exp_date, cvv)
VALUES ('Cash', '2023-04-06', 200.50, null, null, NULL, null, null);
INSERT INTO hzb_payment (pay_method, pay_date, pay_amount, ch_fname, ch_lname, c_number, exp_date, cvv)
VALUES ('Credit', '2023-05-01', 500.00, 'John', 'Doe', 1234213124143, '2024-12-31', '123');
INSERT INTO hzb_payment (pay_method, pay_date, pay_amount, ch_fname, ch_lname, c_number, exp_date, cvv)
VALUES ('Debit', '2023-04-06', 150.75, 'Jane', 'Smith', 9876543210987654, '2023-06-30', '456');
INSERT INTO hzb_payment (pay_method, pay_date, pay_amount, ch_fname, ch_lname, c_number, exp_date, cvv)
VALUES ('Cash', '2023-04-07', 100.00, null, null, NULL, null, null);
INSERT INTO hzb_payment (pay_method, pay_date, pay_amount, ch_fname, ch_lname, c_number, exp_date, cvv)
VALUES ('Credit', '2023-04-07', 300.25, 'Mark', 'Johnson', 7890123456789012, '2025-08-31', '789');
INSERT INTO hzb_payment (pay_method, pay_date, pay_amount, ch_fname, ch_lname, c_number, exp_date, cvv)
VALUES ('Debit', '2023-05-01', 50.00, 'Sarah', 'Wilson', 5432109876543210, '2023-09-30', '321');
INSERT INTO hzb_payment (pay_method, pay_date, pay_amount, ch_fname, ch_lname, c_number, exp_date, cvv)
VALUES ('Cash', '2023-04-08', 75.50, null, null, NULL, null, null);
INSERT INTO hzb_payment (pay_method, pay_date, pay_amount, ch_fname, ch_lname, c_number, exp_date, cvv)
VALUES ('Credit', '2023-04-09', 600.00, 'David', 'Brown', 4567890123456789, '2024-10-31', '567');
INSERT INTO hzb_payment (pay_method, pay_date, pay_amount, ch_fname, ch_lname, c_number, exp_date, cvv)
VALUES ('Debit', '2023-05-01', 250.75, 'Emily', 'Davis', 2109876543210987, '2023-07-31', '234');
INSERT INTO hzb_payment (pay_method, pay_date, pay_amount, ch_fname, ch_lname, c_number, exp_date, cvv)
VALUES ('Cash', '2023-04-10', 50.00, null, null, NULL, null, null);
INSERT INTO hzb_payment (pay_method, pay_date, pay_amount, ch_fname, ch_lname, c_number, exp_date, cvv)
VALUES ('Credit', '2023-04-11', 150.50, 'Michael', 'Taylor', 2109876543210987,'2023-07-31', '234');

SELECT * FROM hzb_payment;
SELECT * FROM hzb_card;

-- DML FOR SHOW-- 
INSERT INTO hzb_show (
    name,
    description,
    type,
    s_time,
    e_time,
    wchair_access,
    price
  )
VALUES (
    'Drama Show 2',
    'This is a drama sasdftional performances.',
    'Drama',
    '2023-04-04',
    '2023-04-04',
    '1',
    11
  );
INSERT INTO hzb_show (
    name,
    description,
    type,
    s_time,
    e_time,
    wchair_access,
    price
  )
VALUES (
    'Comedy Show 3',
    'This is a comedy show with hilarious skits and stand-up comedy performances.',
    'Comedy',
    '2023-04-06',
    '2023-04-06',
    '1',
    8
  );
INSERT INTO hzb_show (
    name,
    description,
    type,
    s_time,
    e_time,
    wchair_access,
    price
  )
VALUES (
    'Horror Show 4',
    'This is a horror show with spine-chilling scenes and special effects.',
    'Horror',
    '2023-04-07',
    '2023-04-07',
    '0',
    15
  );
INSERT INTO hzb_show (
    name,
    description,
    type,
    s_time,
    e_time,
    wchair_access,
    price
  )
VALUES (
    'Adventure Show 5',
    'This is an adventure show with thrilling stunts and breathtaking performances.',
    'Adventure',
    '2023-04-08',
    '2023-04-08',
    '1',
    10
  );
INSERT INTO hzb_show (
    name,
    description,
    type,
    s_time,
    e_time,
    wchair_access,
    price
  )
VALUES (
    'Drama Show 6',
    'This is a drama show with powerful dialogues and intense acting.',
    'Drama',
    '2023-04-09',
    '2023-04-09',
    '0',
    12
  );
INSERT INTO hzb_show (
    name,
    description,
    type,
    s_time,
    e_time,
    wchair_access,
    price
  )
VALUES (
    'Comedy Show 8',
    'This is a comedy show with improvisation and audience participation.',
    'Comedy',
    '2023-04-11',
    '2023-04-11',
    '0',
    8
  );
INSERT INTO hzb_show (
    name,
    description,
    type,
    s_time,
    e_time,
    wchair_access,
    price
  )
VALUES (
    'Drama Show 9',
    'This is a drama show with powerful performances and compelling storytelling.',
    'Drama',
    '2023-04-12',
    '2023-04-12',
    '1',
    12
  );
INSERT INTO hzb_show (
    name,
    description,
    type,
    s_time,
    e_time,
    wchair_access,
    price
  )
VALUES (
    'Musical Show 10',
    'This is a musical show featuring popular songs and live performances.',
    'Musical',
    '2023-04-13',
    '2023-04-13',
    '1',
    15
  );
INSERT INTO hzb_show (
    name,
    description,
    type,
    s_time,
    e_time,
    wchair_access,
    price
  )
VALUES (
    'Comedy Show 11',
    'This is a comedy show with skits, jokes, and audience interaction.',
    'Comedy',
    '2023-04-14',
    '2023-04-14',
    '0',
    25
  );
INSERT INTO hzb_show (
    name,
    description,
    type,
    s_time,
    e_time,
    wchair_access,
    price
  )
VALUES (
    'Drama Show 6',
    'This is a drama sasdftional performances.',
    'Drama',
    '2023-04-10',
    '2023-04-10',
    '1',
    13
  );
SELECT *
FROM hzb_show;
-- DML FOR VISITOR
INSERT INTO hzb_visitor (
    fname,
    lname,
    street,
    city,
    state,
    zipcode,
    country,
    email,
    password,
    cell_num,
    dob,
    type,
    visit_date,
    group_size,
    school_name,
    gender,
    nationality,
    role
  )
VALUES (
    'John',
    'Doe',
    '123 Main St',
    'Anytown',
    'CA',
    '12345',
    'USA',
    'johndoe@email.com',
    'password123',
    '1234567890',
    '1990-01-01',
    'Member',
    '2022-04-28',
    null,
    null,
    null,
    null,
    'Employee'
  );
INSERT INTO hzb_visitor (
    fname,
    lname,
    street,
    city,
    state,
    zipcode,
    country,
    email,
    password,
    cell_num,
    dob,
    type,
    visit_date,
    group_size,
    school_name,
    gender,
    nationality
  )
VALUES (
    'Jane',
    'Doe',
    '456 Oak St',
    'Sometown',
    'CA',
    '67890',
    'USA',
    'janedoe@email.com',
    'password456',
    '0987654321',
    '1995-07-15',
    'Individual',
    '2022-04-29',
    null,
    null,
    'Male',
    'United States'
  );
INSERT INTO hzb_visitor (
    fname,
    lname,
    street,
    city,
    state,
    zipcode,
    country,
    email,
    password,
    cell_num,
    dob,
    type,
    visit_date,
    group_size,
    school_name,
    gender,
    nationality
  )
VALUES (
    'Alex',
    'Smith',
    '789 Maple Ave',
    'Anytown',
    'CA',
    '12345',
    'USA',
    'alexsmith@email.com',
    'password789',
    '1112223333',
    '2005-09-01',
    'School',
    '2022-04-30',
    null,
    'River',
    null,
    null
  );
INSERT INTO hzb_visitor (
    fname,
    lname,
    street,
    city,
    state,
    zipcode,
    country,
    email,
    password,
    cell_num,
    dob,
    type,
    visit_date,
    group_size,
    school_name,
    gender,
    nationality
  )
VALUES (
    'Sam',
    'Jones',
    '321 Pine St',
    'Othertown',
    'CA',
    '54321',
    'USA',
    'samjones@email.com',
    'passwordabc',
    '4445556666',
    '1998-03-22',
    'Group',
    '2022-05-01',
    20,
    null,
    null,
    null
  );
INSERT INTO hzb_visitor (
    fname,
    lname,
    street,
    city,
    state,
    zipcode,
    country,
    email,
    password,
    cell_num,
    dob,
    type,
    visit_date,
    group_size,
    school_name,
    gender,
    nationality
  )
VALUES (
    'Mike',
    'Brown',
    '654 Elm St',
    'Sometown',
    'CA',
    '67890',
    'USA',
    'mikebrown@email.com',
    'passwordxyz',
    '7778889999',
    '1992-12-01',
    'Member',
    '2022-05-02',
    null,
    null,
    null,
    null
  );
INSERT INTO hzb_visitor (
    fname,
    lname,
    street,
    city,
    state,
    zipcode,
    country,
    email,
    password,
    cell_num,
    dob,
    type,
    visit_date,
    group_size,
    school_name,
    gender,
    nationality
  )
VALUES (
    'Karen',
    'Lee',
    '987 Oak Ave',
    'Othertown',
    'CA',
    '54321',
    'USA',
    'karenlee@email.com',
    'password123',
    '2223334444',
    '1985-05-11',
    'Individual',
    '2022-05-03',
    null,
    null,
    'Male',
    'United States'
  );
INSERT INTO hzb_visitor (
    fname,
    lname,
    street,
    city,
    state,
    zipcode,
    country,
    email,
    password,
    cell_num,
    dob,
    type,
    visit_date,
    group_size,
    school_name,
    gender,
    nationality
  )
VALUES (
    'Mark',
    'Davis',
    '456 Pine St',
    'Anytown',
    'CA',
    '12345',
    'USA',
    'markdavis@email.com',
    'password456',
    '5556667777',
    '2007-10-15',
    'School',
    '2022-05-04',
    null,
    'South',
    null,
    null
  );
INSERT INTO hzb_visitor (
    fname,
    lname,
    street,
    city,
    state,
    zipcode,
    country,
    email,
    password,
    cell_num,
    dob,
    type,
    visit_date,
    group_size,
    school_name,
    gender,
    nationality
  )
VALUES (
    'Emily',
    'Kim',
    '321 Elm St',
    'Sometown',
    'CA',
    '67890',
    'USA',
    'emilykim@email.com',
    'passwordabc',
    '8889990000',
    '1999-06-30',
    'Group',
    '2022-05-06',
    15,
    null,
    null,
    null
  );
SELECT *
FROM hzb_visitor;
-- DML for hzb_store 
INSERT INTO hzb_store (
    name,
    category,
    description,
    menu_item,
    unit_price
  )
VALUES (
    'Food Stall 2',
    'Food Stall',
    'This is another food stall selling snacks and beverages.',
    'Fries',
    3
  );
INSERT INTO hzb_store (
    name,
    category,
    description,
    menu_item,
    unit_price
  )
VALUES (
    'Ice Cream Parlor 1',
    'Ice Cream Parlor',
    'This is an ice cream parlor offering a wide range of ice cream flavors.',
    'Chocolate Sundae',
    7
  );
INSERT INTO hzb_store (
    name,
    category,
    description,
    menu_item,
    unit_price
  )
VALUES (
    'Ice Cream Parlor 2',
    'Ice Cream Parlor',
    'This is another ice cream parlor with unique ice cream flavors.',
    'Strawberry Cone',
    4
  );
INSERT INTO hzb_store (
    name,
    category,
    description,
    menu_item,
    unit_price
  )
VALUES (
    'Restaurant 1',
    'Restaurant',
    'This is a restaurant serving fine dining meals with a variety of cuisines.',
    'Grilled Salmon',
    15
  );
INSERT INTO hzb_store (
    name,
    category,
    description,
    menu_item,
    unit_price
  )
VALUES (
    'Restaurant 2',
    'Restaurant',
    'This is another restaurant specializing in Italian cuisine.',
    'Margherita Pizza',
    10
  );
INSERT INTO hzb_store (
    name,
    category,
    description,
    menu_item,
    unit_price
  )
VALUES (
    'Gift Shop 1',
    'Gift Shop',
    'This is a gift shop offering souvenirs, toys, and other merchandise.',
    'Keychain',
    2
  );
INSERT INTO hzb_store (
    name,
    category,
    description,
    menu_item,
    unit_price
  )
VALUES (
    'Gift Shop 2',
    'Gift Shop',
    'This is another gift shop with a wide range of collectible items.',
    'T-shirt',
    12
  );
INSERT INTO hzb_store (
    name,
    category,
    description,
    menu_item,
    unit_price
  )
VALUES (
    'Apparel Store 1',
    'Apparels',
    'This is an apparel store selling trendy clothing for men, women, and kids.',
    'Jeans',
    30
  );
INSERT INTO hzb_store (
    name,
    category,
    description,
    menu_item,
    unit_price
  )
VALUES (
    'Apparel Store 2',
    'Apparels',
    'This is another apparel store offering a variety of fashion accessories.',
    'Sunglasses',
    20
  );
INSERT INTO hzb_store (
    name,
    category,
    description,
    menu_item,
    unit_price
  )
VALUES (
    'Food Stall 3',
    'Food Stall',
    'This is a new food stall offering exotic cuisines from around the world.',
    'Sushi Roll',
    8
  );
INSERT INTO hzb_store (
    name,
    category,
    description,
    menu_item,
    unit_price
  )
VALUES (
    'Ice Cream Parlor 3',
    'Ice Cream Parlor',
    'This is a popular ice cream parlor known for its unique flavors and presentation.',
    'M Ice Cream',
    6
  );
INSERT INTO hzb_store (
    name,
    category,
    description,
    menu_item,
    unit_price
  )
VALUES (
    'Gift Shop 3',
    'Gift Shop',
    'This is a small gift shop offering local crafts and souvenirs.',
    'Handmade Pottery',
    18
  );
SELECT *
FROM hzb_store;
-- DML for attraction
INSERT INTO hzb_attract (
    name,
    description,
    type,
    status,
    cpacity,
    min_height,
    duration,
    section
  )
VALUES (
    'Roller Coaster 1',
    'A thrilling roller coaster ride',
    'roller coaster',
    'Open',
    50,
    120,
    180,
    'A'
  );
INSERT INTO hzb_attract (
    name,
    description,
    type,
    status,
    cpacity,
    min_height,
    duration,
    section
  )
VALUES (
    'Water Ride 1',
    'A fun water ride for all ages',
    'water ride',
    'Open',
    30,
    100,
    120,
    'B'
  );
INSERT INTO hzb_attract (
    name,
    description,
    type,
    status,
    cpacity,
    min_height,
    duration,
    section
  )
VALUES (
    'Dark Ride 1',
    'A spooky dark ride with special effects',
    'dark ride',
    'Open',
    20,
    90,
    150,
    'C'
  );
INSERT INTO hzb_attract (
    name,
    description,
    type,
    status,
    cpacity,
    min_height,
    duration,
    section
  )
VALUES (
    'Kid Ride 1',
    'A gentle ride for young kids',
    'kid ride',
    'Open',
    15,
    80,
    60,
    'D'
  );
INSERT INTO hzb_attract (
    name,
    description,
    type,
    status,
    cpacity,
    min_height,
    duration,
    section
  )
VALUES (
    'Roller Coaster 2',
    'Another exciting roller coaster ride',
    'roller coaster',
    'Open',
    40,
    110,
    210,
    'E'
  );
INSERT INTO hzb_attract (
    name,
    description,
    type,
    status,
    cpacity,
    min_height,
    duration,
    section
  )
VALUES (
    'Water Ride 2',
    'A thrilling water ride with slides',
    'water ride',
    'Open',
    25,
    95,
    90,
    'F'
  );
INSERT INTO hzb_attract (
    name,
    description,
    type,
    status,
    cpacity,
    min_height,
    duration,
    section
  )
VALUES (
    'Dark Ride 2',
    'An adventurous dark ride with special effects',
    'dark ride',
    'Open',
    18,
    88,
    120,
    'G'
  );
INSERT INTO hzb_attract (
    name,
    description,
    type,
    status,
    cpacity,
    min_height,
    duration,
    section
  )
VALUES (
    'Kid Ride 2',
    'A fun ride designed for young children',
    'kid ride',
    'Open',
    12,
    75,
    45,
    'H'
  );
INSERT INTO hzb_attract (
    name,
    description,
    type,
    status,
    cpacity,
    min_height,
    duration,
    section
  )
VALUES (
    'Roller Coaster 3',
    'A high-speed roller coaster for thrill-seekers',
    'roller coaster',
    'Open',
    35,
    130,
    180,
    'I'
  );
INSERT INTO hzb_attract (
    name,
    description,
    type,
    status,
    cpacity,
    min_height,
    duration,
    section
  )
VALUES (
    'Water Ride 3',
    'A family-friendly water ride with a lazy river',
    'water ride',
    'Open',
    28,
    105,
    150,
    'I'
  );
SELECT *
FROM hzb_attract;

-- DML FOR VISIT
INSERT INTO hzb_visit (attract_id, `date`, visitor_id)
VALUES (1, '2023-05-01', 3);
INSERT INTO hzb_visit (attract_id, `date`, visitor_id)
VALUES (1, '2023-04-04', 1);
INSERT INTO hzb_visit (attract_id, `date`, visitor_id)
VALUES (1, '2023-04-04', 2);
INSERT INTO hzb_visit (attract_id, `date`, visitor_id)
VALUES (1, '2023-04-04', 4);
INSERT INTO hzb_visit (attract_id, `date`, visitor_id)
VALUES (2, '2023-04-03', 1);
INSERT INTO hzb_visit (attract_id, `date`, visitor_id)
VALUES (2, '2023-04-03', 5);
INSERT INTO hzb_visit (attract_id, `date`, visitor_id)
VALUES (2, '2023-04-03', 2);
INSERT INTO hzb_visit (attract_id, `date`, visitor_id)
VALUES (2, '2023-04-03', 3);
INSERT INTO hzb_visit (attract_id, `date`, visitor_id)
VALUES (2, '2023-05-01', 8);
INSERT INTO hzb_visit (attract_id, `date`, visitor_id)
VALUES (2, '2023-04-03', 7);
INSERT INTO hzb_visit (attract_id, `date`, visitor_id)
VALUES (3, '2023-04-02', 2);
INSERT INTO hzb_visit (attract_id, `date`, visitor_id)
VALUES (3, '2023-05-01', 5);
INSERT INTO hzb_visit (attract_id, `date`, visitor_id)
VALUES (3, '2023-04-02', 4);
INSERT INTO hzb_visit (attract_id, `date`, visitor_id)
VALUES (3, '2023-04-02', 3);
INSERT INTO hzb_visit (attract_id, `date`, visitor_id)
VALUES (3, '2023-04-02', 8);
INSERT INTO hzb_visit (attract_id, `date`, visitor_id)
VALUES (3, '2023-04-02', 7);
INSERT INTO hzb_visit (attract_id, `date`, visitor_id)
VALUES (7, '2023-03-28', 6);
INSERT INTO hzb_visit (attract_id, `date`, visitor_id)
VALUES (7, '2023-03-28', 5);
SELECT * FROM hzb_visit;

-- DML for hzb_tickets
INSERT INTO hzb_tickets (
    method,
    prch_date,
    vist_date,
    type,
    price,
    visitor_id
  )
VALUES (
    'Online',
    '2023-05-01',
    '2023-05-01',
    'Child',
    20,
    1
  );
INSERT INTO hzb_tickets (
    method,
    prch_date,
    vist_date,
    type,
    price,
    visitor_id
  )
VALUES (
    'Onsite',
    '2023-04-02',
    '2023-05-01',
    'Adult',
    35,
    2
  );
INSERT INTO hzb_tickets (
    method,
    prch_date,
    vist_date,
    type,
    price,
    visitor_id
  )
VALUES (
    'Online',
    '2023-04-03',
    '2023-05-01',
    'Child',
    20,
    3
  );
INSERT INTO hzb_tickets (
    method,
    prch_date,
    vist_date,
    type,
    price,
    visitor_id
  )
VALUES (
    'Onsite',
    '2023-05-04',
    '2023-06-30',
    'Senior',
    25,
    4
  );
INSERT INTO hzb_tickets (
    method,
    prch_date,
    vist_date,
    type,
    price,
    visitor_id
  )
VALUES (
    'Online',
    '2023-05-05',
    '2023-06-30',
    'Member',
    15,
    5
  );
INSERT INTO hzb_tickets (
    method,
    prch_date,
    vist_date,
    type,
    price,
    visitor_id
  )
VALUES (
    'Onsite',
    '2023-05-06',
    '2023-06-30',
    'Adult',
    35,
    6
  );
INSERT INTO hzb_tickets (
    method,
    prch_date,
    vist_date,
    type,
    price,
    visitor_id
  )
VALUES (
    'Online',
    '2023-05-07',
    '2023-06-30',
    'Child',
    20,
    7
  );
INSERT INTO hzb_tickets (
    method,
    prch_date,
    vist_date,
    type,
    price,
    visitor_id
  )
VALUES (
    'Onsite',
    '2023-05-08',
    '2023-06-30',
    'Senior',
    25,
    8
  );
INSERT INTO hzb_tickets (
    method,
    prch_date,
    vist_date,
    type,
    price,
    visitor_id
  )
VALUES (
    'Online',
    '2023-05-10',
    '2023-06-30',
    'Child',
    30,
    7
  );
SELECT *
FROM hzb_tickets;
SELECT *
FROM hzb_order;
-- DML for hzb_parking
INSERT INTO hzb_parking (
    lot,
    spot_number,
    time_in,
    time_out,
    fee,
    visitor_id
  )
VALUES (
    'A',
    33,
    DATE '2023-05-01',
    DATE '2023-05-01',
    50,
    1
  );
INSERT INTO hzb_parking (
    lot,
    spot_number,
    time_in,
    time_out,
    fee,
    visitor_id
  )
VALUES (
    'B',
    34,
    DATE '2023-05-01',
    DATE '2023-05-01',
    50,
    2
  );
INSERT INTO hzb_parking (
    lot,
    spot_number,
    time_in,
    time_out,
    fee,
    visitor_id
  )
VALUES (
    'C',
    35,
    DATE '2023-05-01',
    DATE '2023-05-01',
    50,
    3
  );
INSERT INTO hzb_parking (
    lot,
    spot_number,
    time_in,
    time_out,
    fee,
    visitor_id
  )
VALUES (
    'D',
    36,
    DATE '2023-05-01',
    DATE '2023-05-01',
    50,
    4
  );
INSERT INTO hzb_parking (
    lot,
    spot_number,
    time_in,
    time_out,
    fee,
    visitor_id
  )
VALUES (
    'E',
    37,
    DATE '2023-05-01',
    DATE '2023-05-01',
    50,
    5
  );
INSERT INTO hzb_parking (
    lot,
    spot_number,
    time_in,
    time_out,
    fee,
    visitor_id
  )
VALUES (
    'F',
    38,
    DATE '2023-05-01',
    DATE '2023-05-01',
    50,
    6
  );
INSERT INTO hzb_parking (
    lot,
    spot_number,
    time_in,
    time_out,
    fee,
    visitor_id
  )
VALUES (
    'G',
    39,
    DATE '2023-05-01',
    DATE '2023-05-01',
    50,
    7
  );
INSERT INTO hzb_parking (
    lot,
    spot_number,
    time_in,
    time_out,
    fee,
    visitor_id
  )
VALUES (
    'H',
    40,
    DATE '2023-05-01',
    DATE '2023-05-01',
    50,
    8
  );
INSERT INTO hzb_parking (
    lot,
    spot_number,
    time_in,
    time_out,
    fee,
    visitor_id
  )
VALUES (
    'I',
    41,
    DATE '2023-05-01',
    DATE '2023-05-01',
    50,
    7
  );
INSERT INTO hzb_parking (
    lot,
    spot_number,
    time_in,
    time_out,
    fee,
    visitor_id
  )
VALUES (
    'J',
    42,
    DATE '2023-05-01',
    DATE '2023-05-01',
    50,
    6
  );
INSERT INTO hzb_parking (
    lot,
    spot_number,
    time_in,
    time_out,
    fee,
    visitor_id
  )
VALUES (
    'A',
    43,
    DATE '2023-05-01',
    DATE '2023-05-01',
    50,
    5
  );
INSERT INTO hzb_parking (
    lot,
    spot_number,
    time_in,
    time_out,
    fee,
    visitor_id
  )
VALUES (
    'B',
    44,
    DATE '2023-05-01',
    DATE '2023-05-01',
    100,
    4
  );
INSERT INTO hzb_parking (
    lot,
    spot_number,
    time_in,
    time_out,
    fee,
    visitor_id
  )
VALUES (
    'C',
    45,
    DATE '2023-05-01',
    DATE '2023-05-01',
    150,
    3
  );
SELECT *
FROM hzb_parking;
SELECT *
FROM hzb_order;
-- DML for show order
INSERT INTO hzb_order (
    ord_date,
    ord_quantity,
    ord_amount,
    visitor_id,
    show_id
  )
VALUES ('2023-05-01', 1, 10, 1, 1);
INSERT INTO hzb_order (
    ord_date,
    ord_quantity,
    ord_amount,
    visitor_id,
    show_id
  )
VALUES ('2023-05-01', 1, 10, 2, 2);
INSERT INTO hzb_order (
    ord_date,
    ord_quantity,
    ord_amount,
    visitor_id,
    show_id
  )
VALUES ('2023-05-01', 1, 10, 3, 3);
INSERT INTO hzb_order (
    ord_date,
    ord_quantity,
    ord_amount,
    visitor_id,
    show_id
  )
VALUES ('2023-05-01', 1, 10, 4, 4);
INSERT INTO hzb_order (
    ord_date,
    ord_quantity,
    ord_amount,
    visitor_id,
    show_id
  )
VALUES ('2023-05-05', 1, 10, 5, 5);
INSERT INTO hzb_order (
    ord_date,
    ord_quantity,
    ord_amount,
    visitor_id,
    show_id
  )
VALUES ('2023-05-06', 1, 10, 6, 6);
INSERT INTO hzb_order (
    ord_date,
    ord_quantity,
    ord_amount,
    visitor_id,
    show_id
  )
VALUES ('2023-05-07', 1, 10, 7, 7);
INSERT INTO hzb_order (
    ord_date,
    ord_quantity,
    ord_amount,
    visitor_id,
    show_id
  )
VALUES ('2023-05-08', 1, 10, 8, 8);
INSERT INTO hzb_order (
    ord_date,
    ord_quantity,
    ord_amount,
    visitor_id,
    show_id
  )
VALUES ('2023-05-09', 1, 10, 1, 9);
INSERT INTO hzb_order (
    ord_date,
    ord_quantity,
    ord_amount,
    visitor_id,
    show_id
  )
VALUES ('2023-05-10', 1, 10, 2, 10);
INSERT INTO hzb_order (
    ord_date,
    ord_quantity,
    ord_amount,
    visitor_id,
    show_id
  )
VALUES ('2023-05-11', 1, 10, 3, 1);
INSERT INTO hzb_order (
    ord_date,
    ord_quantity,
    ord_amount,
    visitor_id,
    show_id
  )
VALUES ('2023-05-12', 1, 10, 4, 2);
INSERT INTO hzb_order (
    ord_date,
    ord_quantity,
    ord_amount,
    visitor_id,
    show_id
  )
VALUES ('2023-05-13', 1, 10, 5, 3);
INSERT INTO hzb_order (
    ord_date,
    ord_quantity,
    ord_amount,
    visitor_id,
    show_id
  )
VALUES ('2023-05-14', 1, 10, 6, 4);
SELECT *
FROM hzb_order;
-- DML for store order
INSERT INTO hzb_order (
    ord_date,
    ord_quantity,
    ord_amount,
    visitor_id,
    store_id
  )
VALUES (DATE '2023-05-01', 2, 20, 1, 1);
INSERT INTO hzb_order (
    ord_date,
    ord_quantity,
    ord_amount,
    visitor_id,
    store_id
  )
VALUES (DATE '2023-05-01', 3, 30, 2, 2);
INSERT INTO hzb_order (
    ord_date,
    ord_quantity,
    ord_amount,
    visitor_id,
    store_id
  )
VALUES (DATE '2023-05-01', 4, 40, 3, 3);
INSERT INTO hzb_order (
    ord_date,
    ord_quantity,
    ord_amount,
    visitor_id,
    store_id
  )
VALUES (DATE '2023-05-01', 5, 50, 4, 4);
INSERT INTO hzb_order (
    ord_date,
    ord_quantity,
    ord_amount,
    visitor_id,
    store_id
  )
VALUES (DATE '2023-05-05', 2, 20, 5, 5);
INSERT INTO hzb_order (
    ord_date,
    ord_quantity,
    ord_amount,
    visitor_id,
    store_id
  )
VALUES (DATE '2023-05-06', 3, 30, 6, 6);
INSERT INTO hzb_order (
    ord_date,
    ord_quantity,
    ord_amount,
    visitor_id,
    store_id
  )
VALUES (DATE '2023-05-07', 4, 40, 7, 7);
INSERT INTO hzb_order (
    ord_date,
    ord_quantity,
    ord_amount,
    visitor_id,
    store_id
  )
VALUES (DATE '2023-05-08', 5, 50, 8, 8);
INSERT INTO hzb_order (
    ord_date,
    ord_quantity,
    ord_amount,
    visitor_id,
    store_id
  )
VALUES (DATE '2023-05-09', 2, 20, 7, 9);
INSERT INTO hzb_order (
    ord_date,
    ord_quantity,
    ord_amount,
    visitor_id,
    store_id
  )
VALUES (DATE '2023-05-10', 3, 30, 6, 10);
INSERT INTO hzb_order (
    ord_date,
    ord_quantity,
    ord_amount,
    visitor_id,
    store_id
  )
VALUES (DATE '2023-05-11', 4, 40, 5, 11);
INSERT INTO hzb_order (
    ord_date,
    ord_quantity,
    ord_amount,
    visitor_id,
    store_id
  )
VALUES (DATE '2023-05-12', 5, 50, 4, 1);
INSERT INTO hzb_order (
    ord_date,
    ord_quantity,
    ord_amount,
    visitor_id,
    store_id
  )
VALUES (DATE '2023-05-13', 2, 20, 4, 2);
INSERT INTO hzb_order (
    ord_date,
    ord_quantity,
    ord_amount,
    visitor_id,
    store_id
  )
VALUES (DATE '2023-05-14', 3, 30, 3, 11);
INSERT INTO hzb_order (
    ord_date,
    ord_quantity,
    ord_amount,
    visitor_id,
    store_id
  )
VALUES (DATE '2023-05-15', 4, 40, 2, 1);
INSERT INTO hzb_order (
    ord_date,
    ord_quantity,
    ord_amount,
    visitor_id,
    store_id
  )
VALUES (DATE '2023-05-16', 5, 50, 1, 2);
SELECT *
FROM hzb_order;

ALTER TABLE hzb_visitor
MODIFY password VARCHAR(100);
-- Change the data contraint of the columns
ALTER TABLE hzb_individual
MODIFY COLUMN nationality VARCHAR(50) NULL;
ALTER TABLE hzb_individual
MODIFY COLUMN gender VARCHAR(50) NULL;


-- Q1
-- SELECT v.fname, v.lname, o.show_id, s.name
-- FROM hzb_visitor v
-- JOIN hzb_order o ON v.visitor_id = o.visitor_id
-- JOIN hzb_show s ON o.show_id = s.show_id;

-- Q2
-- SELECT v.fname, v.lname, o.ord_amount, (SELECT AVG(ord_amount) FROM hzb_order) AS 'AVG'
-- FROM hzb_visitor v
-- JOIN hzb_order o ON v.visitor_id = o.visitor_id
-- WHERE o.ord_amount > (SELECT AVG(ord_amount) FROM hzb_order);

-- Q3
-- SELECT a.name, a.cpacity
-- FROM hzb_attract a
-- WHERE a.cpacity > (
--   SELECT AVG(cpacity)
--   FROM hzb_attract b
--   WHERE a.type = b.type
-- );

-- Q4
-- SELECT fname, lname
-- FROM hzb_visitor
-- WHERE type = 'Individual'
-- UNION
-- SELECT school_name, ''
-- FROM hzb_visitor
-- WHERE type = 'School';

-- Q5
-- WITH visitor_purchases AS (
--   SELECT v.visitor_id, COUNT(*) AS purchase_count
--   FROM hzb_visitor v
--   JOIN hzb_order o ON v.visitor_id = o.visitor_id
--   GROUP BY v.visitor_id
-- )
-- SELECT v.fname, v.lname, vp.purchase_count AS 'Count'
-- FROM hzb_visitor v
-- JOIN visitor_purchases vp ON v.visitor_id = vp.visitor_id
-- WHERE vp.purchase_count >= 3;

-- SELECT fname, lname, visit_date
-- FROM hzb_visitor
-- ORDER BY visit_date DESC
-- LIMIT 5;
-- SHOW TRIGGERS;
-- SELECT * FROM hzb_member;
SELECT TABLE_NAME, TABLE_ROWS
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = 'voa_database';

SELECT * FROM hzb_payment;
SELECT COUNT(*) AS row_count
FROM hzb_payment;

SELECT * FROM hzb_visit;
SELECT COUNT(*) AS row_count
FROM hzb_visit;

-- Execute the procedure
CALL fetch_data('2023-05-01');
