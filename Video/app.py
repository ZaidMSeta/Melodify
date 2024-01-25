from flask import Flask, render_template, request, jsonify
from uuid import uuid4
from recognition import FaceRecognition

app = Flask(__name__)
fr = FaceRecognition()

@app.get("/")
def home():
  return render_template("index.html")

@app.post("/api/recognition")
def recognition():
  video = request.files["video"]
  filename = f"tmp/{uuid4()}.webm"
  video.save(filename)
  name = fr.run_recognition(filename)
  if (len(name) > 0):
    return jsonify({"name": name})
  return jsonify({"name": "No face detected"})

if __name__ == "__main__":
  app.run(debug=True)