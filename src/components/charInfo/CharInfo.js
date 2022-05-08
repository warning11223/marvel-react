import './charInfo.scss';
import {Component, useEffect, useState} from "react";
import Error from "../error/Error";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";
import useMarvelService from "../../services/MarvelService";

const CharInfo = ({charId}) => {
    const [char, setChar] = useState(null);

    const {error, getOneCharacter, getAllCharacters, loading} = useMarvelService();

    const onCharLoaded = (newChar) => {
        setChar(newChar);
    }

    const updateChar = () => {
        if(!charId) {
            return;
        }


        getOneCharacter(charId)
            .then(result => onCharLoaded(result))
    }

    useEffect(() => {
            updateChar();
    }, [charId]);


    const errorMessage = error ? <Error /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(spinner || errorMessage || !char) ? <SideInfo char={char}/> : null;
    const skeleton = char || loading || error ? null : <Skeleton />;

    return (
        <div className="char__info">
            {skeleton}
            {content}
            {spinner}
            {errorMessage}
        </div>
    )

}

const SideInfo = ({char}) => {
    const {name, wikipedia, homepage, description, thumbnail, comics} = char;

    let objectFit = 'randomchar__img';

    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        objectFit += ' char__unset';
    }

    if(comics.length > 10) {
        return comics.splice(0, 10);
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} className={objectFit}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wikipedia} className="button button__secondary">
                            <div className="inner">Wikipedia</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0
                    ?
                    comics.map((item, i) => {
                        return <li key={i} className="char__comics-item">
                            {item.name}
                        </li>
                    })
                    :
                    'No comics now...'
                }
            </ul>
        </>
    )
}

export default CharInfo;
