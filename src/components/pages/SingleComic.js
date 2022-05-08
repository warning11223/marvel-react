import './singleComic.scss';

import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";
import Error from "../error/Error";
import Spinner from "../spinner/Spinner";




const SingleComic = () => {
    const { id } = useParams();
    const [comic, setComic] = useState(null);
    const {error, getOneComic, loading} = useMarvelService();

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const updateComic = () => {
        getOneComic(id)
            .then(result => onComicLoaded(result))
    }

    useEffect(() => {
        updateComic();
    }, [id])


    const errorMessage = error ? <Error /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(spinner || errorMessage || !comic) ? <Comic comic={comic}/> : null;


    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}


const Comic = ({comic}) => {
    const {id, title, description, pageCount, thumbnail, language, price} = comic;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComic;