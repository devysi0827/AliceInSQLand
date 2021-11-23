# ASL Answers

> 문제의 정답 쿼리문을 통해 만들어진 데이터는 json 파일로 같은 폴더에 저장되어 있습니다.
>
> 쿼리문 형식은 MySql 우리 DB에 맞추어 작성되어있습니다.



## Stage1

### 01

```
SELECT * FROM ROOM;
```

### 02

```
CREATE TABLE SQLand (
    stage int,
    level int,
    resident varchar(255)
);
```



## Stage2

### 01

```
SELECT * FROM potion
WHERE scent = 'cherrypie';
```

### 02

```
SELECT * FROM potion 
ORDER BY size asc
limit 1;
```

### 03

```
SELECT * FROM potion 
ORDER BY size DESC
limit 1;
```

### 04

````
INSERT INTO pocket(product, amount)
VALUES('key', 1);
````

### 05

```
SELECT * FROM potion 
WHERE is_left = 1
AND
scent like '%berry%';
```

### 06

```
SELECT * FROM potion 
WHERE is_left = 1
AND
size <= 10;
```

### 07

```
DELETE FROM pocket 
WHERE product='key';
```



## Stage 3

### 01

```
SELECT b.name, b.sort
FROM partyattendee a
LEFT JOIN neighbor b
ON a.id = b.id
```

### 02

```
SELECT distinct b.name
FROM menu b
INNER JOIN kitchen a
ON a.name = b.name;
```

### 03

```
SELECT m.name as dessertname, k.name as teaname, m.ingredient, k.quantity
FROM menu m
INNER JOIN
(SELECT *
FROM kitchen
WHERE sort = 'beverage') as k
ON m.ingredient = k.ingredient
WHERE quantity >= 5;
```

### 04

```
SELECT name, 
CASE
when ingredient = 'green tea' then 'feather hat'
when ingredient = 'black tea' then 'striped hat'
when ingredient = 'strawberry' then 'rabbit hat'
else 'strange hat'
END as hat
FROM kitchen
WHERE sort = 'beverage';
```

### 05

```
SELECT b.name,
CASE
WHEN b.nap between '14:00:00' and '16:00:00' then 'X'
else 'O'
END as attend
FROM neighbor b;
```



## Stage 4

### 01

```
SELECT shape, count(shape)
FROM
(
    SELECT * FROM cloversoldier
    UNION
    SELECT * FROM diamondsoldier
    UNION
    SELECT * FROM heartsoldier
    UNION
    SELECT * FROM spadesoldier
) as total
GROUP BY shape;
```

### 02

```
SELECT result1.shape, letter, letter2
FROM

(SELECT a.letter, a.shape
FROM
(
    SELECT * FROM cloversoldier
    UNION
    SELECT * FROM diamondsoldier
    UNION
    SELECT * FROM heartsoldier
    UNION
    SELECT * FROM spadesoldier
) as a, 
(
SELECT shape, MIN(strength) as min_strength
FROM
(
    SELECT * FROM cloversoldier
    UNION
    SELECT * FROM diamondsoldier
    UNION
    SELECT * FROM heartsoldier
    UNION
    SELECT * FROM spadesoldier
) as tmp
GROUP BY shape
) as b
WHERE a.strength = b.min_strength AND a.shape = b.shape) result1

LEFT JOIN 
(SELECT c.letter as letter2, c.shape
FROM
(
    SELECT * FROM cloversoldier
    UNION
    SELECT * FROM diamondsoldier
    UNION
    SELECT * FROM heartsoldier
    UNION
    SELECT * FROM spadesoldier
) as c, 
(
SELECT shape, MAX(strength) as max_strength
FROM
(
    SELECT * FROM cloversoldier
    UNION
    SELECT * FROM diamondsoldier
    UNION
    SELECT * FROM heartsoldier
    UNION
    SELECT * FROM spadesoldier
) as tmp2
GROUP BY shape
) as d
WHERE c.strength = d.max_strength AND c.shape = d.shape) result2
ON result1.shape = result2.shape;
```

### 03

```
SELECT name, sum(score)
FROM scoreboard
GROUP BY name
ORDER BY sum(score)
```

### 04

```
SELECT r.id, r.beauty, r.paint, i.size
FROM rose r
    INNER JOIN roseinfo i
    ON r.id = i.id
    WHERE i.color = 'white'
    AND r.paint = 
        (SELECT MIN(r1.paint)
        FROM rose r1
        INNER JOIN roseinfo i1 on r1.id = i1.id
        WHERE i1.color = 'white'
        AND r1.beauty = r.beauty
        AND i1.size = i.size)
ORDER BY r.beauty DESC, i.size DESC
```





