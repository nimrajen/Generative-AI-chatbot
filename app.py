import os
import constants
from langchain.agents import create_csv_agent
from langchain.llms import OpenAI
from flask import Flask, jsonify, request
from flask_cors import CORS

app= Flask(__name__)
CORS(app)
os.environ["OPENAI_API_KEY"] = constants.API_KEY

file_path="ml_project1_data.csv"

@app.route('/predict', methods=['POST'])
def predict():
    
    agent =  create_csv_agent(OpenAI(api_key=constants.API_KEY, temperature=0), file_path, verbose=True)
    print(agent.agent.llm_chain.prompt.template)

    question = request.form['question']
    result = agent.run(question)

    return jsonify({"result": result})

if __name__ == '__main__':
  app.run(debug=True)
