// js/player.js - Player-related functionality
class Player {
  constructor(scene, x, y) {
      this.scene = scene;
      
      // Create the player sprite
      this.sprite = scene.physics.add.sprite(x, y, 'player');
      this.sprite.setBounce(0.1);
      this.sprite.setCollideWorldBounds(true);
      
      // Set up player properties
      this.speed = 300;
      this.jumpVelocity = -600;
      this.rings = 0;
      
      // Player states
      this.isJumping = false;
      this.isRolling = false;
      
      // Create animations
      this.createAnimations();
      
      // Set up input
      this.cursors = scene.input.keyboard.createCursorKeys();
      
      // Add support for WASD keys
      this.wasd = {
          up: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
          left: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
          down: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
          right: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      };
  }
  
  createAnimations() {
      // Idle animation
      if (!this.scene.anims.exists('idle')) {
          this.scene.anims.create({
              key: 'idle',
              frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 0 }),
              frameRate: 10,
              repeat: -1
          });
      }
      
      // Run animation
      if (!this.scene.anims.exists('run')) {
          this.scene.anims.create({
              key: 'run',
              frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 0 }),
              frameRate: 10,
              repeat: -1
          });
      }
      
      // Jump animation
      if (!this.scene.anims.exists('jump')) {
          this.scene.anims.create({
              key: 'jump',
              frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 0 }),
              frameRate: 10,
              repeat: 0
          });
      }
      
      // Roll animation
      if (!this.scene.anims.exists('roll')) {
          this.scene.anims.create({
              key: 'roll',
              frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 0 }),
              frameRate: 10,
              repeat: -1
          });
      }
  }
  
  update() {
      // Check if player is on the ground
      const onGround = this.sprite.body.blocked.down;
      
      // Reset jumping state if on ground
      if (onGround) {
          this.isJumping = false;
      }
      
      // Handle left/right movement
      if (this.cursors.left.isDown || this.wasd.left.isDown) {
          this.sprite.setVelocityX(-this.speed);
          if (!this.isRolling) {
              this.playAnimation('run');
          }
          this.sprite.flipX = true;
      } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
          this.sprite.setVelocityX(this.speed);
          if (!this.isRolling) {
              this.playAnimation('run');
          }
          this.sprite.flipX = false;
      } else {
          this.sprite.setVelocityX(0);
          if (!this.isJumping && !this.isRolling) {
              this.playAnimation('idle');
          }
      }
      
      // Handle jumping
      if ((this.cursors.up.isDown || this.wasd.up.isDown) && onGround) {
          this.sprite.setVelocityY(this.jumpVelocity);
          this.isJumping = true;
          this.playAnimation('jump');
        //   this.scene.sound.play('jump');
      }
      
      // Handle rolling
      if ((this.cursors.down.isDown || this.wasd.down.isDown) && onGround) {
          if (!this.isRolling) {
              this.isRolling = true;
              this.playAnimation('roll');
              // Add a slight boost when starting a roll
              const direction = this.sprite.flipX ? -1 : 1;
              this.sprite.setVelocityX(direction * (this.speed * 1.2));
              
              // Stop rolling after a short time
              this.scene.time.delayedCall(500, () => {
                  this.isRolling = false;
              });
          }
      }
      
      // Update camera to follow player
      this.scene.cameras.main.startFollow(this.sprite, true, 0.08, 0.08);
  }
  
  // Safely play animation, handling any errors for placeholder assets
  playAnimation(key, ignoreIfPlaying = true) {
      try {
          if (this.sprite.anims) {
              this.sprite.anims.play(key, ignoreIfPlaying);
          }
      } catch (error) {
          console.log(`Using static image instead of ${key} animation`);
      }
  }
  
  collectRing() {
      this.rings++;
      return this.rings;
  }
  
  getHit() {
      if (this.rings > 0) {
          // Lose rings instead of dying
          this.rings = 0;
          this.sprite.setTint(0xff0000);
          
          // Flash the player and make temporarily invulnerable
          this.scene.time.delayedCall(100, () => {
              this.sprite.clearTint();
          });
          
          return false; // Not dead
      } else {
          // Player dies
          this.sprite.setTint(0xff0000);
          if (this.sprite.anims) {
              try {
                  this.sprite.anims.stop();
              } catch (error) {
                  console.log('Error stopping animations');
              }
          }
          this.sprite.setVelocity(0);
          
          // Disable player controls
          this.scene.physics.pause();
          
          return true; // Dead
      }
  }
}