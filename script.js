const APIKEY = "1b977ff48db9f4e31e40912f11c4ea6b";

let imagesData;
const fetchesImages = async () => {
    try {
        return await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKEY}`);
    } catch(error) {
        console.log(error);
        alert("There was an error", error);
    }
}

async function getGenre(){
    let genre = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKEY}`);
    let genWithJSON = await genre.json();
    let genres = genWithJSON.genres;
    // console.log(genres);
    return genres;
   
    
}

async function matchGenre(array){
    let genWithJSON = await getGenre();
    let movieGenre =  [];
    
    for(let j = 0; j < array.length; j++){
        for(let i = 0; i < genWithJSON.length; i++){
            if(genWithJSON[i].id === array[j]){
                movieGenre += (`${genWithJSON[i].name} `);
                
            }
        }
    }
    // console.log(movieGenre);
    
    return  movieGenre;
}


const fetchImageByKeyword = async () => {

    const keyword = document.getElementById('searched-keyword');

    try {
        return await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=${keyword.value}`);
    } catch(error) {
        console.log(error);
        alert("There was an error", error);
    }


}

const generateUI =  (arrayOfImages) => {
    let photoSection = document.getElementById('movieInfo-section');
    photoSection.innerHTML = "";

    arrayOfImages.forEach(async (imageObject) => {
        let imageContainer = document.createElement('div');

        const genres = await matchGenre(imageObject.genre_ids);


        imageContainer.innerHTML = `
        <img src=https://image.tmdb.org/t/p/original/${imageObject.poster_path}>
        <p>Title: ${ imageObject.title }</p>
        <p>Released Year: ${ imageObject.release_date }</p>
        <p>${imageObject.overview}</p>
        <p>${genres}</p>
        `
    
        photoSection.appendChild(imageContainer);
    })

}

async function getImageDataByKeyword() {
    const { data } = await fetchImageByKeyword();

    imagesData = data.results.map((imageObject) => {
        return {
            poster_path: imageObject.poster_path,
            title: imageObject.title,
            release_date: imageObject.release_date,
            overview: imageObject.overview ,
            genre_ids: imageObject.genre_ids

        }
    });

    generateUI(imagesData);
}



async function getData() {
    const { data } = await fetchesImages();
    imagesData = data.results.map((imageObject) => {
        return {
            poster_path: imageObject.poster_path,
            title: imageObject.title,
            release_date: imageObject.release_date,
            overview: imageObject.overview,
            genre_ids: matchGenre(imageObject.genre_ids) 

        }
    });


    generateUI(imagesData);
}



getData();
