use clothes;
insert into clothing VALUE (1, 'Long Sleeve - Fire','M', 22.55, 'Cotton', 'tshirt1.jpg' ,'http://localhost:5000/clothing/image/tshirt1.jpg',1,2); 
insert into clothing VALUE (2, 'Cargo Pants - Ice','M', 40.00, 'Cotton','cargo1.jpg' , 'http://localhost:5000/clothing/image/cargo1.jpg',2,1); 
insert into clothing VALUE (3, 'Cargo Trousers - S1','S',40.00,  'Cotton','cargo2.jpg' , 'http://localhost:5000/clothing/image/cargo2.jpg',2,3); 
insert into clothing VALUE (4, 'Cargo Trousers - S2','L',42.00,  'Cotton','cargo3.jpg' , 'http://localhost:5000/clothing/image/cargo3.jpg',2,2); 
insert into clothing VALUE (5, 'Cargo Trousers - G4', 'L',22.00, 'Silk','cargo4.jpg' , 'http://localhost:5000/clothing/image/cargo4.jpg',2,2); 
insert into clothing VALUE (6, 'Cargo Pants - HH','L', 19.88,  'Silk','cargo5.jpg' , 'http://localhost:5000/clothing/image/cargo5.jpg',2,2); 

insert into branding VALUE (1, 'Quick Silver');
insert into branding VALUE (2, 'Reach');
insert into branding VALUE (3, 'Ice Key');
insert into branding VALUE (4, 'Sons');

insert into category VALUE (1, 'shirts');
insert into category VALUE (2, 'trousers');
insert into category VALUE (3, 'hoodies');

SELECT * FROM clothing;
SELECT * FROM category;
SELECT * FROM branding;

SELECT * FROM clothing inner join branding on clothing.branding_branding_id = branding.branding_id WHERE branding_branding_id='2';
SELECT * FROM clothing  inner join category on clothing.category_category_id = category.category_id  inner join branding on clothing.branding_branding_id = branding.branding_id    WHERE category_category_id='2' AND branding_branding_id='2';

SELECT * FROM clothing LIMIT 2 OFFSET 0;
SELECT * FROM clothing LIMIT 2 OFFSET 2;

