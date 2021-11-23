## ASL DB 설정



#### 1. MySQL

- DB 생성

```mysql
CREATE DATABASE stage1;
CREATE DATABASE stage2;
CREATE DATABASE stage3;
CREATE DATABASE stage4;
```



#### 2. Django

- DB 연결

```python
# settings.py

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    },
    'stage1': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'stage1',
        'HOST': {HOST},
        'USER': {USER},
        'PASSWORD': {PASSWORD},
        'PORT': {PORT},
        'CHARSET': 'utf8mb4',
    },
    
    ...
```

> `stage1` 부터 `stage4` 까지 각각 `HOST` , `USER`, `PASSWORD`, `PORT` 를 입력한다.



- migration

```bash
python manage.py migrate stage1 0001_initial --database=stage1

python manage.py migrate stage2 0002_remove_potion_name --database=stage2

python manage.py migrate stage3 0002_alter_neighbor_nap --database=stage3

python manage.py migrate stage4 0003_rose_roseinfo_scoreboard --database=stage4
```

> 각 `stage` 앱의 가장 최신의 migrations 파일을 migrate 해주면 된다.



- Loaddata

```bash
python manage.py loaddata stage1/fixtures/stage1.json

python manage.py loaddata stage1/fixtures/stage2.json

python manage.py loaddata stage1/fixtures/stage3.json

python manage.py loaddata stage1/fixtures/stage4.json
```