import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
   const { loading, request, error, clearError } = useHttp();

   const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
   const _apiKey = 'apikey=ff1643fc81e0cc0d005c3256aba1ba8f';
   const _baseOffset = 210;
   const _comicsOffset = 1;



   const getAllCharacters = async (offset = _baseOffset) => {
      const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
      return res.data.results.map(_transformCharacter);
   }


   const getCharacter = async (id: number) => {
      const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
      return _transformCharacter(res.data.results[0]);
   }


   //! Исправить ANY

   interface Char {
      name: string;
      description: string;
      thumbnail: {
         path: string;
         extension: string;
      };
      urls: any
      id: number;
      comics: {
         items: string
      }
   }

   const _transformCharacter = (char: Char) => {
      return {
         name: char.name,
         description: char.description ? `${char.description.slice(0, 210)}...` : 'Description of the character is not yet available...',
         thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
         homepage: char.urls[0].url,
         wiki: char.urls[1].url,
         id: char.id,
         comics: char.comics.items
      }
   }

   const getComics = async (id: number) => {
      const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
      return _transformComics(res.data.results[0]);
   }

   const getAllComics = async (offset = _comicsOffset) => {
      const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
      return res.data.results.map(_transformComics);
   }

   //! Исправить ANY

   interface Comics {
      title: string;
      description: string;
      thumbnail: {
         path: string;
         extension: string;
      };
      pageCount: number;
      language: string;
      id: number;
      prices: any;
   }

   const _transformComics = (comics: Comics) => {
      return {
         thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
         title: comics.title,
         description: comics.description || 'There is no description',
         pageCount: comics.pageCount ? `${comics.pageCount} pages` : "No information about the number of pages",
         language: comics.language || 'en-us',
         prices: comics.prices[0].price ? `${comics.prices[0].price}$` : 'not available',
         id: comics.id
      }
   }


   return { loading, error, getAllCharacters, getCharacter, getAllComics, getComics, clearError }
}

export default useMarvelService;