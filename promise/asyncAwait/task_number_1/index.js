const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
let isLoading = false;

const createNewPost = async ()=>{
    isLoading = true;

    try {

        const response = await fetch(POSTS_URL, {
            method: "POST"
        });

        return await response.json();

    } catch (err) {
        console.log("error", err);
    } finally {
        isLoading = false;
    }
};

createNewPost().then(result => console.log("result", result));

