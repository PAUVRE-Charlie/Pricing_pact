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
            const postsWithEssentialData = posts.map(post => ({id: post.id, author: users[post.creatorId].name, description: post.title, publicationDate: new Date(post.firstPublishedAt)}))
            fs.writeFile('./posts.json', JSON.stringify(postsWithEssentialData), 'utf8', (err) => {
                if (err) {
                    console.log(`Error writing file: ${err}`);
                } else {
                    console.log(`File is written successfully!`);
                }
            });
            console.log("\n\n")
        })
        
    } catch (error) {
        console.error(error);
    }
}

async function getPostsUntil(maxArticle) {

    let postsList = []
    const pageSize = 10;

    for(let i = 0; i<maxArticle/pageSize; i++){
        try {
            await axios.get(`https://medium.com/search/posts?q=pricing${postsList.length > 0 ? `&count=${pageSize}` : ''}${postsList.map(post => `&ignore=${post.id}`)}`, {
            } ).then((response) => {
                const responseJSONNoWhile = JSON.parse(response.data.substring(16));
                const posts = responseJSONNoWhile.payload.value;
                const users = responseJSONNoWhile.payload.references.User;
                const postsWithEssentialData = posts.map(post => ({id: post.id, author: users[post.creatorId].name, description: post.title, publicationDate: new Date(post.firstPublishedAt)}))
                postsList = postsList.concat(postsWithEssentialData)
            })
            
        } catch (error) {
            console.error(error);
        }
    }

    console.log(postsList)

    fs.writeFile('./postsInfiniteScroll.json', JSON.stringify(postsList), 'utf8', (err) => {
        if (err) {
            console.log(`Error writing file: ${err}`);
        } else {
            console.log(`File is written successfully!`);
        }
    });
    console.log("\n\n")
}

getData()


getPostsUntil(30)