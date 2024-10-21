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
    
        // ตรวจสอบว่า text เป็น string ก่อน tokenize
        if (typeof text !== 'string') {
            return [];
        }
    
        return text.toLowerCase()
                   .match(/\b\w+\b/g)
                   ?.filter(token => !this.stopwords.includes(token)) || [];
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
    
        // ตรวจสอบว่าค่ามากกว่า 0 ก่อนทำการหาร
        if (magnitudeA === 0 || magnitudeB === 0) {
            return 0; // เปลี่ยนเป็น 0 ถ้า magnitude เป็น 0
        }
    
        return dotProduct / (magnitudeA * magnitudeB);
    }
    

    computeSimilarities(query, callback) {
        // เช็คว่าถ้า query หรือเอกสารใน documents เป็น "-"
        if (query === '-') {
            // ส่งค่า similarity เป็น 100% ทันที
            this.documents.forEach((doc, docIndex) => {
                callback(docIndex, 100); // ค่า similarity 100%
            });
            return; // ออกจากฟังก์ชันไม่ต้องคำนวณต่อ
        }
    
        const queryVector = this.getWordVector(query);
        const results = [];
    
        // คำนวณ Cosine Similarity สำหรับแต่ละเอกสาร
        this.documents.forEach((doc, docIndex) => {
            if (query === '-' && this.documents[docIndex]) {
                const similarity = 1
                results.push({ docIndex, similarity });
            }else{
                const docVector = this.getWordVector(doc);
                const similarity = this.cosineSimilarity(queryVector, docVector);
                results.push({ docIndex, similarity });
            }
        });
    
        // ส่งผลลัพธ์โดยไม่ normalize
        results.forEach(result => {
            callback(result.docIndex, result.similarity * 100); // แสดงค่า similarity เป็นเปอร์เซ็นต์
        });
    }
    
}

module.exports = TfIdf;
