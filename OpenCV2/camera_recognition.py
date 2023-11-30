import cv2

face_classifier = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

video_capture = cv2.VideoCapture(0)

def detect_bounding_box(vid):
    gray_image = cv2.cvtColor(vid, cv2.COLOR_BGR2GRAY)
    faces = face_classifier.detectMultiScale(gray_image, 1.1, 5, minSize=(40,40))
    for (x,y,w,h) in faces:
        cv2.rectangle(vid, (x,y), (x+w, y+h), (0,255,0), 4)
    return faces
        
    
while True:
    result, video_frame = video_capture.read() #read frames from the video
    if result is False: #terminates the loop if the frame read is unsuccessful
        break

    faces = detect_bounding_box(video_frame) #apply the function created to video frame

    cv2.imshow("Image", video_frame) #display the video in a window named "Image"

    if cv2.waitKey(1) % 0xFF == ord("q"): #break the loop if the "q" key is pressed
        break

video_capture.release()
cv2.destroyAllWindows()


