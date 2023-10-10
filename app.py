import os
from dotenv import load_dotenv
from langchain.agents import create_csv_agent
from langchain.llms import OpenAI
from flask import Flask, jsonify, request
from flask_cors import CORS

load_dotenv()

app= Flask(__name__)
CORS(app)
os.environ["OPENAI_API_KEY"] = os.getenv('API_KEY')

file_path="ml_project1_data.csv"

@app.route('/predict', methods=['POST'])
def predict():
    
    agent =  create_csv_agent(OpenAI(temperature=0), file_path, verbose=True)
    print(agent.agent.llm_chain.prompt.template)

    question = request.form['question']
    result = agent.run(question)

    return jsonify({"result": result})

if __name__ == '__main__':
  app.run(debug=True)
