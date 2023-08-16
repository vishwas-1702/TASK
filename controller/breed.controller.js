const axios = require('axios')

const url = require('../url')

async function breedApi() {
    const response = await axios.get(url.breedUrl)
    return response.data
}


module.exports = {
    breedApi
}