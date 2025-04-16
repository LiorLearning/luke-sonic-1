// js/ui.js - User interface elements
class UI {
  constructor(scene) {
      this.scene = scene;
      this.scoreText = null;
      this.ringText = null;
      this.messageText = null;
  }
  
  create() {
      // Create UI elements that stay fixed to the camera
      this.ringText = this.scene.add.text(20, 20, 'Rings: 0', {
          fontSize: '24px',
          fill: '#fff',
          stroke: '#000',
          strokeThickness: 4
      }).setScrollFactor(0);
      
      // Add level title that fades out
      this.messageText = this.scene.add.text(gameConfig.width / 2, gameConfig.height / 2, 'Green Hill Zone', {
          fontSize: '32px',
          fill: '#fff',
          stroke: '#000',
          strokeThickness: 6
      }).setOrigin(0.5).setScrollFactor(0);
      
      // Fade out after 2 seconds
      this.scene.tweens.add({
          targets: this.messageText,
          alpha: 0,
          duration: 2000,
          delay: 2000
      });
  }
  
  updateRingCount(count) {
      this.ringText.setText(`Rings: ${count}`);
  }
  
  showMessage(message, duration = 2000) {
      // Reset message text if it was faded out
      this.messageText.setText(message);
      this.messageText.setAlpha(1);
      
      // Fade out after specified duration
      this.scene.tweens.add({
          targets: this.messageText,
          alpha: 0,
          duration: 1000,
          delay: duration
      });
  }
}