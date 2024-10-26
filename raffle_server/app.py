from flask import Flask, request
from flask_cors import CORS
from files.database import DatabaseManager
from files.functionality import acceptParticipation, processConfirmation
import json

#import dotenv
#dotenv.load_dotenv()

app = Flask(__name__)
CORS(app)
db_manager = DatabaseManager()

@app.route("/", methods=["GET"])
def default_response():
    return "<body style='background-color: #262626; color: #ededed; font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,sans-serif;'><center><h1>gat Raffle Service</h1> <b>Status:</b> <span style='color:green;'>online</span></center></body>", 200


@app.route("/participate", methods=["POST"])
def participate():
	participation, tos, email, first_name, last_name, solution, solution_length = request.json['agreedToParticipationConditions'], request.json['agreedToTermsOfService'],request.json['email'],request.json['firstName'],request.json['lastName'],request.json['solution'],request.json['solutionLength']
	if participation and tos:
		return acceptParticipation(email, first_name, last_name, solution, solution_length, db_manager)
	else:
		return json.dumps({'error': "tos or participation check failed"}), 406

	
@app.route("/confirmparticipation", methods=["PUT"])
def confirm():
	code = request.json['confirmationCode']
	return processConfirmation(code, db_manager)

#app.run()