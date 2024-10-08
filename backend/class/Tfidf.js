class TfIdf {
    constructor() {
        this.documents = [];
        this.stopwords = [
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
            ]; // กำหนด stopwords ที่จะไม่ใช้ในการคำนวณ
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
