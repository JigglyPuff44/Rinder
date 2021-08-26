# Rinder Data Model

## Database Type

PostgreSQL


## Database Schema (lite)

![](2021-08-24-21-07-42.png)

### Tables

#### users

```sql
CREATE TABLE "users" (
  user_id SERIAL PRIMARY KEY,
  name varchar(255),
  username varchar(255),
  password varchar(255),
  room varchar(255)
);
```
```sql
DROP TABLE IF EXISTS "users";
```
```sql
INSERT INTO "users" (name,username,password,room) 
VALUES 
('ted','ted','password','EPP95GQK1SV9MO22X'),
('emma','emma','password','EPP95GQK1SV9MO22X'),
('may','may','password','EPP95GQK1SV9MO22X'),
('faraz','faraz','password','EPP95GQK1SV9MO22X'),
('richard','richard','password','LEQ97DBA0FQ5XW41H')
;
```

#### restaurants
```sql
CREATE TABLE "restaurants" (
  rest_id SERIAL PRIMARY KEY,
  address text,
  likes integer,
  rating numeric,
  room varchar(255)
);
```
```sql
DROP TABLE IF EXISTS "restaurants";
```
```sql
INSERT INTO "restaurants" (address,likes,rating,room) 
VALUES 
('Ap #923-1579 Metus. Avenue',3,4,'EPP95GQK1SV9MO22X'),
('P.O. Box 488, 6005 Diam. Rd.',5,2,'EPP95GQK1SV9MO22X'),
('2903 Tincidunt, Road',5,2,'EPP95GQK1SV9MO22X'),
('784-5458 Malesuada Rd.',10,4,'EPP95GQK1SV9MO22X'),
('Ap #155-2974 Non Avenue',9,3,'EPP95GQK1SV9MO22X'),
('P.O. Box 726, 9138 Est, Road',7,1,'EPP95GQK1SV9MO22X'),
('Ap #581-8321 Nulla Rd.',5,3,'EPP95GQK1SV9MO22X'),
('P.O. Box 768, 898 Non Ave',10,3,'EPP95GQK1SV9MO22X'),
('611-4020 Magna, St.',6,3,'EPP95GQK1SV9MO22X'),
('3493 Mollis Street',3,4,'EPP95GQK1SV9MO22X')
;
```

## Database Schema (stretch)

![](2021-08-24-20-15-28.png)
