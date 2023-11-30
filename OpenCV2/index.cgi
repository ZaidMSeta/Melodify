#!/Python26/python
print ('Content-type: text/html\r\n\r')

import face_recognition as faceRegLib
import os, sys
import cv2 as cv
import numpy as np
import math

face_classifier = cv.CascadeClassifier(cv.data.haarcascades + "haarcascade_frontalface_default.xml")


def face_confidence(face_distance, face_match_threshold=0.6):
    range = (1 - face_match_threshold)
    linear_val = (1 - face_distance) / (range * 2.0)

    if face_distance > face_match_threshold:
        return str(round(linear_val * 100, 2)) + '%'
    else:
        value = (linear_val +((1.0 - linear_val) * math.pow((linear_val - 0.5) * 2, 0.2))) * 100
        return str(round(value, 2)) + '%'
    
class FaceRecognition:
    face_locations = []
    face_encodings = []
    face_names = []
    known_face_encodings = []
    known_face_names = []
    process_current_frame = True
    

    def __init__(self):
        self.encode_faces()

    def encode_faces(self):
        x=0
        for image in os.listdir(r'Faces\\'):
            x+=1
            print("NUMBER OF PHOTOS: ", x)
            face_image = faceRegLib.load_image_file(f'Faces\\{image}')
            try:
                face_encoding = faceRegLib.face_encodings(face_image)[0]
            except IndexError as e:
                print(e)
                sys.exit(1)


            self.known_face_encodings.append(face_encoding)
            self.known_face_names.append(image)
        print(self.known_face_names)


    def run_recognition(self):
        video_capture = cv.VideoCapture(0)

        if not video_capture.isOpened():
            sys.exit('Video source not found...')

        while True:
            ret, frame = video_capture.read()
            ret, saved_image = video_capture.read()
            
            if self.process_current_frame:
                small_frame = cv.resize(frame,(0, 0), fx=0.25, fy=0.25)
                rgb_small_frame = np.ascontiguousarray(small_frame[:, :, ::-1])

                self.face_locations = faceRegLib.face_locations(rgb_small_frame)
                self.face_encodings = faceRegLib.face_encodings(rgb_small_frame, self.face_locations)

                self.face_names = []
                runcount=1
                for face_encoding in self.face_encodings:
                    runcount+=1
                    matches = faceRegLib.compare_faces(self.known_face_encodings, face_encoding)
                    name = "Unknown"
                    confidence = "Unknown"

                    face_distances = faceRegLib.face_distance(self.known_face_encodings, face_encoding)
                    best_match_index = np.argmin(face_distances)

                    if matches[best_match_index]:
                        name = self.known_face_names[best_match_index]
                        confidence = face_confidence(face_distances[best_match_index])
                        save_name = name

                    self.face_names.append(f"{name} ({confidence})")
                    

            self.process_current_frames = not self.process_current_frame

            # display annotations
            for (top, right, bottom, left), name in zip(self.face_locations, self.face_names):
                top *=4
                right *=4
                bottom *=4
                left *=4

                cv.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)
                cv.rectangle(frame, (left, bottom - 35), (right, bottom), (0, 0, 255), -1)
                cv.putText(frame, name, (left +6, bottom - 6), cv.FONT_HERSHEY_DUPLEX, 0.8, (255,255,255), 1)
                #roi_color = frame[right:right + left, top:top + bottom]
            path = 'C:/Users/jacob/Documents/OpenCV2/Faces'
            print("[INFO] Object found. Saving locally.")
            cv.imwrite(os.path.join(path, 'extracted_' + str(top) + '_' + save_name), saved_image)
            
            
            cv.imshow("Face Recognition", frame)

            if cv.waitKey(1) == ord('q'):
                break
                
            #video_capture.release()
            #print("--------------------------------KILL WINDOWS")
            #cv.destroyAllWindows()
            
#gray_image = cv.cvtColor(vid, cv.COLOR_BGR2GRAY)
#faces = face_classifier.detectMultiScale(gray_image, 1.1, 5, minSize=(40,40))


if __name__ == '__main__':
    fr = FaceRecognition()
    fr.run_recognition()