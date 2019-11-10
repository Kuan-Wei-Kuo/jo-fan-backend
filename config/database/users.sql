CREATE TABLE IF NOT EXISTS jofan.users (
  id            INT NOT NULL AUTO_INCREMENT,
  uuid          varchar(36) NOT NULL UNIQUE,
  account       varchar(50) NOT NULL UNIQUE,
  password      varchar(50) NOT NULL,
  nickName      varchar(10) DEFAULT '',
  avatar        varchar(50)  DEFAULT '',
  birthDate     dateTime,
  registerDate  dateTime DEFAULT CURRENT_TIMESTAMP,
  loginDate     dateTime,
  scope         int NOT NULL DEFAULT 0,
  primary key(id)
);