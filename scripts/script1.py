import cv2 as cv
import numpy as np
import time

# List of question sets to cycle through
QUESTION_SETS = [
    ("Cycling", "Car Driving"),
    ("Air Conditioning", "Fan"),
    ("Electric Car", "Petrol Car"),
    ("Public Transport", "Private Car"),
    ("Walk", "Use of Elevator")
]

class SustainablePracticesGame:
    def __init__(self):
        # 0 for webcam feed
        self.capture = cv.VideoCapture(0)
        
        # Load Haar Cascade Classifiers
        self.face_cascade = cv.CascadeClassifier('./haarcascade_frontalface_default.xml')
        self.eye_cascade = cv.CascadeClassifier("./haarcascade_eye.xml")
        
        # Game state variables
        self.current_question_index = 0
        self.user_choices = []
        self.current_choice = None
        self.choice_made = False
        self.choice_timestamp = None

    def detect_head_tilt(self, frame):
        gray = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)
        faces = self.face_cascade.detectMultiScale(gray, 1.1, 5)
        
        for (x, y, w, h) in faces:
            # Draw face rectangle
            cv.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
            cv.circle(frame, (x + int(w * 0.5), y + int(h * 0.5)), 4, (0, 255, 0), -1)
            
            # Detect eyes in the face region
            eyes = self.eye_cascade.detectMultiScale(gray[y:(y + h), x:(x + w)], 1.1, 4)
            
            if len(eyes) >= 2:
                # Sort eyes from left to right
                eyes_sorted = sorted(eyes, key=lambda eye: eye[0])
                
                left_eye = eyes_sorted[0]
                right_eye = eyes_sorted[1]
                
                # Calculate eye centers
                left_eye_center = (
                    int(left_eye[0] + (left_eye[2] / 2)),
                    int(left_eye[1] + (left_eye[3] / 2))
                )
                right_eye_center = (
                    int(right_eye[0] + (right_eye[2] / 2)),
                    int(right_eye[1] + (right_eye[3] / 2))
                )
                
                # Calculate angle
                delta_x = right_eye_center[0] - left_eye_center[0]
                delta_y = right_eye_center[1] - left_eye_center[1]
                
                angle = np.arctan2(delta_y, delta_x) * 180 / np.pi
                
                return angle
        
        return 0

    def display_current_question(self, frame):
        # Get current question set
        option1, option2 = QUESTION_SETS[self.current_question_index]
        
        # Display question in the center of the screen
        cv.putText(frame, f'{option1} vs {option2}', 
                   (frame.shape[1] // 2 - 200, 200),
                   cv.FONT_HERSHEY_SIMPLEX, 1.5, (0, 255, 0), 3, cv.LINE_4)
        
        # Left Option 
        cv.putText(frame, option1, (50, frame.shape[0] // 2 + 150), 
                   cv.FONT_HERSHEY_SIMPLEX, 3, (255, 0, 0), 8, cv.LINE_4)
        
        # Right Option 
        cv.putText(frame, option2, (frame.shape[1] - 450, frame.shape[0] // 2 + 150), 
                   cv.FONT_HERSHEY_SIMPLEX, 3, (255, 0, 0), 8, cv.LINE_4)

    def run(self):
        while True:
            ret, frame = self.capture.read()
            
            # Flip the frame horizontally for a more user-friendly experience (like a mirror)
            frame = cv.flip(frame, 1)
            
            # Detect head tilt
            angle = self.detect_head_tilt(frame)
            
            # Display current question
            self.display_current_question(frame)
            
            # If a choice has already been made, wait before moving to next question
            if self.choice_made:
                current_time = time.time()
                if current_time - self.choice_timestamp > 2:  # 2 seconds delay
                    self.current_question_index += 1
                    self.choice_made = False
                    self.current_choice = None
                    
                    # End game if all questions are answered
                    if self.current_question_index >= len(QUESTION_SETS):
                        print("Game Completed! Choices:", self.user_choices)
                        break
            
            # Detect choice based on head tilt if no choice has been made
            if not self.choice_made:
                if angle < -10:
                    # Right tilt
                    choice = QUESTION_SETS[self.current_question_index][1]
                    cv.putText(frame, f'Chose: {choice}', (20, 60), 
                               cv.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 0), 2, cv.LINE_4)
                    self.user_choices.append(choice)
                    self.choice_made = True
                    self.choice_timestamp = time.time()

                elif angle > 10:
                    # Left tilt
                    choice = QUESTION_SETS[self.current_question_index][0]
                    cv.putText(frame, f'Chose: {choice}', (20, 60), 
                               cv.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 0), 2, cv.LINE_4)
                    
                    self.user_choices.append(choice)
                    self.choice_made = True
                    self.choice_timestamp = time.time()
            
            # Display the frame
            cv.imshow('Sustainable Practices Game', frame)
            
            # Exit on ESC key
            if cv.waitKey(1) & 0xFF == 27:
                break
        
        # Clean up
        self.capture.release()
        cv.destroyAllWindows()

# Run the game
if __name__ == "__main__":
    game = SustainablePracticesGame()
    game.run()