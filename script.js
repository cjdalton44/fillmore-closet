// dress-up game logic

let outfits = [
    { dress: 'red dress', accessories: ['gold necklace', 'red handbag'] },
    { dress: 'blue dress', accessories: ['silver necklace', 'blue handbag'] },
    { dress: 'green dress', accessories: ['green bracelet', 'green handbag'] },
];

let selectedOutfit;

function selectOutfit(index) {
    if (index >= 0 && index < outfits.length) {
        selectedOutfit = outfits[index];
        updateDisplay();
    } else {
        console.log('Outfit not found.');
    }
}

function updateDisplay() {
    if (selectedOutfit) {
        console.log(`Selected outfit: ${selectedOutfit.dress}`);
        console.log(`Accessories: ${selectedOutfit.accessories.join(', ')}`);
    }
}

// Example of selecting an outfit
selectOutfit(0); // Select the first outfit (red dress)