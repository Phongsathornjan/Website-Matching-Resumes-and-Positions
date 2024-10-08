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

    termFrequency(term, doc) {
        const tokens = this.tokenize(doc);
        const termCount = tokens.filter(token => token === term).length;
        return termCount / tokens.length;
    }

    inverseDocumentFrequency(term) {
        const numDocsWithTerm = this.documents.filter(doc => this.tokenize(doc).includes(term)).length;
        return Math.log(this.documents.length / (numDocsWithTerm || 1));
    }

    tfidfs(query, callback) {
        const queryTerms = this.tokenize(query);
        const results = [];

        // คำนวณ TF-IDF สำหรับแต่ละเอกสาร
        this.documents.forEach((doc, docIndex) => {
            let tfidfScore = 0;
            queryTerms.forEach(term => {
                const tf = this.termFrequency(term, doc);
                const idf = this.inverseDocumentFrequency(term);
                tfidfScore += tf * idf;
            });
            results.push({ docIndex, tfidfScore });
        });

        // หาค่าความคล้ายคลึงสูงสุด
        const maxSimilarity = Math.max(...results.map(result => result.tfidfScore));

        // ตรวจสอบว่ามีความตรงกันหรือไม่
        const hasMatch = maxSimilarity > 0; // ถ้ามีเอกสารที่มีค่า TF-IDF มากกว่า 0 หมายความว่ามีความตรงกัน

        // Normalize ค่า similarity โดยเทียบกับ maxSimilarity
        results.forEach(result => {
            const normalizedSimilarity = hasMatch ? (result.tfidfScore / maxSimilarity) * 100 : 0; 
            callback(result.docIndex, normalizedSimilarity);
        });
    }
}

module.exports = TfIdf;
