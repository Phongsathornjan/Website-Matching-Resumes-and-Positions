class cosine {
    constructor() {
        this.documents = [];
        this.stopwordsSet = new Set([
            'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t', 'as', 'at', 
            'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 
            'can\'t', 'cannot', 'could', 'couldn\'t', 
            'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 'don\'t', 'down', 'during', 
            'each', 'few', 'for', 'from', 'further', 
            'had', 'hadn\'t', 'has', 'hasn\'t', 'have', 'haven\'t', 'having', 'he', 'he\'d', 'he\'ll', 'he\'s', 'her', 'here', 'here\'s', 
            'hers', 'herself', 'him', 'himself', 'his', 'how', 'how\'s', 
            'i', 'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if', 'in', 'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself', 
            'let\'s', 'me', 'more', 'most', 'mustn\'t', 'my', 'myself', 
            'no', 'nor', 'not', 
            'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 
            'same', 'shan\'t', 'she', 'she\'d', 'she\'ll', 'she\'s', 'should', 'shouldn\'t', 'so', 'some', 'such', 
            'than', 'that', 'that\'s', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'there\'s', 'these', 'they', 
            'they\'d', 'they\'ll', 'they\'re', 'they\'ve', 'this', 'those', 'through', 'to', 'too', 
            'under', 'until', 'up', 'very', 
            'was', 'wasn\'t', 'we', 'we\'d', 'we\'ll', 'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when', 'when\'s', 
            'where', 'where\'s', 'which', 'while', 'who', 'who\'s', 'whom', 'why', 'why\'s', 
            'with', 'won\'t', 'would', 'wouldn\'t', 'you', 'you\'d', 'you\'ll', 'you\'re', 'you\'ve', 'your', 'yours', 'yourself', 'yourselves'
        ]);
        this.uniqueWords = [];
        this.docVectors = [];
    }

    tokenize(text) {
        if (typeof text !== 'string') {
            return [];
        }
        text = text.toLowerCase().replace(/[/,]/g, ' ');
        return text.match(/\b\w+\b/g)?.filter(token => !this.stopwordsSet.has(token)) || [];
    }

    addDocument(doc) {
        this.documents.push(doc);
        this.updateCache();
    }

    updateCache() {
        const allTokens = this.documents.flatMap(this.tokenize.bind(this));
        this.uniqueWords = Array.from(new Set(allTokens));
        this.docVectors = this.documents.map(doc => this.getWordVector(doc));
    }

    getWordVector(doc) {
        const tokens = this.tokenize(doc);
        const vector = new Array(this.uniqueWords.length).fill(0);
        tokens.forEach(token => {
            const index = this.uniqueWords.indexOf(token);
            if (index !== -1) {
                vector[index] = 1;
            }
        });
        return vector;
    }

    cosineSimilarity(vecA, vecB) {
        const dotProduct = vecA.reduce((sum, value, index) => sum + value * vecB[index], 0);
        const magnitudeA = Math.sqrt(vecA.reduce((sum, value) => sum + value * value, 0));
        const magnitudeB = Math.sqrt(vecB.reduce((sum, value) => sum + value * value, 0));

        return (magnitudeA === 0 || magnitudeB === 0) ? 0 : dotProduct / (magnitudeA * magnitudeB);
    }

    computeSimilarities(query, callback) {
        if (query === '-') {
            this.documents.forEach((doc, docIndex) => {
                callback(docIndex, 100);
            });
            return;
        }

        const queryVector = this.getWordVector(query);
        this.docVectors.forEach((docVector, docIndex) => {
            const similarity = this.documents[docIndex] === 'PostNoNeedExperience' 
                ? 1 
                : this.cosineSimilarity(queryVector, docVector);
            callback(docIndex, similarity * 100);
        });
    }
}

module.exports = cosine;