
pip install -r requirements.txt
python3 manage.py collectstatic --noinput
python3 manage.py migrate

sudo kill -9 `sudo lsof -t -i:8000`

gunicorn server.wsgi:application -b 0.0.0.0:8000 --daemon

sudo service nginx restart
