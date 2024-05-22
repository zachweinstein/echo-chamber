import mysql.connector
from mysql.connector import Error


connection = mysql.connector.connect(
host='echochamber-db2.cb8cs84609qe.us-west-1.rds.amazonaws.com',
user='admin',
password='ky7kLDjY0FGXGUwxo5MH',
database='echochamber-db2',
port=3306  # Set this to match your RDS instance port

)
print("connected)")
#     if connection.is_connected():
#         db_Info = connection.get_server_info()
#         print("Connected to MySQL Server version ", db_Info)
#         cursor = connection.cursor()
#         cursor.execute("select database();")
#         record = cursor.fetchone()
#         print("You're connected to database: ", record)
# except Error as e:
#     print("Error while connecting to MySQL", e)
# finally:
#     if (connection.is_connected()):
#         cursor.close()
#         connection.close()
#         print("MySQL connection is closed")
