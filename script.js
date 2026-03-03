// Character state
let currentCharacter = 'male';
const characters = {
    male: {
        name: 'Red-Haired Man',
        hairColor: '#d2691e',
        skinColor: '#f4a460'
    },
    female: {
        name: 'Brunette Woman',
        hairColor: '#8b4513',
        skinColor: '#fdbcb4'
    }
};

const outfitState = {
    male: {
        shirt: '#4169e1',
        pants: '#2f4f4f',
        shoes: '#8b4513',
        glasses: false,
        necklace: false,
        hat: false,
        hatColor: '#ff6347'
    },
    female: {
        shirt: '#ff69b4',
        pants: '#000',
        shoes: '#fff',
        glasses: false,
        necklace: false,
        hat: false,
        hatColor: '#000'
    }
};

// Initialize the game
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    updateCharacterDisplay();
});

function setupEventListeners() {
    // Character selection
    document.querySelectorAll('.char-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            selectCharacter(this.dataset.character);
        });
    });

    // Color buttons
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.dataset.item;
            const value = this.dataset.value;
            
            if (item === 'hat') {
                outfitState[currentCharacter].hatColor = getColorFromValue(value);
            } else {
                outfitState[currentCharacter][item] = getColorFromValue(value);
            }
            updateCharacterDisplay();
        });
    });

    // Toggle buttons
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.dataset.item;
            outfitState[currentCharacter][item] = !outfitState[currentCharacter][item];
            updateCharacterDisplay();
        });
    });

    // Image upload
    document.getElementById('imageUpload').addEventListener('change', handleImageUpload);
    
    // Reset button
    document.getElementById('resetBtn').addEventListener('click', resetOutfit);
    
    // Screenshot button
    document.getElementById('screenshotBtn').addEventListener('click', takeScreenshot);
}

function selectCharacter(character) {
    currentCharacter = character;
    
    // Update active button
    document.querySelectorAll('.char-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-character="${character}"]`).classList.add('active');
    
    updateCharacterDisplay();
}

function getColorFromValue(value) {
    const colorMap = {
        'blue': '#4169e1',
        'red': '#ff4500',
        'green': '#228b22',
        'purple': '#8b008b',
        'black': '#000',
        'yellow': '#ffd700',
        'gray': '#808080',
        'khaki': '#f0e68c',
        'brown': '#8b4513',
        'white': '#fff',
        'pink': '#ff69b4'
    };
    return colorMap[value] || '#000';
}

function updateCharacterDisplay() {
    const outfit = outfitState[currentCharacter];
    const character = characters[currentCharacter];
    
    // Update shirt color
    const shirtSlot = document.getElementById('shirt-slot');
    if (shirtSlot) {
        shirtSlot.querySelector('rect').setAttribute('fill', outfit.shirt);
    }
    
    // Update pants color
    const pantsSlot = document.getElementById('pants-slot');
    if (pantsSlot) {
        pantsSlot.querySelectorAll('rect').forEach(rect => {
            rect.setAttribute('fill', outfit.pants);
        });
    }
    
    // Update shoes color
    const shoesSlot = document.getElementById('shoes-slot');
    if (shoesSlot) {
        shoesSlot.querySelectorAll('ellipse').forEach(ellipse => {
            ellipse.setAttribute('fill', outfit.shoes);
        });
    }
    
    // Update hat visibility and color
    const hatSlot = document.getElementById('hat-slot');
    if (hatSlot) {
        hatSlot.style.display = outfit.hat ? 'block' : 'none';
        hatSlot.querySelectorAll('[fill="#ff6347"]').forEach(el => {
            el.setAttribute('fill', outfit.hatColor);
        });
    }
    
    // Update glasses visibility
    const glassesSlot = document.getElementById('glasses-slot');
    if (glassesSlot) {
        glassesSlot.style.display = outfit.glasses ? 'block' : 'none';
    }
    
    // Update necklace visibility
    const necklaceSlot = document.getElementById('necklace-slot');
    if (necklaceSlot) {
        necklaceSlot.style.display = outfit.necklace ? 'block' : 'none';
    }
    
    // Update character skin and hair color
    const head = document.getElementById('head');
    if (head) {
        head.setAttribute('fill', character.skinColor);
    }
    
    const hair = document.getElementById('hair');
    if (hair) {
        hair.setAttribute('fill', character.hairColor);
    }
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const preview = document.getElementById('preview');
        const previewImg = document.getElementById('previewImg');
        previewImg.src = e.target.result;
        preview.style.display = 'block';
    };
    reader.readAsDataURL(file);
}

function addToOutfit() {
    // This would integrate the uploaded image into the outfit
    // For now, we'll just show an alert
    alert('Image added to outfit! (Feature in development)');
}

function resetOutfit() {
    // Reset to default outfit
    outfitState[currentCharacter] = {
        shirt: currentCharacter === 'male' ? '#4169e1' : '#ff69b4',
        pants: currentCharacter === 'male' ? '#2f4f4f' : '#000',
        shoes: currentCharacter === 'male' ? '#8b4513' : '#fff',
        glasses: false,
        necklace: false,
        hat: false,
        hatColor: currentCharacter === 'male' ? '#ff6347' : '#000'
    };
    updateCharacterDisplay();
    alert('Outfit reset!');
}

function takeScreenshot() {
    // Use html2canvas library or similar to capture the SVG
    const svg = document.getElementById('character');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = function() {
        canvas.width = 300;
        canvas.height = 400;
        ctx.drawImage(img, 0, 0);
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `fillmore-closet-${currentCharacter}-outfit.png`;
        link.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
}