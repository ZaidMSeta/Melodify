import os
import cv2 as cv
import numpy as np

people = ['Jacob', 'Hiep', 'Rilett', 'ZaidS', 'ZaidA', 'Dawan']

#p = []

#for i in os.listdir(r'C:\Users\jacob\Documents\OpenCV2\Recognition Training'):
    #p.append(i)

#print(p)

DIR = r'C:\Users\jacob\Documents\OpenCV2\Faces'

haar_cascade = cv.CascadeClassifier(cv.data.haarcascades + 'haarcascade_frontalface_default.xml')

features = []
labels = []

def create_train():
    for person in people:
        path = os.path.join(DIR, person)
        label = people.index(person)

        for img in os.listdir(path):
            img_path = os.path.join(path, img)

            img_array = cv.imread(img_path)
            gray = cv.cvtColor(img_array, cv.COLOR_BGR2GRAY)

            faces_rect = haar_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=4)

            for (x,y,w,h) in faces_rect:
                faces_roi = gray[y:y+h, x:x+w]
                features.append(faces_roi)
                labels.append(label)

create_train()
print('Training done--------------------')

features = np.array(features, dtype='object')
labels = np.array(labels)

#print(f'length of the features = {len(features)}')
#print(f'length of the labels = {len(labels)}')

face_recognizer = cv.face.LBPHFaceRecognizer_create()

#train the recognizer on the features list and the labels
face_recognizer.train(features,labels)

face_recognizer.save('face_trained.yml')

np.save('features.npy', features)
np.save('labels.npy', labels)

 