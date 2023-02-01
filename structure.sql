DROP DATABASE IF EXISTS allStarTech;
CREATE DATABASE allStarTech;
USE allStarTech;

create table users (
    id smallint not null auto_increment,
    mail text unique not null,
    name text default null,
    last_name text default null,
    password text not null,
    picture text NOT NULL,
    is_admin smallint(2) default null,
    createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt timestamp NULL,
  primary key (id)
);

CREATE TABLE categories (
    id smallint(6) NOT NULL,
    name varchar(95) DEFAULT NULL,
    createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt timestamp null,
  PRIMARY KEY (id)
);

create table products (
    id smallint(6) not null auto_increment,
    name text default null,
    price mediumint(10) default null,
    category_id smallint(6) default null,
    seller_id smallint(6) default null,
    img1 text default null,
    img2 text default null,
    description text default null,
    discount smallint(3) default null,
    createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt timestamp NULL,
  primary key (id),
  foreign key (category_id) references categories(id),
  foreign key (seller_id) references users(id)
);
