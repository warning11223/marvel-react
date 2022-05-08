import './charList.scss';
import React, {Component, useEffect, useRef, useState} from "react";
import useMarvelService from "../../services/MarvelService";
import Error from "../error/Error";
import Spinner from "../spinner/Spinner";

const CharList = ({onCharSelected}) => {
    const [charList, setList] = useState([]);
    const [newItemLoading, setItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {error, loading, getAllCharacters, getOneCharacter} = useMarvelService();

    const updateChars = (offset, initial) => {
        initial ? setItemLoading(false) : setItemLoading(true);

        getAllCharacters(offset)
            .then(result => onCharsLoaded(result))
    }

    const onCharsLoaded = (newCharList) => {
        let ended = false;

        if(newCharList.length < 9) {
            ended = true;
        }

        setList(charList => [...charList, ...newCharList]);
        setItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);

    }

    useEffect(() => {
        updateChars(offset, true);
    }, [])


    const itemsRef = useRef([]);


    const focusOnItem = (id) => {
        itemsRef.current.forEach(item => item.classList.remove('char__item_selected'));
        itemsRef.current[id].classList.add('char__item_selected');
        itemsRef.current[id].focus();
    }

    const renderItems = (arr) => {
        const items = arr.map((item,i) => {

        let objectFit = 'randomchar__img';

        if(item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            objectFit += ' char__fill';
        }

        return (
            <li
                className="char__item"
                key={item.id}
                onClick={() => {
                    onCharSelected(item.id)
                    focusOnItem(i)
                }}
                ref={el => itemsRef.current[i] = el}
            >
                <img src={item.thumbnail} alt="abyss" className={objectFit}/>
                <div className="char__name">{item.name}</div>
            </li>
        )
        })
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }


        const items = renderItems(charList);

        const errorMessage = error ? <Error /> : null;
        const spinner = loading && !newItemLoading ? <Spinner /> : null;
        const content = !(spinner || errorMessage) ? items : null;

        return (
            <div className="char__list">
                {content}
                {spinner}
                {errorMessage}
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

export default CharList;
