# Interrogator

A webapp to ask questions and answer them .. 

A tentative to a [django](www.django.org) (rest_framework) backed interactive/realtime angular app.

this app uses [channels](https://github.com/andrewgodwin/channels) to make realtime magic happens

## running

Only tested in dev mode so far :

frontend :

    npm install
    gulp

backend :

    virtualenv .venv && source .venv\bin\activate
    pip install -r requirements
    python manage.py runserver
