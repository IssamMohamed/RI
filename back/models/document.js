const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Document
    = new Schema({
     name: { type: String, required: true },
    content: { type: String, required: true },
})

module.exports = mongoose.model('Document', Document);