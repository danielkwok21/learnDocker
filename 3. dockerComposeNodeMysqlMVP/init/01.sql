-- Create db
DROP DATABASE IF EXISTS learnDocker;
CREATE DATABASE IF NOT EXISTS learnDocker;
USE learnDocker;

-- Create table
CREATE TABLE user (
    id int not null auto_increment,
    name varchar(100) default null,
    primary key (id)
);