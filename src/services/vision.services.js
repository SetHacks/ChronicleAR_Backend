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
    return response.data.responses;
}

module.exports = {
    fetchAnnotations
};