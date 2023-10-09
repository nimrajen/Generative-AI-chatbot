import os
import sys
import langchain
import constants
from langchain.document_loaders.csv_loader import CSVLoader
from langchain.chains import RetrievalQA
from langchain.indexes import VectorstoreIndexCreator
from langchain.llms import OpenAI
from langchain.chat_models import ChatOpenAI
from langchain.agents import create_csv_agent


os.environ["OPENAI_API_KEY"] = constants.API_KEY

file_path="ml_project1_data.csv"
llm = OpenAI(temperature=0)
agent =  create_csv_agent(llm, file_path, verbose=True)

agent.run("How many customers are married?")
agent.run("What is the average age group of customers?")
agent.run("What is the ratio of non vegetarians to vegetarians?")
