// js/collectibles.js - Collectible items functionality
class Collectibles {
  constructor(scene) {
      this.scene = scene;
      this.group = scene.physics.add.group();
  }
  
  createRings(positions) {
      positions.forEach(pos => {
          const ring = this.group.create(pos.x, pos.y, 'ring');
          ring.setBounce(0.2);
          ring.setCollideWorldBounds(true);
      });
      
      // Create ring animation with just a single frame since placeholder only has one
      if (!this.scene.anims.exists('spin')) {
          this.scene.anims.create({
              key: 'spin',
              frames: this.scene.anims.generateFrameNumbers('ring', { start: 0, end: 0 }),
              frameRate: 10,
              repeat: -1
          });
      }
      
      // Play animation on all rings - only if we have real sprite frames
      // In placeholder mode, we'll just use the static image
      try {
          this.group.children.iterate((ring) => {
              if (ring) ring.play('spin');
          });
      } catch (error) {
          console.log('Using static ring image instead of animation');
      }
  }
  
  // Generate rings at regular intervals along a platform
  generateRingsOnPlatform(startX, endX, y, spacing = 50) {
      const positions = [];
      for (let x = startX; x <= endX; x += spacing) {
          positions.push({ x, y: y - 40 }); // Position rings above platform
      }
      this.createRings(positions);
  }
  
  // Create a circular pattern of rings
  createRingCircle(centerX, centerY, radius, count) {
      const positions = [];
      for (let i = 0; i < count; i++) {
          const angle = (i / count) * Math.PI * 2;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          positions.push({ x, y });
      }
      this.createRings(positions);
  }
  
  // Setup collision with player
  setupCollision(player) {
      this.scene.physics.add.overlap(player.sprite, this.group, (playerSprite, ring) => {
          ring.disableBody(true, true);
          const ringCount = player.collectRing();
        //   this.scene.sound.play('collect');
          this.scene.events.emit('ringCollected', ringCount);
      }, null, this);
  }
}
