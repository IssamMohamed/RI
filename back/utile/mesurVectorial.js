const connectDB = require("../db");
const Document = require('../models/document');
const InvertedFile = require('../models/InvertedFile');

async function MesurVectorial(query) {
    const docs = new Map();
   

    try {
        await connectDB();

        
        for (let [key, value] of query) {
            const objectTerm = await InvertedFile.findOne({ 'term.termToken': key });

            if (!objectTerm) {
                console.log(`Term "${key}" not found in the inverted index.`);
                continue;
            }

            const details = objectTerm.term.details;

            for (let detail of details) {
                const docId = detail.docId.toString();
                const weight = value * detail.weight;

                docs.set(docId, (docs.get(docId) || 0) + weight);
            }
        }

       
        const sortedDocs = new Map([...docs.entries()].sort((a, b) => b[1] - a[1]));
       

       
        const docIds = [...sortedDocs.keys()];
        const fetchedDocs = await Document.find({ _id: { $in: docIds } });

        const response = fetchedDocs.map(doc => ({
            document: doc,
            score: sortedDocs.get(doc._id.toString()),
        })).sort((a, b) => b.score - a.score); 

        return response;

    } catch (err) {
        console.error('Error during vectorial measurement:', err);
        return [];
    }
}

module.exports = MesurVectorial;
