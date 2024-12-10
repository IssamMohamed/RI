const connectDB = require('../db'); // Assuming you already have connectDB function
const Document = require('../models/document'); // Path to your Document model
const InvertedFile = require('../models/InvertedFile');
const indexation1 = require('../utile/indexation');
const weightDocs = require('../utile/wightDoc');

async function checkTermExists(termToken) {
    const term = await InvertedFile.findOne({ 'term.termToken': termToken });
    return !!term; // Returns true if term exists, false otherwise
}

async function addDetailToTermDirectly(termToken, newDetail) {
    try {
        // Update the document by termToken and push to the details array
        await InvertedFile.updateOne(
            { "term.termToken": termToken },
            { $addToSet: { "term.details": newDetail } }
        );

    } catch (error) {
        console.error('Error adding detail to term:', error);
        throw error;
    }
}

async function createNewTerm(termToken, docId, name , frequency) {
    try {
        // Create a new term document
        const newTerm = new InvertedFile({
            term: {
                termToken: termToken,
                details: [
                    {
                        docId: docId,
                        docName: name,
                        frequency: frequency,
                        weight: 0, // Default weight
                    }
                ]
            }
        });

        // Save the new term document
        await newTerm.save();

        return newTerm;
    } catch (error) {
        console.error('Error creating new term:', error);
        throw error;
    }
}

async function newDoc(name, content) {
    try {
        const newdoc = new Document({
            name: name,
            content: content,
        });
        const savedDoc = await newdoc.save(); // Save the document and return the saved instance
        console.log(name)
        return savedDoc._id; // Return the ID of the created document
    } catch (error) {
        console.error('Error creating new doc:', error);
        throw error;
    }
}

async function insertDocument(req, res) {
    try {


        if (!Array.isArray(req.body)) {
            return res.status(400).send("Request body must be an array.");
        }

        await connectDB(); // Ensure the database is connected

        for (let doc of req.body) {
            const { name, content, tokens, index, frequency } = indexation1(doc);

            // Create a new document and get its ID
            const docId = await newDoc(name, content);

            for (let [key, value] of frequency) {
                const termExists = await checkTermExists(key);

                if (!termExists) {

                    await createNewTerm(key, docId, name, value);
                } else {
                    await addDetailToTermDirectly(key, {
                        docId: docId,
                        docName: name,
                        frequency: value,
                        weight: 0,
                    });
                }
            }
        }

        await weightDocs();

        res.status(200).send("Documents inserted successfully.");
    } catch (error) {
        console.error('Error inserting documents:', error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = insertDocument;
