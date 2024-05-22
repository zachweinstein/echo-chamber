"""
A Python module for managing a MySQL relational Database.

This module provides the functionality to establish a connection to a MySQL database, 
insert data into the database, retrieve data from it and perform certain specific queries.
These include retrieving all users, echo instances and posts from the database, getting 
the top ten most recent posts and more. It also allows to create a database instance from a 
json file.

This module contains Database class which accepts MySQL Database name, user credentials as its
attribute during initialization. The class contains methods that allow us to perform various database 
operations like inserting echo into database, retrieving users, posts, echoes from the database, etc. 

Classes:
    Database: A class to represent a relational Database using MySQL. It has connection and cursor
    as its attributes. 
"""
import mysql.connector
from flask import jsonify
import json
from echo_utils import Echo, load_echoes_from_json
from post_utils import Post, load_post, generate_new_post
 
class Database:
    """
    A class to represent a relational Database using MySQL.

    Attributes:
        connection (mysql.connector.connect): The connection to the MySQL database.
        cursor (mysql.connector.connect.cursor): The cursor for executing commands against the MySQL database.
    """

    def __init__(self, DB_NAME, DB_USER, DB_PASSWORD, DB_HOST):
        """
        Initializes the Database instance and sets up a connection to the MySQL database.

        Args:
            DB_NAME (str): The database name.
            DB_USER (str): The username for the database.
            DB_PASSWORD (str): The password for the database.
            DATABASE (str): The name of the database.
        """
        self.connection = mysql.connector.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASSWORD,
            database=DB_NAME,
            autocommit=True
        )
        self.cursor = self.connection.cursor(dictionary = True)

    def insert_echo(self, echo: Echo):
        """
        Inserts an Echo instance into the database.

        Args:
            echo (Echo): An Echo instance.

        Returns:
            None.
        """
        try:
            sql = "INSERT INTO echo (name, bio, platform) VALUES (%s, %s, %s)"
            values = (echo.name, echo.bio, echo.platform)
            self.cursor.execute(sql, values)
            self.connection.commit()
            print(f"Echo instance '{echo.name}' inserted into database.")
        except Exception as e:
            print("Error while connecting to MySQL", e)
        # finally:
        #     if self.connection and self.connection.is_connected():
        #         cursor.close()
        #         conn.close()
    
    def get_users(self):
        """
        Retrieves all entries from the user table in the database.

        Returns:
            JSON: A jsonify object containing all rows from the user table.
        """
        self.cursor.execute("SELECT * FROM User")
        rows = self.cursor.fetchall()
        return jsonify(rows)
    
    def get_echoes(self):
        """
        Retrieves all entries from the echo table in the database.

        Returns:
            JSON: A jsonify object containing all rows from the echo table.
        """
        self.cursor.execute("SELECT * FROM echo")
        rows = self.cursor.fetchall()
        return rows
    
    def get_posts(self):
        """
        Retrieves all entries from the post table, sorted by time_created in descending order, from the database.

        Returns:
            JSON: A jsonify object containing all rows from the post table.
        """
        self.cursor.execute("SELECT * FROM post ORDER BY time_created DESC")
        rows = self.cursor.fetchall()
        return jsonify(rows)
    
    def get_feed(self):
        """
        Retrieves the ten most recent entries from the post table in the database.

        Returns:
            JSON: A jsonify object containing the top ten rows from the post table.
        """
        self.cursor.execute("SELECT * FROM post ORDER BY time_created DESC LIMIT 10;")
        rows = self.cursor.fetchall()
        return jsonify(rows)
    
    def get_echo(self, request):
        """
        Retrieves a specific echo from the echo table in the database using an id from the request.

        Args:
            request (request): The echo request containing the id of the echo to be retrieved.

        Returns:
            JSON, int: A jsonify object containing the specific echo, or a jsonify object containing an error message and the HTTP status code 404 if the echo is not found.
        """
        try: 
            echo_id = request.args.get("id")
            self.cursor.execute("SELECT * FROM echo WHERE id = %s", (echo_id,))
            echo = self.cursor.fetchone()
            return jsonify(echo)
        except Exception as e:
                return jsonify({"error": "Echo not found " + str(e)}), 404
        
        
    # This function is associated with the backend queue. It has no connection to the frontend. 
    def insert_post(self, echo: Echo, post: str):
        """
        Inserts a new post associated with a specific Echo instance into the post table in the database.

        Args:
            echo (Echo): An Echo instance.
            post (str): The content of the post.

        Returns:
            None.
        """
        try:
            query = "INSERT INTO post (echo_id, content) VALUES (%s,%s)"
            values = (echo.id, post)
            self.cursor.execute(query, values)
            self.connection.commit()
            print("Inserted post into database")
            return ({"success": "added post"}), 200
        except Exception as e:
           return ({"error": str(e)}), 404
            
    def update_echo(self, request):
        '''
        Function used to update the echo information
        '''
        args = request.args
        try:
            echo_id = request.args.get('echo_id')
        except Exception as e:
            return jsonify({"error": "Echo not found"}), 404
        try:
            for k, v in args.items():
                if k == 'bio':
                    self.cursor.execute("UPDATE echo SET bio = %s where id = %s;", (v, echo_id,))
                    self.connection.commit()
                elif k == 'name':
                    self.cursor.execute("UPDATE echo SET name = %s where id = %s;", (v, echo_id,))
                    self.connection.commit()
                elif k == 'api_key':
                    self.cursor.execute("UPDATE echo SET api_key = %s where id = %s;", (v, echo_id,))
                    self.connection.commit()
                elif k == 'platform':
                    self.cursor.execute("UPDATE echo SET platform = %s where id = %s;", (v, echo_id,))
                    self.connection.commit()
                    
            return jsonify({"success": "updated" + str(echo_id)}), 200

        except Exception as e:
            self.connection.rollback()
            return jsonify({"error": str(e)}), 404

    
    def delete_echo(self, request):
        '''
        This function deletes the echo, should also delete all posts related to echo.
        '''
        try:
            echo_id = request.args.get("echo_id")
        except Exception as e:
            return jsonify({"error": "test Echo not found"})
        try:
            try:
                self.cursor.execute("DELETE FROM posts WHERE echo_id = %s;", (echo_id,))
                self.connection.commit()

            except:
                print("no posts")
            self.cursor.execute("DELETE FROM echo WHERE id = %s", (echo_id,))
            self.connection.commit()
            return jsonify({"success": "Echo and related posts deleted successfully"}), 200
        except Exception as e:
            self.connection.rollback()
            return jsonify({"error": str(e)}), 404

    def delete_post(self, request):
        '''
        function to delete a post by id 
        '''
        try:
            echo_id = request.args.get('echo_id')
        except Exception as e:
            return jsonify({"error": "could not find echo"}), 404
        try:
            self.cursor.execute("DELETE FROM posts WHERE id = %s", (echo_id,))
            self.connection.commit()
            return jsonify({"success": "Successfully deleted post"}), 200
        except Exception as e:
            self.connection.rollback()
            return jsonify({"error": str(e)}), 404

    def get_user_echoes(self, request):
        '''
        This function will get all echoes owned by user id
        '''
        try:
            user_id = request.args.get('user_id')
        except Exception as e:
            return jsonify({"error": "User not found"})
        try: 
            self.cursor.execute("SELECT * FROM echo WHERE user_id = %s", (user_id,))
            echoes = self.cursor.fetchall()
            if not echoes:
                return jsonify({"error": "No echoes found for the user"}), 404
            return jsonify(echoes)
        except Exception as e:
            return jsonify({"error": str(e)}), 404

    
    def instant_post(self, request):
        '''
        parameters:
        session token
        echo id 
        topic: If the user wants to implement a topic. 
        
        If we generalize to responses:
        previous post id, if no previous: null
        
        I can make my own queries to the database to find any information. 
        
        IF TOPIC AND PREVIOUS POST INCLUDED, IGNORE TOPIC. 
    
        
        INSERT POST (echo_id, response)
        '''
        try:
            arguments = request.form
            print(arguments)
            session_token = request.form.get("sessionToken")
            prompt = None
            response = None
            if self.check_auth(session_token):
                if "echo_id" in arguments.keys():
                    echo_id = arguments["echo_id"]

                    self.cursor.execute("SELECT * FROM echo WHERE id = %s", (echo_id,))
                    fetch_echo = self.cursor.fetchone()
                    if "prompt" in arguments.keys():
                        prompt = arguments["prompt"]
                    if "response" in arguments.keys():
                        response = arguments["response"]
                        try:
                            self.cursor.execute("SELECT * FROM post WHERE id = %s", (response,))
                            post_list = self.cursor.fetchone()

                            post = load_post(post_list)
                            
                            prompt = post.content
                        except Exception as e:
                            return ({"error": "can't find post"}), 404
                    
                    # Since this function returns a list, but this is only fetching a singular echo
                    # We can just take the first value of the list. 

                    echo = Echo(fetch_echo['id'], fetch_echo['user_id'], fetch_echo['name'], fetch_echo['bio'], fetch_echo['owned'], fetch_echo['platform'], fetch_echo['api_key'])
                    new_post, status = generate_new_post(echo, prompt, response)
                    if status == 500:
                        return ({"error": status})
                    self.cursor.execute("INSERT INTO post (content, echo_id, response) VALUES (%s,%s,%s)", (new_post, echo.id, response,) )
                    self.connection.commit()
                    print("instantly added a post")
                    return ({"success": "added instant generated post"}), 200
                else:
                    return({"error", "could not find echo"}), 402
            return ({"error": "Authentication token failed"}), 401
        except Exception as e:
            self.connection.rollback()
            return ({"error": str(e)}), 404


        
        
        
        
        
    def check_auth(self, session_token):
        '''
        Passing in 
        seesionToken: String
        Checks whether that session token is in the session table
        return true/false
        '''

        try:
            self.cursor.execute("SELECT * FROM Session WHERE sessionToken = %s", (session_token,))
            session = self.cursor.fetchone()
            
            if session:
                return True
            else:
                return False
        except Exception as e:
            print(e)
            return False

    
    
    
    @staticmethod
    def load_from_json(filename: str): #TODO - Unit test
        """
        Loads a Database from a json file.

        Args:
            filename (str): The json file to load from.

        Returns:
            Database: A Database instance loaded from the given json file.
        """
        with open(filename, 'r') as file:
            data = json.load(file)
            return Database(data['DB_NAME'], data['DB_USER'], data['DB_PASSWORD'], data['DB_HOST'])