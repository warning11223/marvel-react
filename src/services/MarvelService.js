import useHttp from "../hooks/http.hook";


const useMarvelService = () => {
    const { loading, clearError, request, error} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=7680b2c8e48a15aed117e5a6bc139d57';
    const _offset = 210;

    const getAllCharacters = async (offset = _offset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }

    const getAllComics = async (offset = _offset) => {
        const res = await request(`${_apiBase}comics?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComic)

    }

    const getOneCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0])
    }

    const getOneComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComic(res.data.results[0])
    }

    const _transformComic = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices.price ? `${comics.prices.price}$` : 'not available'
        }
    }

    const _transformCharacter = (res) => {
        if(res.description.length > 225) {
            let string = res.description.slice(0, 225);
            let newString = string.split(' ');
            newString.splice(newString.length-1,1);
            string = newString.join(' ');
            return string + '...';
        }

        return {
            id: res.id,
            name: res.name,
            description: res.description,
            thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
            homepage: res.urls[0].url,
            wikipedia: res.urls[1].url,
            comics: res.comics.items,
        }
    }

    const _transformAllCharacters = (res) => {
        return {
            name: res.name,
            thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
        }
    }

    return {loading, error, getAllCharacters, getOneCharacter, clearError, getAllComics, getOneComic};
}

export default useMarvelService;