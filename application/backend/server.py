"""Server Module

This module contains the code for the backend server, which handles all the API requests for the backend to get data.

This backend server is implemented using the Flask web framework, and it interacts with the database to fetch or store data as requested by the API.

This module consists of several functions that handle different API routes:
    1. `/api/get_users`: returns a list of users from the database.
    2. `/api/get_echoes`: returns a list of echos from the database.
    3. `/api/get_posts`: returns a list of posts from the database.
    4. `/api/get_feed`: returns a list of the most recent posts, ordered by the time posted.
    5. `/api/get_echo`: returns a specific echo by id from the database.

Example:
    To start the server, you can simply run this module directly using the Python interpreter, and it will start the server in debug mode using Flask's built-in server:
        
        $ python server.py

Note:
    This module assumes the existence of a 'database.json' JSON file in the same directory, which is loaded on start to initialize the database.

Attributes:
    backend (Flask): A Flask web application object which is used to handle API requests.
    database (Database): A database object which is used to interact with the database.
"""
from flask import Flask, request, jsonify
from database_utils import Database
from post_utils import sample_post
from flask_cors import CORS, cross_origin

backend = Flask(__name__)
CORS(backend)
database = Database.load_from_json('database.json')

@backend.route('/api/get_users', methods=['GET'])
def get_users():
    '''
    Returns a list of users from the database.
    '''
    return database.get_users()

@backend.route('/api/get_echoes', methods=['GET'])
def get_echoes():
    '''
    Returns a list of echos from the database.
    '''
    return jsonify(database.get_echoes())

@backend.route('/api/get_posts', methods=['GET'])
def get_posts():
    '''
    Returns a list of posts from the database.
    '''
    return database.get_posts()

@backend.route('/api/get_feed', methods=['GET'])
def get_feed():
    '''
    Returns a list of the most recent posts, ordered by time posted.
    '''
    return database.get_feed()

@backend.route('/api/get_echo', methods=['GET'])
def get_echo():
    '''
    Returns an echo by id.
    '''
    print(request.args.get("id"))
    return database.get_echo(request)


@backend.route('/api/update_echo', methods=['GET'])
def update_echo():
    '''
    Function used to update the echo information
    '''
    return database.update_echo(request)

@backend.route('/api/delete_echo', methods=['GET'])
def delete_echo():
    '''
    This function deletes the echo, should also delete all posts related to echo.
    '''
    return database.delete_echo(request)

@backend.route('/api/delete_post', methods = ['GET'])
def delete_post():
    '''
    function to delete a post by id 
    '''
    return database.delete_post(request)

@backend.route('/api/get_user_echoes', methods = ["GET"])
def get_user_echoes():
    '''
    This function will get all echoes owned by user id
    '''
    return database.get_user_echoes(request)


@backend.route('/api/instant_post', methods = ["GET","POST"])
@cross_origin()
def instant_post():
    '''
    This function will instantly add a post to the feed. 
    '''
    return database.instant_post(request)


@backend.route('/api/get_sample_post', methods = ["GET", "POST"])
@cross_origin()
def get_sample_post():
    '''
    This function will return a list of sample posts
    '''
    return sample_post(request)

if __name__ == '__main__':
    backend.run(debug=False)