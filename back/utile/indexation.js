const toknisation1 = require("./toknisation1") ;

// Helper function to check for vowels
function isVowel(char) {
    return ['a', 'e', 'i', 'o', 'u'].includes(char.toLowerCase());
}

function indexation1(docs) {
    const tokens = toknisation1(docs);
    const index = new Map();
    const frequency = new Map();

    let position = 1; // Track position
    for (let word of tokens) {
        // Stem the word based on various suffix conditions
        if (word.length > 3) {
            if (word.endsWith('ies')) {
                word = word.slice(0, -3) + 'y';
            } else if (word.endsWith('es') && isVowel(word.slice(-3, -2))) {
                word = word.slice(0, -2);
            } else if (word.endsWith('s') && !word.endsWith('ss')) {
                word = word.slice(0, -1);
            } else if (word.endsWith('ed') && isVowel(word.slice(-2, -1))) {
                word = word.slice(0, -2);
            } else if (word.endsWith('ing') && isVowel(word.slice(-3, -2))) {
                word = word.slice(0, -3);
            } else if (word.endsWith('ation') || word.endsWith('ition')) {
                word = word.slice(0, -3);
            } else if (word.endsWith('ence') || word.endsWith('ance')) {
                word = word.slice(0, -2);
            } else if (word.endsWith('er') || word.endsWith('or')) {
                word = word.slice(0, -2);
            } else if (word.endsWith('al')) {
                word = word.slice(0, -2);
            }else if(word.endsWith('eed') && isVowel(word.slice(-3, -2))){
               word = word.slice(0, -1);
            }
        }

        // Add position to the index map
        if (index.has(word)) {
            index.get(word).push(position);
        } else {
            index.set(word, [position]);
        }

        // Update frequency map
        if (frequency.has(word)) {
            frequency.set(word, frequency.get(word) + 1);
        } else {
            frequency.set(word, 1);
        }

        position++; // Increment position for the next word
    }
    if(!docs.name){
        docs.name = ' ';
    }

    // Return the final object
    return {
        name: docs.name,
        content: docs.content,
        tokens,
        index,
        frequency
    };
}

module.exports = indexation1;
