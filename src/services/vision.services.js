const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient({
    keyFilename: "src/APIKey.json"
});

const fetchAnnotations = async(img_src) => {
    const [results] = await client.textDetection(img_src);
    return results.textAnnotations;
}

module.exports = {
    fetchAnnotations
};