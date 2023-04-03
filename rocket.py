import pygame
import random

# initialize Pygame
pygame.init()

# set up the display
screen_width = 600
screen_height = 800
screen = pygame.display.set_mode((screen_width, screen_height))
pygame.display.set_caption("Rocket Launch Game")

# load images
rocket_img = pygame.image.load("rocket.png")
background_img = pygame.image.load("background.png")

# define rocket class
class Rocket(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = rocket_img
        self.rect = self.image.get_rect()
        self.rect.center = (screen_width / 2, screen_height - 100)
        self.speed = 5
        self.direction = 0

    def update(self):
        self.rect.move_ip(self.direction * self.speed, 0)
        if self.rect.left < 0:
            self.rect.left = 0
        elif self.rect.right > screen_width:
            self.rect.right = screen_width

    def launch(self):
        self.speed = 0
        self.direction = 0
        self.rect.top -= 10

    def reset(self):
        self.speed = 5
        self.rect.center = (screen_width / 2, screen_height - 100)

# define asteroid class
class Asteroid(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((50, 50))
        self.image.fill((255, 0, 0))
        self.rect = self.image.get_rect()
        self.rect.center = (random.randint(0, screen_width), -50)
        self.speed = random.randint(3, 8)

    def update(self):
        self.rect.move_ip(0, self.speed)
        if self.rect.top > screen_height:
            self.kill()

# create sprite groups
all_sprites = pygame.sprite.Group()
asteroid_sprites = pygame.sprite.Group()

# create player
player = Rocket()
all_sprites.add(player)

# set up game clock
clock = pygame.time.Clock()

# set up game variables
game_over = False
score = 0

# main game loop
while not game_over:
    # handle events
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            game_over = True
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT:
                player.direction = -1
            elif event.key == pygame.K_RIGHT:
                player.direction = 1
            elif event.key == pygame.K_SPACE:
                player.launch()

    # spawn asteroids
    if random.randint(1, 100) == 1:
        asteroid = Asteroid()
        all_sprites.add(asteroid)
        asteroid_sprites.add(asteroid)

    # update sprites
    all_sprites.update()

    # check for collisions
    if pygame.sprite.spritecollide(player, asteroid_sprites, False):
        game_over = True

    # draw screen
    screen.blit(background_img, (0, 0))
    all_sprites.draw(screen)
    pygame.display.flip()

    # update game clock
    clock.tick(60)

    # update score
    score += 1

# end game
font = pygame.font.Font(None, 50)
text = font.render("Game Over", True, (255, 255, 255))
text_rect = text.get_rect(center=(screen_width / 2, screen_height / 2))
screen.blit(text, text_rect)
pygame.display.flip()

pygame.time.delay(2000)

# clean up
pygame.quit()