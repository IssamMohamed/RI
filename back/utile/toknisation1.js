function toknisation1(docs){

    const Stoplist=['the', 'of','in', 'on', 'to', 'a', 'has', 'been', 'most', 'around', 'due', 'are', 'that', 'can', 'lot']
    const content=docs.content;

    const cleanText = content.toLowerCase().replace(/[^\w\s]/g, '');

    // Split the text into words based on whitespace
    const tokens = cleanText.split(/\s+/);

    const filteredTokens = tokens.filter(token => !Stoplist.includes(token));

    return filteredTokens;

}

module.exports = toknisation1;