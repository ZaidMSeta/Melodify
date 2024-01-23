import numpy as np
import cv2 as cv
import os

haar_cascade = cv.CascadeClassifier(cv.data.haarcascades + 'haarcascade_frontalface_default.xml')

people = ['Jacob', 'Hiep', 'Rilett', 'ZaidS', 'ZaidA', 'Dawan']
#features = np.load('features.npy')
#labels = np.load('labels.npy')

face_recognizer = cv.face.LBPHFaceRecognizer.create()
face_recognizer.read('face_trained.yml')

img = cv.imread(r'C:/Users/jacob/Documents/OpenCV2/webcam_photo.png')

gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
cv.imshow('Person', gray)

#detect the face in the image
faces_rect = haar_cascade.detectMultiScale(gray, 1.1, 4)
for (x,y,w,h) in faces_rect:
    faces_roi = gray[y:y+h,x:x+h]

    labels, confidence = face_recognizer.predict(faces_roi)
    print(f'Label = {people[labels]} with a confidence of {confidence}')

    cv.putText(img, str(people[labels]), (20,20), cv.FONT_HERSHEY_COMPLEX, 1.0, (0,255,0), thickness=2)
    cv.rectangle(img, (x,y), (x+w,y+h), (0,255,0), thickness=2)

cv.imshow('Detected Face', img)
print (people[labels])
stored_name = people[labels]
#os.remove('webcam_photo.png')

cv.waitKey(0)


'''
Code can read face from image, delete image after reading. Saving who it detects as a variable and passing it should'nt be to hard,
Now just have to make a web based program that takes a picture and passes it to this folder.
'''