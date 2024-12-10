const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InvertedFileSchema = new Schema({
    term:{
        termToken: { type: String, required: false },
        details: [
            {
                docId: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: true }, // Document ID
                docName : { type: String, required: true },
                frequency: { type: Number, required: true }, // Term frequency in the document
                weight: { type: Number,default: 0 },
            }
        ]
    }
})

module.exports = mongoose.model('invertedFile', InvertedFileSchema);