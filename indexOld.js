const axios = require('axios');

async function getData() {
    try {
        // https://dog.ceo/api/breeds/list/all
        await axios.get('https://medium.com/search?q=pricing', {
            //headers: {"Access-Control-Allow-Origin": "*"}
        } ).then((response) => {
            console.log(response.data)
            const responseJSON = JSON.parse(JSON.stringify(response.data));
            console.log(responseJSON.substring(0, 1000));
            const responseJSONNoWhile = Object(JSON.parse(JSON.stringify(response.data.substring(16))));
            console.log("\n\n", typeof responseJSONNoWhile, responseJSONNoWhile.substring(0, 1000));
            console.log("\n\n", responseJSONNoWhile.success);
            console.log("\n\n", Object.values(responseJSONNoWhile)[0]);
        })
        
    } catch (error) {
        console.error(error);
    }
}

getData()