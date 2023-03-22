import os
import sys
from flask import Flask, request
from flask_cors import CORS
from requests import get

app = Flask(__name__)
CORS(app)

gmaps_api_key = os.getenv("GMAPS_API_KEY")

if gmaps_api_key is None:
    print("GMAPS_API_KEY environment variable not found", file=sys.stderr)
    sys.exit(1)


@app.route("/maps/api/place/autocomplete/json")
def autocomplete():
    return proxy_gmaps_request()


@app.route("/maps/api/geocode/json")
def geocode():
    return proxy_gmaps_request()


def proxy_gmaps_request():
    params = dict(request.args)
    params["key"] = gmaps_api_key
    return get(f"https://maps.googleapis.com/{request.path}", params).content
