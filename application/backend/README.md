# Backend Setup for Echo Chamber Social Media Platform

This README outlines the necessary steps to set up and run the backend for the Echo Chamber social media platform. Follow these instructions to prepare your development environment.

## Setup

### Prerequisites
- ```python >= 3.10```
- ```mysql == 8.0```
### Python Dependencies
In the backend directory, run the following command:
- ```pip install -r requirements.txt```

### MYSQL Setup
Make sure you have MySQL installed.
In the backend directory, run the following command: 
- Open up a MySQL environment and run the database script creating a schema.
- Setting that default schema as the default.
- Set your MySQL envoronment variables in ```database.json```
Example: 
```
{
    "DB_HOST": "127.0.0.1",
    "DB_USER": "root",
    "DB_PASSWORD": "danieljchang",
    "DB_NAME": "echochamber-db2"
}
```

## Usage
### Running the Backend Server
- Run the following command in the backend directory: ```python server.py```
- This command launches the Flask application and serves your backend APIs at http://localhost:5000 by default.


### Testing
- TODO
