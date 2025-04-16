window.onload = function() {
  // Create the game with the configuration
  const game = new Phaser.Game(gameConfig);
  
  // Add scenes
  game.scene.add('BootScene', BootScene);
  game.scene.add('LoadingScene', LoadingScene);
  game.scene.add('TitleScene', TitleScene);
  game.scene.add('GameScene', GameScene);
  
  // Start with the boot scene
  game.scene.start('BootScene');
};