const axios = require('axios');
const cors = require('cors');
const express = require('express');

const app = express();
const port = process.env.PORT || 3060;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// routes will go here
app.post('/', async function (req, res) {
    const method = req.body.method;
    const url = req.body.url;
    const headers = req.body.headers;
    const params = req.body.params;
    const data = req.body.data ?? '';
    axios({
        method,
        url,
        headers,
        params,
        data
    }).then(result => {
        res.send({
            'data': result.data,
            'status': result.status,
        });
    })
    .catch((e) => {
        console.log(e)
        res.status(e.response.status)
        res.send({  
                statusCode:  e.response.status,
                message:  e.response.data.message
        });
    });
})
    app.listen(port);
    console.log('Server started at http://localhost:' + port);
