const Documents = require("../models/document");
const InvertedFile = require("../models/InvertedFile");

async function weightDoc() {
    try {
        let terms = await InvertedFile.find({});

        for (let termObj of terms) {
            const term = termObj.term;  
            
        
            if (!Array.isArray(term.details)) {
                console.log(`Skipping term: ${term.termToken || "Unknown term"} due to missing or invalid 'details' field.`);
                continue;
            }
        
            const docsThatHaveTerm = term.details.length;
            const docsNumber = await Documents.countDocuments(); 
        
            for (let detail of term.details) {
                const freq = detail.frequency; 
                
                const weight = freq * Math.log10(docsNumber / docsThatHaveTerm); 
                
                console.log(`Term: ${term.termToken}, Document ID: ${detail.docId}, Frequency: ${freq}, Weight: ${weight}`);
        
                
                const updateResult = await InvertedFile.updateOne(
                    {
                        "term.termToken": term.termToken,  
                        "term.details.docId": detail.docId,
                    },
                    {
                        $set: { "term.details.$.weight": weight },
                    }
                );
        
                console.log(`Updated term: ${term.termToken}, docId: ${detail.docId}, result: ${JSON.stringify(updateResult)}`);
            }
        }
        
    } catch (error) {
        console.error('Error calculating weights:', error);
    }
}

module.exports = weightDoc;
