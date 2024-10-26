import mysql.connector
import os

class DatabaseManager:
    def __init__(self):
        self.connection = None
        self.create_connection()

    def create_connection(self):
        try:
            self.connection = mysql.connector.connect(host=os.environ['DB_HOST'],
                                                        database=os.environ['DB_NAME'],
                                                        user=os.environ['DB_LOGIN_USER'],
                                                        password=os.environ['DB_LOGIN_PW'])
        except Exception as error:
            print("Error while connecting to MYSQL: ", error)

    def execute_write(self, query:str, data:tuple) -> int:
        if self.connection == None:
            self.create_connection()
        try:
            cursor = self.connection.cursor(buffered=True)
            cursor.execute(query % data)
            lastId = cursor.lastrowid
            self.connection.commit()
            return lastId
        except Exception as e:
            print("Error during write operation:", e)
            return -1

    def execute_select(self, query:str, data:tuple, single_row:bool = False):  
        if self.connection == None:
            self.create_connection() 
        try:
            cursor = self.connection.cursor(buffered=True)
            cursor.execute(query % data)
            if single_row: 
                res = cursor.fetchone()
            else: 
                res = cursor.fetchall()
            cursor.close()

            return res
        except Exception as e:
            print("Error during select operation:", e)

    def __del__(self):
        if self.connection: 
            self.connection.close()