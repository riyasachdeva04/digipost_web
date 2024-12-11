import pygame
import random
import sys
import os

# Initialize Pygame
pygame.init()

# Screen dimensions
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600
SCREEN = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Biodegradable Items Collection Game")

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

# Game variables
PLAYER_WIDTH = 100
PLAYER_HEIGHT = 150
ITEM_SIZE = 80
PLAYER_SPEED = 5
ITEM_SPEED = 3

# Load images
def load_images(folder_path):
    images = []
    for filename in os.listdir(folder_path):
        if filename.endswith((".png", ".jpg", ".jpeg")):
            img = pygame.image.load(os.path.join(folder_path, filename))
            img = pygame.transform.scale(img, (ITEM_SIZE, ITEM_SIZE))
            images.append((img, filename))  # Store both image and its filename
    return images

biodegradable_images = load_images("scripts/biodegradable")
non_biodegradable_images = load_images("scripts/non-biodegradable")

# Load player image
player_image = pygame.image.load("scripts/dustbin.png")
player_image = pygame.transform.scale(player_image, (PLAYER_WIDTH, PLAYER_HEIGHT))
wallpaper = pygame.image.load("scripts/wallpaper.jpg")
wallpaper = pygame.transform.scale(wallpaper, (SCREEN_WIDTH, SCREEN_HEIGHT))

class Player:
    def __init__(self):
        self.image = player_image
        self.rect = self.image.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT - PLAYER_HEIGHT // 2 - 10))
        self.score = 0
        self.lives = 3

    def move(self, dx):
        self.rect.x += dx
        self.rect.x = max(0, min(self.rect.x, SCREEN_WIDTH - self.rect.width))
    
    def move2(self, dy):
        self.rect.y += dy
        self.rect.y = max(0, min(self.rect.y, SCREEN_HEIGHT - self.rect.height))
    
    def draw(self):
        SCREEN.blit(self.image, self.rect)

class Item:
    def __init__(self, is_biodegradable):
        self.is_biodegradable = is_biodegradable
        self.image, self.filename = random.choice(
            biodegradable_images if is_biodegradable else non_biodegradable_images
        )
        self.rect = self.image.get_rect(topleft=(random.randint(0, SCREEN_WIDTH - ITEM_SIZE), -ITEM_SIZE))
    
    def fall(self):
        self.rect.y += ITEM_SPEED

    def draw(self):
        SCREEN.blit(self.image, self.rect)

def main():
    player = Player()
    items = []
    font = pygame.font.Font(None, 36)
    clock = pygame.time.Clock()
    spawn_timer = 0
    running = True

    # Flash message variables
    flash_message = ""
    flash_timer = 0
    flash_position = (0, 0)

    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:
            player.move(-PLAYER_SPEED)
        if keys[pygame.K_RIGHT]:
            player.move(PLAYER_SPEED)
        if keys[pygame.K_UP]:
            player.move2(-PLAYER_SPEED)
        if keys[pygame.K_DOWN]:
            player.move2(PLAYER_SPEED)

        spawn_timer += 1
        if spawn_timer > 60:
            is_biodegradable = random.choice([True, False])
            items.append(Item(is_biodegradable))
            spawn_timer = 0

        for item in items[:]:
            item.fall()
            if player.rect.colliderect(item.rect):
                flash_message = f"Touched: {item.filename.split('.')[0]}"
                flash_timer = 60  # Display for 1 second (60 frames)
                flash_position = (item.rect.x, item.rect.y)  # Set flash position to item's position
                if item.is_biodegradable:
                    player.score += 10
                else:
                    player.lives -= 1
                items.remove(item)
            elif item.rect.top > SCREEN_HEIGHT:
                flash_message = f"Missed: {item.filename.split('.')[0]}"
                flash_timer = 60  # Display for 1 second (60 frames)
                flash_position = (item.rect.x, SCREEN_HEIGHT - ITEM_SIZE)  # Position at bottom where it disappears
                if item.is_biodegradable:
                    player.lives -= 1
                items.remove(item)

            if player.lives <= 0:
                running = False

        SCREEN.blit(wallpaper, (0, 0))
        player.draw()
        for item in items:
            item.draw()

        # Display flash message near the item's position
        if flash_timer > 0:
            flash_text = font.render(flash_message, True, BLACK)
            flash_rect = flash_text.get_rect(center=(flash_position[0] + ITEM_SIZE // 2, 
                                                     flash_position[1] - 20))  # Above the item
            SCREEN.blit(flash_text, flash_rect)
            flash_timer -= 1

        # Draw score and lives
        score_text = font.render(f"Score: {player.score}", True, BLACK)
        lives_text = font.render(f"Lives: {player.lives}", True, BLACK)
        SCREEN.blit(score_text, (10, 10))
        SCREEN.blit(lives_text, (10, 50))

        pygame.display.flip()
        clock.tick(60)

    SCREEN.blit(wallpaper, (0, 0))

    game_over_text = font.render(f"Game Over! Score: {player.score}", True, BLACK)
    SCREEN.blit(game_over_text, game_over_text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2)))
    pygame.display.flip()
    pygame.time.wait(2000)
    pygame.quit()
    sys.exit()

if __name__ == "__main__":
    main()
