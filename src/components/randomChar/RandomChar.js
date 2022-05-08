import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";

const RandomChar = () => {
    const [char, setChar] = useState({});

    const {loading, error, getOneCharacter, getAllCharacters, clearError} = useMarvelService();


    const updateChar = () => {
        clearError();

        let random = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

        getOneCharacter(random)
            .then(result => onCharLoaded(result))
    }

    useEffect(() => {
        updateChar();
    }, []);


    const onCharLoaded = (char) => {
        setChar(char);
    }

    const errorMessage = error ? <Error /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(spinner || errorMessage) ? <LeftSide char={char}/> : null;


    return (
        <div className="randomchar">

            {errorMessage}
            {spinner}
            {content}

            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )

}

const LeftSide = ({char}) => {
    const {name, wikipedia, homepage, description, thumbnail} = char;

    let objectFit = 'randomchar__img';

    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        objectFit += ' randomchar__contain';
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className={objectFit}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description === null || description === '' ? 'No description' : description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wikipedia} className="button button__secondary">
                        <div className="inner">Wikipedia</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;