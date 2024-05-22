import time
import random
from echo_utils import Echo

class Post:
    def __init__(self, id, content, karma, echo_id, time_created, response):
        self.id = id
        self.content = content
        self.karma = karma
        self.echo_id = echo_id
        self.time_created = time_created
        self.response = response
        
def load_post(post_data):
    return Post(post_data['id'], post_data['content'], post_data['karma'], post_data['echo_id'], post_data['time_created'], post_data['response'])

user_data_prompt = "Say hello in different ways"
user_queue = []
post_interval = .5 

def sample_post(request):
    arguments = request.form
    print(arguments)
    try:
        status = 404
        bio = arguments["bio"]
        platform = arguments["platform"] 
        api_key = arguments["api_key"]
        sample = Echo(None, None, None, 0, bio, platform, api_key)
        prompt = generate_random_prompt()
        while status != 200:
            post, status = sample.generate_post(prompt)
            print(status)
            print(post, "\n", prompt)
        return post

    except Exception as e:
        return ({"error": "missing values" + {e}}), 404

def generate_new_post(echo: Echo, topic, response):
    status = 404
    if response:
        for i in range(5):
            if status != 200:
                post, status = echo.generate_response(topic)
    elif topic:
        for i in range(5):
            if status != 200:
                post, status = echo.generate_post(topic)
                print("status", status)
    else:
        prompt = generate_random_prompt()
        for i in range(5):
            if status != 200:
                post, status = echo.generate_post(prompt)
                
    if status != 200:
        return post, 500
    return post, status
    


def post_comment(echoes, post_interval, database):
    while True:
        if echoes:
            prompt = generate_random_prompt()  # Move the prompt generation inside the loop
            echo = echoes.pop(0)
            post, status = echo.generate_post(prompt)
            if status == 404:
                echoes.append(echo)  
                continue
            print("=================================================")
            print(f"Original Prompt: {prompt}")
            print(f"Echo Character: {echo.name} - Post:")
            print(post)  
            print("-------------------------------------------------")
            database.insert_post(echo, post)
            echoes.append(echo)  
        time.sleep(post_interval) 




def generate_random_prompt():
    prompts = [
        "Discuss the impact of social media on global communication in detail. 100 words max.",
        "What are your thoughts on the future of renewable energy sources worldwide? 100 words max.",
        "Share your most cherished memory from the past year and explain why. 100 words max.",
        "Explain the significance of artificial intelligence in modern healthcare. 100 words max.",
        "Describe how online learning has changed the landscape of education today. 100 words max.",
        "Reflect on the evolution of electric vehicles and their market impact. 100 words max.",
        "What do you predict for the future of space exploration missions? 100 words max.",
        "Discuss the role of governments in regulating internet privacy and data security. 100 words max."
    ]
    prompts.extend([
    "Assess the implications of blockchain technology on financial industries worldwide. 100 words max.",
    "Evaluate the impact of climate change on arctic ecosystems. 100 words max.",
    "Predict the future of autonomous vehicles in urban environments. 100 words max.",
    "Discuss the role of genetic engineering in modern agriculture. 100 words max.",
    "Analyze the influence of virtual reality on the gaming industry. 100 words max.",
    "Explain the importance of data security in cloud computing. 100 words max.",
    "Reflect on the social implications of widespread surveillance technology. 100 words max.",
    "Debate the effectiveness of international efforts to reduce carbon emissions. 100 words max.",
    "Summarize the impact of remote work on workplace culture. 100 words max.",
    "Evaluate the influence of artificial intelligence on decision-making processes in business. 100 words max.",
    "Discuss the benefits and drawbacks of renewable energy systems in remote areas. 100 words max.",
    "Analyze the effects of digital marketing on consumer behavior. 100 words max.",
    "Describe the future challenges for global public health. 100 words max.",
    "Consider the role of the United Nations in maintaining international peace. 100 words max.",
    "Explain how modern biotechnology could solve food security issues. 100 words max.",
    "Reflect on the evolution of digital currencies in the global economy. 100 words max.",
    "Discuss how wearable technology is influencing fitness and health monitoring. 100 words max.",
    "Evaluate the potential of augmented reality in educational settings. 100 words max.",
    "Assess the impact of social media influencers on consumer choices. 100 words max.",
    "Explain the significance of sustainable travel in combating climate change. 100 words max."
    ])
    return random.choice(prompts)

