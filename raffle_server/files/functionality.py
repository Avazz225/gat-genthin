from files.database import DatabaseManager
from files.sqlQueries import SQLInsert, SQLUpdate
from files.email import send_activation_email

import os
import string
import random
import json


def acceptParticipation(email:str, first_name:str, last_name:str, solution:str, solution_length:int, db_manager:DatabaseManager):
    if solution_length != int(os.environ.get("SOL_LEN")):
        return json.dumps({"error": "Wrong solution"}), 409
    
    if solution.lower() != os.environ.get("SOL").lower():
        return json.dumps({"error": "Wrong solution"}), 409
    
    confirmationCode = generateConfirmationCode()

    result = db_manager.execute_write(SQLInsert().CREATE_PARTICIPATION, (first_name, last_name, email, confirmationCode))
    if result == -1:
        return json.dumps({"error": "duplicate email"}), 403
    
    send_activation_email(confirmationCode, email, first_name)

    return json.dumps({"success": "success"}), 200


def generateConfirmationCode():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=30))


def processConfirmation(code, db_manager:DatabaseManager):
    result = db_manager.execute_write(SQLUpdate().VERIFY_EMAIL, (code))
    if result == -1:
        return json.dumps({"error": "code not found"}), 404
    else:
        return json.dumps({"success": "successfully confirmed"}), 200
