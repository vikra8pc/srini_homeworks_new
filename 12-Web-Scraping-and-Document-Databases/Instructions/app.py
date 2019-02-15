from flask import Flask, render_template, redirect
import pymongo

app = Flask(__name__)

# setup mongo connection
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

# connect to mongo db and collection
db = client.vikas
collection = db.Personal

# Set route
@app.route('/')
def index():
    # Store the entire team collection in a list
    mars = list(db.Personal.find())
    print(mars)

    # Return the template with the teams list passed in
    return render_template('index.html', mars=mars)


if __name__ == "__main__":
    app.run(debug=True)


