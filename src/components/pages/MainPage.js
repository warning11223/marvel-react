import React, {useState} from 'react';
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import ErrorBoundary from "../errorBoundary/errorBoundary";
import CharInfo from "../charInfo/CharInfo";
import decoration from "../../resources/img/vision.png";

const MainPage = () => {
    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(id)
    }


    return (
        <>
            <RandomChar/>
            <div className="char__content">
                <CharList onCharSelected={onCharSelected}/>
                <ErrorBoundary>
                    <CharInfo charId={selectedChar}/>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    );
};

export default MainPage;
