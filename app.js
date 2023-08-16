const express = require('express')
const fs = require('fs')
const controller = require('./controller/breed.controller')



const app = express()
app.use(express.json())

app.get('/breeds', async (req, res) => {
    const breedData = await controller.breedApi()
    fs.writeFile('breedData.txt', JSON.stringify(breedData, null, 4), error => {
    })
    console.log(`Number of pages: ${breedData.last_page}`);

    const groupByCountry = breedData.data.reduce((accumulator, currentValue) => {
        const country = currentValue.country;
        if (!accumulator[country]) {
            accumulator[country] = [];
        }
        accumulator[country].push(currentValue);
        return accumulator
    }, {});


    res.status(200).json({ success: true, data: groupByCountry })
})

app.post('/regex', (req, res) => {
    const { str } = req.body
    if (!str) {
        res.status(400).json({ success: false, message: 'Not Acceptable' })
    }
    const pattern = /(?:\S+\s+){7}\S+/;

    if (pattern.test(str)) {
        res.status(200).json({ success: true })
    } else {
        res.json({ success: false, message: 'Not Acceptable' })

    }
})


app.listen(9999, () => {
    console.log('Listening to port: 9999')
})