from flask import Flask, request, send_from_directory, jsonify
import spacy
import random
from fuzzywuzzy import fuzz
import string

app = Flask(__name__, static_url_path='/static', static_folder='static')
nlp = spacy.load("en_core_web_sm")

# Greeting patterns
greeting_patterns = ["hello", "hi", "hii", "hey", "howdy"]

# Define responses for greetings
greeting_responses = [
    "Welcome to Malnad College of Engineering! How may I assist you today?",
    "Hello and welcome to Malnad College of Engineering. How can I help you?",
    "Hi there! At Malnad College of Engineering, we're here to support you. What can I do for you?",
    "Greetings from Malnad College of Engineering! How may I be of service to you today?"
]

# Define a list of questions and their corresponding answers
question_answers = {
    "What is your name?": "I am a MCE Assistant.",
    "How are you?": "I'm a MCE Assistant, but thanks for asking!",
    "What is the weather today?": "I'm sorry, I cannot provide weather information at the moment.",
    "Why did i pick to attend this college?": "You choose to attend MCE because of its outstanding academic programs, vibrant campus life, and strong industry connections, all of which align perfectly with your educational and career goals."
}
# Function to answer questions based on pre-defined answers
def answer_question(question):
    # Process the question using spaCy
    question_doc = nlp(question)

    # Initialize variables to store the best match and its similarity score
    best_match = None
    best_similarity = 0

    # Iterate over the predefined questions and find the best match
    for key_question, answer in question_answers.items():
        similarity = fuzz.partial_ratio(question.lower(), key_question.lower())
        if similarity > best_similarity:
            best_similarity = similarity
            best_match = answer

    # If a match with sufficient similarity is found, return the corresponding answer
    if best_similarity > 80:  # Adjust the similarity threshold as needed
        return best_match

    # If no matching question is found, return a default response
    return "I'm sorry, I don't have an answer to that question."

def recognize_intent(user_input):
    # Remove punctuation from the user input
    user_input_cleaned = user_input.translate(str.maketrans('', '', string.punctuation))
    doc = nlp(user_input_cleaned.lower())

    # Check if the user input contains a greeting
    for token in doc:
        if token.text in greeting_patterns:
            return "greeting"
        
         # Check if the user input is a question
    if user_input.endswith("?"):
        return "question"
    
        
    # Check if the user input indicates the admission intent
    if "admission" in user_input_cleaned.lower() or "admission form" in user_input_cleaned.lower():
        return "admission"
    
    # Check if the user input indicates the course intent
    if "course" in user_input_cleaned.lower() or "programme" in user_input_cleaned.lower():
        return "course"

    # Default intent
    return "unknown"





# Function to generate response based on recognized intent
def generate_response(intent, user_input):
    if intent == "greeting":
        return random.choice(greeting_responses), intent
    if intent == "question":
        if user_input in question_answers:
            return question_answers[user_input]
        else:
            return "I'm sorry, I don't have an answer to that question."

    
    # If the intent is unknown
    return "I'm sorry, I didn't understand that. Can you please rephrase your word?", intent

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/send-message', methods=['POST'])
def send_message():
    if request.method == 'POST':
        data = request.json
        user_input = data['message']

        if user_input.lower() == 'greeting':
            response = random.choice(greeting_responses)
            intent = 'greeting'
        else:
            intent = recognize_intent(user_input)
            if intent == "question":
                response = answer_question(user_input)
            else:
                response, _ = generate_response(intent, user_input)

        return jsonify({'response': response, 'intent': intent})

    return jsonify({'error': 'Method Not Allowed'}), 405

if __name__ == "__main__":
    app.run(debug=True)
