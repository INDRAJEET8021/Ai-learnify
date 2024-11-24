from flask import Flask, jsonify, request
from flask_cors import CORS
from quizGenerator import generate_quiz
from courseGenerator import gen_roadmap, gen_course
from chatbot import generate_bot_response
import json

app = Flask(__name__)
CORS(app)  # Enable CORS to allow cross-origin requests from React

# Define the maximum number of retries and the delay between retries
MAX_RETRIES = 100

def safe_gen_course(heading, retries=MAX_RETRIES):
    """Try to call gen_course and retry if an error occurs."""
    for attempt in range(retries):
        try:
            # Attempt to generate the course description
            return gen_course(heading)
        except Exception as e:
            print(f"Error in gen_course for heading '{heading}': {e}")
            if attempt < retries - 1:
                print(f"Retrying... (Attempt {attempt + 2} of {retries})")
            else:
                print("Max retries reached. Returning empty description.")
                return "Description not available"
            
# Function to load courses from the JSON file with error handling for empty or invalid files
def load_courses(file_path):
    try:
        with open(file_path, 'r') as json_file:
            # Attempt to load the JSON data from the file
            data = json.load(json_file)
            # If the file is empty, return an empty list
            if not data:
                return []
            return data
    except FileNotFoundError:
        # If the file doesn't exist, return an empty list
        print(f"{file_path} not found. Initializing with empty data.")
        return []
    except json.JSONDecodeError:
        # If the file has invalid JSON, return an empty list
        print(f"Error decoding JSON in {file_path}. Initializing with empty data.")
        return []
    
# Function to update the JSON file with new courses
def update_courses_in_file(filename, new_courses):
    existing_courses = load_courses(filename)
    # Extend the existing data with new courses
    existing_courses.extend(new_courses)

    with open(filename, 'w') as json_file:
        json.dump(existing_courses, json_file, indent=4)
    
@app.route('/api/courses/search', methods=['GET'])
def search_courses():
    query = request.args.get('query', '').lower()

    filtered_courses = gen_roadmap(query)

    update_courses_in_file('course_roadmap.json', filtered_courses)
    
    return jsonify({"courses": filtered_courses})

@app.route('/get_module', methods=['GET'])
def get_module():
    course_id = request.args.get('course-id')

    detailed_data = load_courses('detailed_course.json')
    course = next((c for c in detailed_data if c['title'].lower() == course_id.lower()), None)

    if course:
        return jsonify(course)

    course_data = load_courses('course_roadmap.json')

    # Find the course with the given ID
    course = next((c for c in course_data if c['id'].lower() == course_id.lower()), None)
    if not course:
        return jsonify({"error": "Course not found"}), 404
    
    detailed_course = {
        "title": course["title"],
        "modules": []
    }
    
    for module in course['modules']:
        # Prepare the module content for response
        module_content = {
            "moduleTitle": module["moduleTitle"],
            "headings": []
        }

        for heading in module['headings']:
            module_content['headings'].append({
                "heading": heading,
                "description": safe_gen_course(heading, retries=MAX_RETRIES)
            })
        detailed_course["modules"].append(module_content)

    update_courses_in_file('detailed_course.json', [detailed_course])

    return jsonify(detailed_course)

@app.route('/chat', methods=['POST'])
def chat():
    # Get the user's message from the request
    user_message = request.json.get('message')
    
    if not user_message:
        return jsonify({'error': 'No message provided'}), 400
    
    # Generate bot response based on user input
    bot_response = generate_bot_response(user_message)
    
    # Return the response as JSON
    return jsonify({'response': bot_response})

@app.route('/api/courses', methods=['GET'])
def get_courses():
    # Return the course data as JSON
    courses_data = load_courses('course_roadmap.json')
    return jsonify(courses_data)

@app.route('/quiz', methods=['GET'])
def get_quiz():
    # Get the 'topic' query parameter
    topic = request.args.get('topic')

    quiz_data = generate_quiz(topic)
    print(quiz_data)
    
    return jsonify(quiz_data)
if __name__ == '__main__':
    app.run(debug=True)
