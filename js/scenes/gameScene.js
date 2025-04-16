// js/scenes/gameScene.js - Main game scene
class GameScene extends Phaser.Scene {
  constructor() {
      super({ key: 'GameScene' });
  }
  
  preload() {
      // Preload background music
      this.load.audio('music', './assets/music.mp3');
      this.load.audio('jump', './assets/jump.mp3');
      this.load.audio('collect', './assets/collect.mp3');
  }
  
  create() {
      // Create level
      this.level = new Level(this, 'level1');
      
      // Create player at starting position
      this.player = new Player(this, 100, 450);
      
      // Set up collision between player and level
      this.level.setupCollision(this.player);
      
      // Create collectibles
      this.collectibles = new Collectibles(this);
      
      // Get platform positions to place rings
      const platforms = this.level.getPlatformPositions();
      platforms.forEach(platform => {
          this.collectibles.generateRingsOnPlatform(platform.startX, platform.endX, platform.y);
      });
      
      // Add some ring circles for variety
      this.collectibles.createRingCircle(400, 250, 50, 8);
      this.collectibles.createRingCircle(900, 150, 70, 10);
      
      // Set up collision between player and collectibles
      this.collectibles.setupCollision(this.player);
      
      // Create enemies
      this.enemies = new Enemies(this);
      this.enemies.createEnemies([
          { x: 300, y: 350, patrolDistance: 150 },
          { x: 600, y: 250, patrolDistance: 200 },
          { x: 1000, y: 200, patrolDistance: 150 },
          { x: 1300, y: 300, patrolDistance: 100 }
      ]);
      
      // Set up collision between player and enemies
      this.enemies.setupCollision(this.player);
      
      // Set up collision between enemies and platforms
      this.physics.add.collider(this.enemies.group, this.level.platforms);
      
      // Create UI
      this.ui = new UI(this);
      this.ui.create();
      
      // Listen for ring collection events
      this.events.on('ringCollected', (count) => {
          this.ui.updateRingCount(count);
      });
      
      // Start background music (after loading it in preload)
      this.sound.play('music', {
          loop: true,
          volume: 0.5
      });
  }
  
  update() {
      // Update player
      this.player.update();
      
      // Update enemies
      this.enemies.update();
      
      // Check for level completion (player reaches the end)
      if (this.player.sprite.x > gameConfig.width * 2 - 100) {
          this.ui.showMessage('Level Complete!', 3000);
          
          // Pause physics and player input
          this.physics.pause();
          
          // Restart the game after a delay
          this.time.delayedCall(4000, () => {
              this.scene.start('TitleScene');
          });
      }
  }
}
