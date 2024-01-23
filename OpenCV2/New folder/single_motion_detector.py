import numpy as np
import imutils
import cv2 as cv

class SingleMotionDetector:
    def __init__(self, accumWeight=0.5):
        self.accumWeight =accumWeight

        self.bg = None

    def update(self, image):
        if self.bg is None:
            self.bg = image.copy().astype("float")

        cv.accumulateWeighted(image, self.bg, self.accumWeight)

    def detect(self, image, tVal=25):
        delta = cv.absdiff(self.bg.astype("uint8"), image)
        thresh = cv.threshold(delta, tVal, 255, cv.THRESH_BINARY)[1]

        thresh = cv.erode(thresh, None, iterations=2)
        thresh = cv.dilate(thresh, None, iterations=2)

        cnts = cv.findContours(thresh.copy(), cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
        cnts = imutils.grab_contours(cnts)
        (minX, minY) = (np.inf, np.inf)
        (maxX, maxY) = (-np.inf, -np.inf)

        if len(cnts) == 0:
            return None

        for c in cnts:
            (x, y, w, h) = cv.boundingRect(c)
            (minX, minY) = (min(minX, x), min(minY, y))
            (maxX, maxY) = (max(maxX, x + w), max(maxY, y + h))

        return (thresh, (minX, minY, maxX, maxY))