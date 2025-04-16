// js/scenes/titleScene.js - Title screen scene
class TitleScene extends Phaser.Scene {
  constructor() {
      super({ key: 'TitleScene' });
  }
  
  create() {
      // Add background and title
      this.add.image(0, 0, 'sky').setOrigin(0, 0);
      this.add.image(gameConfig.width / 2, 150, 'title').setOrigin(0.5);
      
      // Add title text
      this.add.text(gameConfig.width / 2, 200, 'SONIC-LIKE GAME', {
          fontSize: '38px',
          fill: '#fff',
          stroke: '#000',
          strokeThickness: 6
      }).setOrigin(0.5);
      
      // Add instruction text
      this.add.text(gameConfig.width / 2, 350, 'Use ARROW KEYS or WASD to move', {
          fontSize: '24px',
          fill: '#fff',
          stroke: '#000',
          strokeThickness: 4
      }).setOrigin(0.5);
      
      this.add.text(gameConfig.width / 2, 400, 'Press UP or W to jump', {
          fontSize: '24px',
          fill: '#fff',
          stroke: '#000',
          strokeThickness: 4
      }).setOrigin(0.5);
      
      this.add.text(gameConfig.width / 2, 450, 'Press DOWN or S to roll', {
          fontSize: '24px',
          fill: '#fff',
          stroke: '#000',
          strokeThickness: 4
      }).setOrigin(0.5);
      
      // Add "press any key to start" text with blinking effect
      const startText = this.add.text(gameConfig.width / 2, 500, 'PRESS ANY KEY TO START', {
          fontSize: '24px',
          fill: '#fff',
          stroke: '#000',
          strokeThickness: 4
      }).setOrigin(0.5);
      
      // Create blinking effect
      this.tweens.add({
          targets: startText,
          alpha: 0,
          duration: 800,
          ease: 'Power2',
          yoyo: true,
          repeat: -1
      });
      
      // Listen for key press to start game
      this.input.keyboard.on('keydown', () => {
          this.scene.start('GameScene');
      });
  }
}