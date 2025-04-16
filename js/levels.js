// js/levels.js - Level creation and management
class Level {
  constructor(scene, levelKey) {
      this.scene = scene;
      this.levelKey = levelKey;
      
      // Create the level
      this.createLevel();
  }
  
  createLevel() {
      // Add background
      this.scene.add.image(0, 0, 'sky').setOrigin(0, 0);
      
      // If using real tilemap data
      if (this.scene.cache.tilemap.exists(this.levelKey)) {
          const map = this.scene.make.tilemap({ key: this.levelKey });
          const tileset = map.addTilesetImage('tiles');
          this.platforms = map.createLayer(0, tileset, 0, 0);
          this.platforms.setCollisionByExclusion([-1]);
      } else {
          // Create platforms from placeholder data
          this.createPlaceholderLevel();
      }
  }
  
  createPlaceholderLevel() {
      // Create static group for platforms
      this.platforms = this.scene.physics.add.staticGroup();
      
      // Create ground
      for (let x = 0; x < gameConfig.width * 2; x += 32) {
          this.platforms.create(x, gameConfig.height - 32, 'tiles');
      }
      
      // Create some platforms
      this.createPlatform(200, 400, 5);
      this.createPlatform(500, 300, 8);
      this.createPlatform(800, 250, 6);
      this.createPlatform(1200, 350, 5);
      
      // Set world bounds for camera
      this.scene.physics.world.setBounds(0, 0, gameConfig.width * 2, gameConfig.height);
      this.scene.cameras.main.setBounds(0, 0, gameConfig.width * 2, gameConfig.height);
  }
  
  createPlatform(x, y, length) {
      for (let i = 0; i < length; i++) {
          this.platforms.create(x + i * 32, y, 'tiles');
      }
      return { startX: x, endX: x + (length - 1) * 32, y };
  }
  
  setupCollision(player) {
      this.scene.physics.add.collider(player.sprite, this.platforms);
  }
  
  // Get platform positions for placing collectibles and enemies
  getPlatformPositions() {
      // For real tilemaps, this would extract positions from the map data
      // For the placeholder, we'll return our manually created platforms
      return [
          { startX: 200, endX: 360, y: 400 },
          { startX: 500, endX: 756, y: 300 },
          { startX: 800, endX: 992, y: 250 },
          { startX: 1200, endX: 1360, y: 350 }
      ];
  }
}
