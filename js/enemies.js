// js/enemies.js - Enemy-related functionality
class Enemies {
  constructor(scene) {
      this.scene = scene;
      this.group = scene.physics.add.group();
      
      // Create enemy animation once
      this.scene.anims.create({
          key: 'enemy-move',
          frames: [ { key: 'enemy' } ],
          frameRate: 10,
          repeat: -1
      });
  }
  
  createEnemy(x, y, patrolDistance = 200) {
      const enemy = this.group.create(x, y, 'enemy');
      enemy.setBounce(0);
      enemy.setCollideWorldBounds(true);
      
      // Set up patrol behavior
      enemy.patrolStartX = x;
      enemy.patrolDistance = patrolDistance;
      enemy.patrolVelocity = 100;
      enemy.body.velocity.x = enemy.patrolVelocity;
      
      // Play the animation
      enemy.anims.play('enemy-move', true);
      
      return enemy;
  }
  
  // Create enemies at specified positions
  createEnemies(positions) {
      positions.forEach(pos => {
          this.createEnemy(pos.x, pos.y, pos.patrolDistance || 200);
      });
  }
  
  // Update enemy movement
  update() {
      this.group.getChildren().forEach(enemy => {
          const distanceMoved = Math.abs(enemy.x - enemy.patrolStartX);
          
          if (distanceMoved >= enemy.patrolDistance) {
              // Change direction
              enemy.body.velocity.x = -enemy.body.velocity.x;
              
              // Update sprite direction
              enemy.flipX = enemy.body.velocity.x > 0;
          }
      });
  }
  
  // Setup collision with player
  setupCollision(player) {
      this.scene.physics.add.collider(player.sprite, this.group, (playerSprite, enemy) => {
          // Check if player is rolling or jumping on enemy
          if (player.isRolling || (player.sprite.body.velocity.y > 0 && player.sprite.y < enemy.y - 20)) {
              // Destroy enemy
              enemy.disableBody(true, true);
          } else {
              // Player gets hit
              const isDead = player.getHit();
              
              if (isDead) {
                  // Game over
                  this.scene.time.delayedCall(1000, () => {
                      this.scene.scene.restart();
                  });
              }
          }
      }, null, this);
  }
}
