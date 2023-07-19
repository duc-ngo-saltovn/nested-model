-- Them parent id
CREATE TABLE IF NOT EXISTS `family` (
  `id` smallint(5) NOT NULL AUTO_INCREMENT,
  `role` varchar(30) NOT NULL,
  `lft` smallint(5) NOT NULL,
  `rgt` smallint(5) NOT NULL,
  PRIMARY KEY (`id`)
);

-- add some family members
-- parents
INSERT INTO family (id, role, lft, rgt) VALUES (NULL, 'parents', 1, 28);

-- daughter
INSERT INTO family (id, role, lft, rgt) VALUES (NULL, 'daughter', 2, 15 );

-- son
INSERT INTO family (id, role, lft, rgt) VALUES (NULL, 'son', 16, 27);

-- grandchildren
INSERT INTO family (id, role, lft, rgt) VALUES (NULL, 'son', 3, 8);
INSERT INTO family (id, role, lft, rgt) VALUES (NULL, 'son', 9, 14);
INSERT INTO family (id, role, lft, rgt) VALUES (NULL, 'son', 17, 18);
INSERT INTO family (id, role, lft, rgt) VALUES (NULL, 'daughter', 19, 26);

-- great grandchildren
INSERT INTO family (id, role, lft, rgt) VALUES (NULL, 'daughter', 4, 5);
INSERT INTO family (id, role, lft, rgt) VALUES (NULL, 'son', 6, 7);

INSERT INTO family (id, role, lft, rgt) VALUES (NULL, 'daughter', 10, 11);
INSERT INTO family (id, role, lft, rgt) VALUES (NULL, 'son', 12, 13);

INSERT INTO family (id, role, lft, rgt) VALUES (NULL, 'daughter', 20, 21);
INSERT INTO family (id, role, lft, rgt) VALUES (NULL, 'daughter', 22, 23);
INSERT INTO family (id, role, lft, rgt) VALUES (NULL, 'daughter', 24, 25);


SELECT *
FROM family

-- Show deep
SELECT
	node.id,
	node.role,
	node.lft,
	node.rgt,
	COUNT(parent.id) - 1 depth
FROM
	family node,
	family parent
WHERE 
	node.lft BETWEEN parent.lft AND parent.rgt
GROUP BY node.id
ORDER BY COUNT(parent.id)

-- Add Node
SELECT @myRgt := rgt
FROM family
WHERE id = 2;

UPDATE family SET rgt = rgt + 2 WHERE rgt > @myRgt;
UPDATE family SET lft = lft + 2 WHERE lft > @myRgt;
INSERT INTO family (role, lft, rgt)
VALUES ('new son', @myRgt + 1, @myRgt + 2);

-- Delete Node
SELECT
	@myLft := f.lft,
	@myRgt := f.rgt,
	@myWdt := f.rgt - f.lft
FROM family f
WHERE f.role = 'new son';

DELETE FROM family WHERE lft BETWEEN @myLft AND @myRgt;
UPDATE family SET rgt = rgt - @myWdt WHERE rgt > @myRgt;
UPDATE family SET lft = lft - @myWdt WHERE lft > @myRgt;

-- Them parent id de lay cap con truc tiep