import pygame
import sys
import numpy as np

# Initialize pygame
pygame.init()

# Define constants
WIDTH, HEIGHT = 600, 400
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
BLUE = (0, 0, 255)
RED = (255, 0, 0)

# Set up the screen
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption('Coloring Book Game')

# Load the coloring page image (make sure the image is black-and-white)
coloring_image = pygame.image.load('/Users/riyasachdeva/Downloads/digipost_web/scripts/4fdb8401-96d8-41dc-9a34-021c3d86f93a.JPG')  # Use your image path here
coloring_image = pygame.transform.scale(coloring_image, (WIDTH, HEIGHT))

# Convert to a surface with the color transparency, and create an image copy
image_surface = pygame.Surface((WIDTH, HEIGHT), pygame.SRCALPHA)
image_surface.blit(coloring_image, (0, 0))

# Define a simple color palette
colors = [BLACK, BLUE, RED]
current_color = BLUE

# Create a flood-fill function
def flood_fill(surface, start_pos, fill_color):
    x, y = start_pos
    # Get the color of the clicked pixel
    target_color = surface.get_at((x, y))
    
    # If the target color is the same as the fill color, do nothing
    if target_color == fill_color:
        return

    # Use a queue to perform the flood fill (BFS approach)
    queue = [(x, y)]
    visited = set()

    while queue:
        cx, cy = queue.pop()
        if (cx, cy) in visited:
            continue
        visited.add((cx, cy))

        # If the pixel is not the target color, skip
        if surface.get_at((cx, cy))[:3] != target_color[:3]:
            continue

        # Set the pixel to the fill color
        surface.set_at((cx, cy), fill_color)

        # Add neighboring pixels to the queue
        if cx > 0:
            queue.append((cx - 1, cy))
        if cx < WIDTH - 1:
            queue.append((cx + 1, cy))
        if cy > 0:
            queue.append((cx, cy - 1))
        if cy < HEIGHT - 1:
            queue.append((cx, cy + 1))

# Main game loop
running = True
while running:
    screen.fill(WHITE)
    
    # Draw the coloring page image on the screen
    screen.blit(image_surface, (0, 0))

    # Handle events
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.MOUSEBUTTONDOWN:
            if event.button == 1:  # Left click to color
                # Get the mouse position and start flood fill
                mouse_pos = pygame.mouse.get_pos()
                flood_fill(image_surface, mouse_pos, current_color)
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_c:  # Press 'C' to cycle colors
                current_color = colors[(colors.index(current_color) + 1) % len(colors)]

    pygame.display.flip()

# Quit pygame
pygame.quit()
sys.exit()
