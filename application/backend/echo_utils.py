"""
A Python module for generating posts using Echo instances in the Echo Chamber social media platform.

This module contains the Echo class, which serves as a wrapper for a character in the Echo Chamber social media platform.

Classes:
    Echo: A class that serves as a wrapper for a character in the Echo Chamber social media platform. 
          This should be used to generate posts and responses for a given character.

Functions:
    load_echoes_from_json: Loads Echo instances from a JSON file.
    generate_response_gemini: Generates a response to a give post chain using the Gemini LLM. 
                              This function is an abstracted utility function and should NOT be called directly unless you are testing the Gemini LLM.
    generate_post_gemini: Generates a post about a topic using the Gemini LLM. 
                          This function is an abstracted utility function and should NOT be called directly unless you are testing the Gemini LLM.
"""
import json
from langchain_google_genai import GoogleGenerativeAI

class Echo:
    """Echo is a class that serves as a wrapper for a character in the Echo Chamber social media platform.

    Echo uses a character's name, bio, language generation model and an API key to 
    generate post and response strings based on inputs.

    Parameters:
        name (str): The name of the character used for posting on social media.
        bio (str): A brief bio that describes the character.
        llm (str): The lamguage learning model used for text generation.
        api_key (str): The API key for the language learning model.

    Attributes:
        default_prompt (str): The default prompt for generating posts and responses.
    """
    default_prompt = "Welcome to Echo Chamber, the best social media website on the planet. Posts on Echo Chamber are approximately one or two paragraphs long. When given a topic, you will make a post about that topic as your given character. Remember, this is a social media website - do not write your posts in the form of a letter."

    def __init__(self, id, user_id, name, owned, bio, platform, api_key):
        """
        Initializes the Echo instance.

        Args:
            name (str): The name of the Echo instance.
            bio (str): The bio of the Echo instance.
            llm (str): The LLM to use for generating posts and responses.
            api_key (str): The API key for the LLM service.
        """
        self.id = id
        self.user_id = user_id
        self.name = name
        self.owned = owned
        self.bio = bio
        self.platform = platform
        self.api_key = api_key
    
    def generate_post(self, topic: str):
        """Generates a post based on the given topic

        Args:
            topic (str): The topic to generate a post about

        Returns:
            str: The generated post
        """
        match self.platform:
            case "gemini":
                return generate_post_gemini(self, topic)
            case _:
                return "Error - valid LLM not selected"

    def generate_response(self, post_chain: list) -> str:
        """Generates a response based on the given post chain

        Args:
            post_chain (list): The post chain to generate a response to

        Returns:
            str: The generated response
        """
        print("responsding")

        match self.platform:
            case "gemini":
                return generate_response_gemini(self, post_chain)
            case _:
                return "Error - valid LLM not selected"
    


def load_echoes_from_json(data):
    return [Echo(person['id'], person['user_id'], person['name'], person['bio'], person['owned'], person['platform'], person['api_key']) for person in data]


            
def generate_response_gemini(echo: Echo, post_chain) -> str:
    """Generates a response based on the given post chain using the Gemini LLM.

    Args:
        echo (Echo): The Echo object
        post_chain: The post chain to generate a response to

    Returns:
        str: The generated response
    """
    try:
        llm = GoogleGenerativeAI(model="models/text-bison-001", google_api_key=echo.api_key)
        
        # Thanks to Python's type-coercion, we can pass the post_chain list directly to the LLM as it will be converted to a string.
        return llm.invoke(
            f"Pretend this is your personality: {echo.bio}\n{echo.default_prompt}\nHere is your respond to this topic: \n{post_chain}"
        ), 200
    except Exception as e:
        return str(e), 404


def generate_post_gemini(echo: Echo, topic: str) -> str:
    """Generates a post based on the given topic using the Gemini LLM.

    Args:
        echo (Echo): The Echo object
        topic (str): The topic to generate a post about

    Returns:
        str: The generated post
    """
    #TODO: I needed to add a try catch here because the llm was failing to call saying I have index out of range error. 
    # Not sure what the cause is, so if someone else can look into it that would be helpful.
    try:
        llm = GoogleGenerativeAI(model="models/text-bison-001", google_api_key=echo.api_key)

        return llm.invoke(
            f"Pretend this is your personality: {echo.bio}\n{echo.default_prompt}\nHere is your topic and respond to it given the personality: \n{topic}"
        ), 200
    except Exception as e:
        return str(e), 404

