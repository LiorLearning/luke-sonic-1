const assets = {
  sprites: {
      player: {
          key: 'player',
          path: './assets/player.png',
          frameWidth: 50,
          frameHeight: 50
      },
      ring: {
          key: 'ring',
          path: './assets/ring.png',
          frameWidth: 24,
          frameHeight: 24
      },
      enemy: {
          key: 'enemy',
          path: './assets/enemy.png',
          frameWidth: 40,
          frameHeight: 40
      },
      tiles: {
          key: 'tiles',
          path: './assets/tiles.png',
          frameWidth: 32,
          frameHeight: 32
      }
  },
  tilemaps: {
      level1: {
          key: 'level1',
          path: './assets/level1.json'
      }
  },
  audio: {
      jump: {
          key: 'jump',
          path: './assets/jump.mp3'
      },
      collect: {
          key: 'collect',
          path: './assets/collect.mp3'
      },
      music: {
          key: 'music',
          path: './assets/music.mp3'
      }
  },
  images: {
      sky: {
          key: 'sky',
          path: './assets/sky.jpeg'
      },
      title: {
          key: 'title',
          path: './assets/title.jpg'
      }
  }
};

// Load all assets for a given scene
function loadAssets(scene) {
  // Load sprite sheets
  Object.values(assets.sprites).forEach(sprite => {
      scene.load.spritesheet(sprite.key, sprite.path, {
          frameWidth: sprite.frameWidth,
          frameHeight: sprite.frameHeight
      });
  });

  // Load tilemaps
  Object.values(assets.tilemaps).forEach(tilemap => {
      scene.load.tilemapTiledJSON(tilemap.key, tilemap.path);
  });

  // Load audio
  Object.values(assets.audio).forEach(sound => {
      scene.load.audio(sound.key, sound.path);
  });

  // Load images
  Object.values(assets.images).forEach(image => {
      scene.load.image(image.key, image.path);
  });
}

// Create placeholder assets for development
function createPlaceholderAssets(scene) {
  // Create a player placeholder
  const playerGraphics = scene.make.graphics({ x: 0, y: 0, add: false });
  playerGraphics.fillStyle(0x00aaff);
  playerGraphics.fillRect(0, 0, 50, 50);
  playerGraphics.lineStyle(2, 0xffffff);
  playerGraphics.strokeRect(0, 0, 50, 50);
  playerGraphics.fillStyle(0xffffff);
  playerGraphics.fillCircle(25, 15, 5);
  playerGraphics.generateTexture('player', 50, 50);
  
  // Create a ring placeholder
  const ringGraphics = scene.make.graphics({ x: 0, y: 0, add: false });
  ringGraphics.fillStyle(0xffff00);
  ringGraphics.fillCircle(12, 12, 12);
  ringGraphics.lineStyle(3, 0xffffff);
  ringGraphics.strokeCircle(12, 12, 9);
  ringGraphics.generateTexture('ring', 24, 24);
  
  // Create an enemy placeholder
  const enemyGraphics = scene.make.graphics({ x: 0, y: 0, add: false });
  enemyGraphics.fillStyle(0xff0000);
  enemyGraphics.fillRect(0, 0, 40, 40);
  enemyGraphics.lineStyle(2, 0x000000);
  enemyGraphics.strokeRect(0, 0, 40, 40);
  enemyGraphics.generateTexture('enemy', 40, 40);
  
  // Create tiles placeholder
  const tilesGraphics = scene.make.graphics({ x: 0, y: 0, add: false });
  tilesGraphics.fillStyle(0x00aa00);
  tilesGraphics.fillRect(0, 0, 32, 32);
  tilesGraphics.lineStyle(2, 0x008800);
  tilesGraphics.strokeRect(0, 0, 32, 32);
  tilesGraphics.generateTexture('tiles', 32, 32);
  
  // Create sky placeholder
  const skyGraphics = scene.make.graphics({ x: 0, y: 0, add: false });
  skyGraphics.fillGradientStyle(0x4488ff, 0x4488ff, 0x88ccff, 0x88ccff, 1);
  skyGraphics.fillRect(0, 0, gameConfig.width, gameConfig.height);
  skyGraphics.generateTexture('sky', gameConfig.width, gameConfig.height);
  
  // Create title placeholder
  const titleGraphics = scene.make.graphics({ x: 0, y: 0, add: false });
  titleGraphics.fillStyle(0x0000aa);
  titleGraphics.fillRect(0, 0, 400, 100);
  titleGraphics.fillStyle(0xffffff);
  titleGraphics.fillRect(10, 10, 380, 80);
  titleGraphics.generateTexture('title', 400, 100);
  
  // Create level data
  scene.cache.json.add('level1', {
      width: 40,
      height: 15,
      layers: [{
          data: createLevelData(40, 15)
      }]
  });
}

// Create a simple level layout
function createLevelData(width, height) {
  const level = [];
  
  // Fill with empty space
  for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
          level.push(0);
      }
  }
  
  // Add ground
  for (let x = 0; x < width; x++) {
      level[x + (height - 1) * width] = 1;
  }
  
  // Add some platforms
  for (let x = 5; x < 10; x++) {
      level[x + 10 * width] = 1;
  }
  
  for (let x = 15; x < 20; x++) {
      level[x + 8 * width] = 1;
  }
  
  for (let x = 25; x < 30; x++) {
      level[x + 6 * width] = 1;
  }
  
  return level;
}
