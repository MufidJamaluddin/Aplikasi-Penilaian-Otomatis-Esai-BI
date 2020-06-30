from tests import client
import json

def test_user_not_login(client):
    """Start with a blank database."""

    rv = client.get('/api/auth')
    assert b'{"role": "", "nama": "", "username": ""}' in rv.data