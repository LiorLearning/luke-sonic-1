// js/scenes/bootScene.js - Initial boot scene
class BootScene extends Phaser.Scene {
  constructor() {
      super({ key: 'BootScene' });
  }
  
  preload() {
      // Create a loading text
      const loadingText = this.add.text(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2, 
          'Loading...', 
          { 
              fontSize: '32px',
              fill: '#fff'
          }
      ).setOrigin(0.5);
      
      // Create placeholder assets for development
      createPlaceholderAssets(this);
  }
  
  create() {
      // Hide the loading div from HTML
      document.getElementById('loading').style.display = 'none';
      
      // Move to the title scene
      this.scene.start('TitleScene');
  }
}
