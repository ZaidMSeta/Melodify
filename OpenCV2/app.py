from flask import Flask, render_template, Response
 
app = Flask(__name__)

 
@app.route("/")
def index():
    return render_template("index(2).html")

@app.route('/homepage/')
def my_link():
    return render_template("homepage.html")

@app.route('/capture/')
def capture():
    return render_template("capture.html")

@app.route('/storage/')
def storage():
    return render_template("storage.html")


if __name__ == "__main__":
    app.run(port=5000, debug=True)