class TfIdf {
    constructor() {
        this.documents = [];
        this.stopwords = ['the', 'is', 'in', 'and', 'a', 'of']; // กำหนด stopwords ที่จะไม่ใช้ในการคำนวณ
    }

    tokenize(text) {
        // แยกคำออก และกรอง stopwords ออก
        return text.toLowerCase()
                   .match(/\b\w+\b/g)
                   .filter(token => !this.stopwords.includes(token));
    }

    addDocument(doc) {
        this.documents.push(doc);
    }

    getWordVector(doc) {
        const tokens = this.tokenize(doc);
        const uniqueWords = Array.from(new Set(this.documents.flatMap(this.tokenize.bind(this)))); // หาคำที่เป็นเอกลักษณ์ในทุกเอกสาร
        return uniqueWords.map(uniqueWord => (tokens.includes(uniqueWord) ? 1 : 0));
    }
    

    cosineSimilarity(vecA, vecB) {
        const dotProduct = vecA.reduce((sum, value, index) => sum + value * vecB[index], 0);
        const magnitudeA = Math.sqrt(vecA.reduce((sum, value) => sum + value * value, 0));
        const magnitudeB = Math.sqrt(vecB.reduce((sum, value) => sum + value * value, 0));
        return dotProduct / (magnitudeA * magnitudeB);
    }

    computeSimilarities(query, callback) {
        const queryVector = this.getWordVector(query);
        const results = [];

        // คำนวณ Cosine Similarity สำหรับแต่ละเอกสาร
        this.documents.forEach((doc, docIndex) => {
            const docVector = this.getWordVector(doc);
            const similarity = this.cosineSimilarity(queryVector, docVector);
            results.push({ docIndex, similarity });
        });

        // หาค่าความคล้ายคลึงสูงสุด
        const maxSimilarity = Math.max(...results.map(result => result.similarity));

        // Normalize ค่า similarity โดยเทียบกับ maxSimilarity
        results.forEach(result => {
            const normalizedSimilarity = maxSimilarity > 0 ? (result.similarity / maxSimilarity) * 100 : 0; 
            callback(result.docIndex, normalizedSimilarity);
        });
    }
}

module.exports = TfIdf;
