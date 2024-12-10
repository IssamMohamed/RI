const router = require("../routes/insertDocsRouter");
const indexation1 = require("../utile/indexation");
const MesurVectorial = require("../utile/mesurVectorial");




async function responceQuery(req, res){
    const {name,content,tokens,index,frequency} = indexation1(req.body);
    console.log(frequency)
    const weights = new Map();
    const queryLength = frequency.size;
    for(let freq of frequency){
        if (Array.isArray(freq) && freq.length === 2) {
            const [key, value] = freq; 
            const weight = value / queryLength;
            weights.set(key, weight);
        } 
    }
    //museur vectorial with the map of weights
    
    try {
        // Call MesurVectorial and wait for the result
        const results = await MesurVectorial(weights);
        
        console.log(results);
        res.json(results);
    } catch (err) {
        console.error("Error in responceQuery:", err.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

module.exports = {
    responceQuery
};