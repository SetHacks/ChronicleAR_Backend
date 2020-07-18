async function quickstart() {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient({
        keyFilename: "APIKey.json"
    });
  
    // Performs label detection on the image file
    const [result] = await client.textDetection('hpps_cover.jpg');
    const labels = result.textAnnotations;
    console.log('Text:');
    labels.forEach(text => console.log(text.description));
}

quickstart();