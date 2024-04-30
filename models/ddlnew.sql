drop table if exists Users;
create table Users(
    User_id bigserial,
    Fname varchar(20) not null,
    Lname varchar(20) not null,
    Phone_num char(10) check (length(Phone_Num)=10),
    Email varchar(30) not null,
    Password varchar(20) not null,
    User_address varchar(50) not null,
    User_type integer,
    primary key (User_id)
);

INSERT INTO Users(Fname, Lname, Phone_Num, Email, Password, User_address, User_type) VALUES('Harsh','Saboo',8555465236,'hs@gmail.com','Saboo','46, xyz Nagar', 1);
INSERT INTO Users(Fname, Lname, Phone_Num, Email, Password, User_address, User_type) VALUES('Sidharth','Jain',4526366236,'sj@gmail.com','Jain','55, Jain Colony', 1);
INSERT INTO Users(Fname, Lname, Phone_Num, Email, Password, User_address, User_type) VALUES('Aniket', 'Kano',8319159263, 'ak@gmail.com','1234521','new jain restroA', 2);
INSERT INTO Users(Fname, Lname, Phone_Num, Email, Password, User_address, User_type) VALUES('pandyey', 'Kash',8319159264, 'pk@gmail.com','1234522','new jain restroP', 2);
INSERT INTO Users(Fname, Lname, Phone_Num, Email, Password, User_address, User_type) VALUES('Chirag', 'ragu',8319159265, 'cr@gmail.com','1234531','new jain restroC', 3);
INSERT INTO Users(Fname, Lname, Phone_Num, Email, Password, User_address, User_type) VALUES('shubham', 'shukla',8319159265, 'ss@gmail.com','1234532','new jain restroC', 3);

drop table if exists Mess;
create table Mess(
    Mess_id bigserial,
    Mess_name varchar(20) not null,
    Mess_address varchar(50) not null,
    Subscription_price integer,
    Phone_Num char(10) check (length(Phone_Num)=10),
    Rating integer,
    Tiffin_details varchar(50) not null,
    Mess_owner_id bigserial,
    primary key (Mess_id),
    foreign key (Mess_owner_id) references Users
);

INSERT INTO Mess(Mess_name, Mess_address, Subscription_price,Phone_Num,Rating,Tiffin_details,Mess_owner_id) VALUES('malwa mill mess ak', 3000,8823019288,4,'dalchawal aloo sabji',3 );
INSERT INTO Mess(Mess_name, Mess_address, Subscription_price,Phone_Num,Rating,Tiffin_details,Mess_owner_id) VALUES('malwa mill mess hp', 3000,8823019289,3,'dalchawal sabji',4 );


drop table if exists Subscription;
create table Subscription(
    Customer_id bigserial,
    Mess_id bigserial,
    Subscription_date date,
    Subscription_validity integer,
    primary key(Mess_id,Customer_id),
    foreign key (Customer_id) references Users,
    foreign key (Mess_id) references Mess
);

INSERT INTO Subscription(Customer_id,Mess_id,Subscription_date,Subscription_validity) VALUES(5,1,'2023-08-17',2);
INSERT INTO Subscription(Customer_id,Mess_id,Subscription_date,Subscription_validity) VALUES(6,2,'2023-04-17',6);

drop table if exists  Delivers;
create table Delivers(
    Boy_id bigserial,
    Mess_id bigserial,
    primary key(Mess_id,Boy_id),
    foreign key (Boy_id) references Users,
    foreign key (Mess_id) references Mess
);

INSERT INTO Delivers(Boy_id,Mess_id) VALUES(5,1);
INSERT INTO Delivers(Boy_id,Mess_id) VALUES(6,2);


-- user_id	fname	lname	phone_num	email	password	user_address	user_type
-- 1	Harsh	Saboo	8555465236	hs@gmail.com	Saboo	46, xyz Nagar	1
-- 2	Sidharth	Jain	4526366236	sj@gmail.com	Jain	55, Jain Colony	1
-- 3	Aniket	Kano	8319159263	ak@gmail.com	1234521	new jain restroA	2
-- 4	pandyey	Kash	8319159264	pk@gmail.com	1234522	new jain restroP	2
-- 5	Chirag	ragu	8319159265	cr@gmail.com	1234531	new jain restroC	3
-- 6	shubham	shukla	8319159265	ss@gmail.com	1234532	new jain restroC	3
-- 7	gautam	patidar	8319159235	gp@gmail.com	1234523	gautam mess restroC	2
