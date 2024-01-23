import single_motion_detector
from imutils.video import VideoStream
from flask import Response
from flask import Flask
from flask import render_template
import threading
import argparse
import datetime
import imutils
import time
import cv2 as cv

outputFrame = None
lock = threading.Lock()

app = Flask(__name__)

vs = VideoStream(src=0).start()
time.sleep(2.0)

@app.route("/")
def index():
    return render_template("index.html")

def detect_motion(frameCount):
    global vs, outputFrame, lock

    md = single_motion_detector(accumWeight=0.1)
    total =  0

    while True:
        frame = vs.read()
        frame = imutils.resize(frame, width= 400)
        gray = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)
        gray = cv.GaussianBlur(gray, (7, 7), 0)

        timestamp = datetime.datetime.now()
        cv.putText(frame, timestamp.strftime("%A %d %B %Y %I:%M:%S%p"), (10, frame.shape[0] -10), cv.FONT_HERSHEY_SIMPLEX, 0.35, (0, 0, 255), 1)

        if total > frameCount:
            motion = md.detect(gray)

            if motion is not None:
                (thresh, (minX, minY, maxX, maxY)) = motion
                cv.rectangle(frame, (minX, minY), (maxX, maxY), (0, 0, 255), 2 )

            md.update(gray)
            total += 1

            with lock:
                outputFrame = frame.copy()

def generate():
    global outputFrame, lock

    while True:
        with lock:
            if outputFrame is None:
                continue

            (flag, encodedImage) = cv.imencode(".jpg", outputFrame)

            if not flag:
                continue


        yield(b"--frame\r\n"b"Content-Type: image/jpeg\r\n\r\n" + bytearray(encodedImage) + b'\r\n')


@app.route("/video_feed")
def video_feed():
    return Response(generate(), mimetype = "multipart/x-mixed-replace; boundary=frame")

if __name__=='__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument("-i", "--ip", type=str, required=True, help = "ip address of the device")
    ap.add_argument("-o", "--port", type=int, required=True, help = "ephemeral port number of the server (1024, 65535)")
    ap.add_argument("-f", "--frame-count", type=int, default = 32, help = "# of frames used to construct the background model")
    args = vars(ap.parse_args())

    t = threading.Thread(target=detect_motion, args= (args["frame_count"],))
    t.daemon = True
    t.start()

    app.run(host=args["ip"], port=args["port"], debug=True, threaded=True, use_reloader=False)

    vs.stop()