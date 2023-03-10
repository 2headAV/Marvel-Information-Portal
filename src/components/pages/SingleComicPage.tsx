import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import './singleComicPage.scss';

const SingleComicPage: React.FC = () => {
   const { comicId } = useParams();
   const [comic, setComic] = useState<Comic>();
   const { loading, error, getComics, clearError } = useMarvelService();


   useEffect(() => {
      updateComic();
   }, [comicId])

   const updateComic = () => {
      clearError();
      getComics(comicId)
         .then(onComicLoaded)
   }

   const onComicLoaded = (comic: Comic) => {
      setComic(comic);
   }

   const errorMessage = error ? <ErrorMessage /> : null;
   const spinner = loading ? <Spinner /> : null;
   const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

   return (
      <>
         {errorMessage}
         {spinner}
         {content}
      </>
   )
}

type Comic = {
   title: string;
   description: string;
   pageCount: string;
   thumbnail: string;
   language: string;
   prices: string;
}

interface ComicProps {
   comic: Comic
}

const View: React.FC<ComicProps> = ({ comic }) => {
   const { title, description, pageCount, thumbnail, language, prices } = comic;
   return (
      <div className="single-comic">
         <img src={thumbnail} alt={title} className="single-comic__img" />
         <div className="single-comic__info">
            <h2 className="single-comic__name">{title}</h2>
            <p className="single-comic__descr">{description}</p>
            <p className="single-comic__descr">{pageCount}</p>
            <p className="single-comic__descr">Language: {language}</p>
            <div className="single-comic__price">{prices}</div>
         </div>
         <Link to="/comics" className="single-comic__back">Back to all</Link>
      </div>
   )
}

export default SingleComicPage;