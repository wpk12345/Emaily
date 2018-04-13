//write a function to retrieve a blob of json
//make an ajax request in other words
//Use the 'fetch' function.

// url  https://rallycoding.herokuapp.com/api/music_albums

function fetchAlbums () {
    //whenever you make a request with fetch, fetch returns a promise.  that promise is resolved with an object that represents the
    //underlying request.  so we have to chain on a .then
    fetch(' https://rallycoding.herokuapp.com/api/music_albums')
    //this returns another promise so we chain on another .then
    .then(res => res.json())
    .then(json => console.log(json));
    //res with be the response object in other words
}

fetchAlbums();

//COPY THE CODE AND PASTE IN THE BROWSER CONSOLE TO SEE IT RUN

//===============================Refactor with ES2017 syntax==============================================================
//lesson 57


//just going to show how the new syntax makes working with promises a little easier and straitforward
//we preface the function with async, then put await before each function returning a promise( fetch/ and line 12 res.json)
async function fetchAlbums () {
    const res = await fetch(' https://rallycoding.herokuapp.com/api/music_albums')
    const json = await res.json()

    console.log(json);
}

fetchAlbums();
