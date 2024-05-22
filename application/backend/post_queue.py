import time
import random
from database_utils import Database
from echo_utils import Echo, load_echoes_from_json
from server import backend
from post_utils import generate_random_prompt, post_comment
database = Database.load_from_json("database.json")


if __name__ == "__main__":
    with backend.app_context():
        json_echoes = database.get_echoes()
        echoes = load_echoes_from_json(json_echoes)
        while True:
            set_prompt = generate_random_prompt()  
            post_interval = 3600
            post_comment(echoes, post_interval, database)
            