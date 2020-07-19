const { VISION_ROOT_URL, GOOGLE_API_KEY } = require('../config.js');

const axios = require('axios');

const fetchAnnotations = async(binaryImage) => {
    const response = await axios.post(`${VISION_ROOT_URL}?key=${GOOGLE_API_KEY}`, {
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
    console.log(response)
    return response.data.responses[0].textAnnotations[0].description.replace(/\n/g,' ');
}

module.exports = {
    fetchAnnotations
};