import json
from flask import Flask
from flask_cors import CORS
from overview import getPreviews
from galleryHandler import getImages, getImgs2


application = app = Flask(__name__)
CORS(app)

@app.route("/")
def overview():
	return {
        'statusCode': 200,
        'headers': { 'Content-Type': 'application/json', 'access-control-allow-origin':'*' },
        'body': json.dumps("generische testantwort")
    }
	
@app.route("/overview")
def overviews():
	return {
        'statusCode': 200,
        'headers': { 'Content-Type': 'application/json', 'access-control-allow-origin':'*'  },
        'body': json.dumps(getPreviews(""))
    }

@app.route("/maerchen")
def maerchen():
	return {
        'statusCode': 200,
        'headers': { 'Content-Type': 'application/json', 'access-control-allow-origin':'*'  },
        'body': json.dumps(getImages("maerchen/", 2))
    }

@app.route("/hanssachs")
def hanssachs():
	return {
        'statusCode': 200,
        'headers': { 'Content-Type': 'application/json', 'access-control-allow-origin':'*'  },
        'body': json.dumps(getImgs2("hanssachs/", 2))
    }

@app.route("/events")
def events():
	return {
        'statusCode': 200,
        'headers': { 'Content-Type': 'application/json', 'access-control-allow-origin':'*'  },
        'body': json.dumps(getImages("veranstaltungen/", 2))
    }

@app.route("/kindergat")
def kindergat():
	return {
        'statusCode': 200,
        'headers': { 'Content-Type': 'application/json', 'access-control-allow-origin':'*'  },
        'body': json.dumps(getImgs2("kinder-gat/", 2))
    }

@app.route("/kulissen")
def kulissen():
	return {
        'statusCode': 200,
        'headers': { 'Content-Type': 'application/json', 'access-control-allow-origin':'*'  },
        'body': json.dumps(getImgs2("hinter-den-kulissen/", 2))
    }

application.run()