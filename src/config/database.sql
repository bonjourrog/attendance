USE heroku_90d379cc68d5d22;

CREATE TABLE administrator
(
    id INT(11) NOT NULL,
    userName VARCHAR(50) NOT NULL,
    password VARCHAR(200) NOT NULL,
    user_type INT(11) NOT NULL
);

ALTER TABLE administrator
    ADD PRIMARY KEY (id);

ALTER TABLE administrator
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

DESCRIBE administrator;
