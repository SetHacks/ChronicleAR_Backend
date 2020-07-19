const { VISION_ROOT_URL, GOOGLE_API_KEY } = require('../config.js');

const axios = require('axios');

const fetchAnnotations = binaryImage => 
    axios.post(`${VISION_ROOT_URL}?key=${GOOGLE_API_KEY}`, {
        "requests": [
            {
                "image": {
                    "content": binaryImage
                },
                "features": [
                    {
                        "type": "TEXT_DETECTION"
                    }
                ]
            }
        ]

    }) 
    .then(response => response.data.responses[0].textAnnotations)


module.exports = {
    fetchAnnotations
};