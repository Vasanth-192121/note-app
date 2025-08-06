// // nlpUtils.js
// import * as tf from '@tensorflow/tfjs';
// import * as use from '@tensorflow-models/universal-sentence-encoder';
// import natural from 'natural';
// import sw from 'stopword';

// // Tokenizer from natural
// const tokenizer = new natural.WordTokenizer();

// // Use stopword's removeStopwords function
// const removeStopwords = sw.removeStopwords;

// // Optional: Custom stopwords (you can skip this and rely on default English stopwords)
// const stopwords = [
//     'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', "you're", "you've", "you'll", "you'd", 'your', 'yours', 'yourself', 'yourselves',
//     'he', 'him', 'his', 'himself', 'she', "she's", 'her', 'hers', 'herself', 'it', "it's", 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves',
//     'what', 'which', 'who', 'whom', 'this', 'that', "that'll", 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has',
//     'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for',
//     'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on',
//     'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more',
//     'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', "don't",
//     'should', "should've", 'now', 'd', 'll', 'm', 'o', 're', 've', 'y', 'ain', 'aren', "aren't", 'couldn', "couldn't", 'didn', "didn't", 'doesn', "doesn't",
//     'hadn', "hadn't", 'hasn', "hasn't", 'haven', "haven't", 'isn', "isn't", 'ma', 'mightn', "mightn't", 'mustn', "mustn't", 'needn', "needn't", 'shan',
//     "shan't", 'shouldn', "shouldn't", 'wasn', "wasn't", 'weren', "weren't", 'won', "won't", 'wouldn', "wouldn't"
// ];

// // TensorFlow model (loaded once)
// let model;

// // Load the Universal Sentence Encoder model
// export async function loadModel() {
//     if (!model) {
//         console.log('Loading Universal Sentence Encoder model...');
//         tf.setBackend('cpu'); // Optional: enforce CPU usage
//         model = await use.load();
//         console.log('Universal Sentence Encoder model loaded.');
//     }
//     return model;
// }

// // Main tag suggestion logic
// export async function suggestTags(text) {
//     if (!text || text.trim() === '') {
//         return [];
//     }

//     try {
//         await loadModel(); // Make sure model is loaded

//         // Tokenize and clean the input
//         const tokens = tokenizer.tokenize(text.toLowerCase().replace(/[^a-z0-9\s]/g, ''));

//         // Remove stopwords and short words
//         const filteredTokens = removeStopwords(tokens, stopwords).filter(word => word.length > 2);

//         if (filteredTokens.length === 0) {
//             return [];
//         }

//         // Count frequency of remaining words
//         const wordFrequencies = {};
//         for (const word of filteredTokens) {
//             wordFrequencies[word] = (wordFrequencies[word] || 0) + 1;
//         }

//         // Sort words by frequency and return top 5
//         const sortedWords = Object.entries(wordFrequencies)
//             .sort(([, a], [, b]) => b - a)
//             .map(([word]) => word);

//         return sortedWords.slice(0, 5); // return top 5 keywords as tags

//     } catch (error) {
//         console.error('Error in suggestTags:', error);
//         return [];
//     }
// }










// nlpUtils.js
import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import natural from 'natural';
import pkg from 'stopword'; // <--- MODIFIED IMPORT: Import the default export as 'pkg'
const { removeStopwords, en } = pkg; // <--- MODIFIED USAGE: Destructure from 'pkg'

// Tokenizer from natural
const tokenizer = new natural.WordTokenizer();

// Your custom stopwords array can now be completely removed as you're using 'en'
// const stopwords = [ ... ]; // Remove this entire array

// TensorFlow model (loaded once)
let model;

// Load the Universal Sentence Encoder model
export async function loadModel() {
    if (!model) {
        console.log('Loading Universal Sentence Encoder model...');
        tf.setBackend('cpu'); // Optional: enforce CPU usage
        model = await use.load();
        console.log('Universal Sentence Encoder model loaded.');
    }
    return model;
}

// Main tag suggestion logic
export async function suggestTags(text) {
    if (!text || text.trim() === '') {
        return [];
    }

    try {
        await loadModel(); // Make sure model is loaded

        // Tokenize and clean the input
        const tokens = tokenizer.tokenize(text.toLowerCase().replace(/[^a-z0-9\s]/g, ''));

        // Remove stopwords and short words
        const filteredTokens = removeStopwords(tokens, en).filter(word => word.length > 2); // Use 'en'

        if (filteredTokens.length === 0) {
            return [];
        }

        // Count frequency of remaining words
        const wordFrequencies = {};
        for (const word of filteredTokens) {
            wordFrequencies[word] = (wordFrequencies[word] || 0) + 1;
        }

        // Sort words by frequency and return top 5
        const sortedWords = Object.entries(wordFrequencies)
            .sort(([, a], [, b]) => b - a)
            .map(([word]) => word);

        return sortedWords.slice(0, 5); // return top 5 keywords as tags

    } catch (error) {
        console.error('Error in suggestTags:', error);
        return [];
    }
}