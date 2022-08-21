CREATE PROCEDURE `AddUser`(
IN _id INT,
IN _name VARCHAR(64),
IN _email VARCHAR(255),
IN _password VARCHAR(64)
)
BEGIN
	IF _id = 0 THEN
		INSERT INTO user (name, email, password)
        VALUES (_name, _email, _password);
        SET _id = LAST_INSERT_ID();
	ELSE
		UPDATE user
        SET
			name = _name,
			email = _email
		WHERE id = _id;
	END IF;
    SELECT _id as id;
END;