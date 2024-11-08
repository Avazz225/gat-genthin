class SQLInsert:
    CREATE_PARTICIPATION = """INSERT INTO participants (firstName, lastName, email, code) VALUES ('%s','%s','%s','%s');"""


class SQLUpdate:
    VERIFY_EMAIL = """UPDATE participants SET verified='1' WHERE code = '%s';"""
