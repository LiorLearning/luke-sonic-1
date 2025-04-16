// js/scenes/loadingScene.js - Asset loading scene
class LoadingScene extends Phaser.Scene {
  constructor() {
      super({ key: 'LoadingScene' });
  }
  
  preload() {
      // Create a loading bar
      const progressBar = this.add.graphics();
      const progressBox = this.add.graphics();
      progressBox.fillStyle(0x222222, 0.8);
      progressBox.fillRect(240, 270, 320, 50);
      
      const width = this.cameras.main.width;
      const height = this.cameras.main.height;
      const loadingText = this.add.text(width / 2, height / 2 - 50, 'Loading...', {
          fontSize: '20px',
          fill: '#ffffff'
      }).setOrigin(0.5);
      
      // Update the loading bar as assets load
      this.load.on('progress', (value) => {
          progressBar.clear();
          progressBar.fillStyle(0x9999ff, 1);
          progressBar.fillRect(250, 280, 300 * value, 30);
      });
      
      this.load.on('complete', () => {
          progressBar.destroy();
          progressBox.destroy();
          loadingText.destroy();
      });
      
      // Load the actual game assets
      loadAssets(this);
  }
  
  create() {
      this.scene.start('GameScene');
  }
}