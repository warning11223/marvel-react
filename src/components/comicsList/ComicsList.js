import './comicsList.scss';
import useMarvelService from "../../services/MarvelService";
import React, {useEffect, useState} from "react";
import Error from "../error/Error";
import Spinner from "../spinner/Spinner";
import {Link} from "react-router-dom";

const ComicsList = () => {
    const [newItemLoading, setItemLoading] = useState(false);
    const [charList, setList] = useState([]);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {error, clearError, loading, getAllComics, getOneCharacter} = useMarvelService();

    const updateChars = (offset, initial) => {
        initial ? setItemLoading(false) : setItemLoading(true);

        getAllComics(offset)
            .then(result => onCharsLoaded(result))
    }

    const onCharsLoaded = (newCharList) => {
        let ended = false;

        if(newCharList.length < 8) {
            ended = true;
        }

        setList(charList => [...charList, ...newCharList]);
        setItemLoading(newItemLoading => false);
        setOffset(offset => offset + 8);
        setCharEnded(charEnded => ended);
    }

    useEffect(() => {
        updateChars(offset, true);
    }, [])

    const renderItems = (arr) => {
        const items = arr.map((item,i) => {

            return (
                <li key={item.id} className="comics__item">
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }


    const items = renderItems(charList);

    const errorMessage = error ? <Error /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;


    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}

            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{display: charEnded ? 'none' : 'block'}}
                onClick={() => updateChars(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;