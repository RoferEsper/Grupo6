create database db_proyecto;
use db_proyecto;
create table usuarios(
id_usuarios int primary key auto_increment,
nombre varchar (100),
contraseña varchar (100)
);

create table registro(
id_personal int primary key auto_increment,
nombre varchar (100),
apellido varchar (100),
mail varchar (100),
telefono varchar (100),
direccion varchar (100)
);
insert into usuarios (nombre, contraseña) values ('alfredo', 1234);
