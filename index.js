const axios = require('axios');
const fs = require('fs')

async function getData() {
    try {
        // https://dog.ceo/api/breeds/list/all
        await axios.get('https://medium.com/search?q=pricing', {
            //headers: {"Access-Control-Allow-Origin": "*"}
        } ).then((response) => {
            const responseJSONNoWhile = JSON.parse(response.data.substring(16));
            // console.log(responseJSONNoWhile)
            const posts = responseJSONNoWhile.payload.value.posts;
            const users = responseJSONNoWhile.payload.references.User;
            console.log(users)
            const postsWithEssentialData = posts.map(post => ({id: post.id, author: users[post.creatorId].name, description: post.title, publicationDate: new Date(post.firstPublishedAt)}))
            console.log(postsWithEssentialData)
            fs.writeFile('./posts.json', JSON.stringify(postsWithEssentialData), 'utf8', (err) => {
                if (err) {
                    console.log(`Error writing file: ${err}`);
                } else {
                    console.log(`File is written successfully!`);
                }
            });
        })
        
    } catch (error) {
        console.error(error);
    }
}

getData()