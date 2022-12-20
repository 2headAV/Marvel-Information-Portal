import useMarvelService from '../../services/MarvelServices';
import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import './charList.scss';

type CharListProps = {
    onCharSelected: (id: number) => void
}

const CharList: React.FC<CharListProps> = ({ onCharSelected }) => {

    const [charList, setCharList] = useState<[]>([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const { loading, error, getAllCharacters } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset: number, initial?: boolean) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded);
    }


    const onCharListLoaded = async (newCharList: []) => {

        console.log(newCharList);

        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }

    const itemRefs = useRef<HTMLLIElement[]>([]);


    const focusOnItem = (id: number) => {
        if (itemRefs.current) {
            itemRefs.current.map(item => item.classList.remove('char__item_selected'));
            itemRefs.current[id].classList.add('char__item_selected');
            itemRefs.current[id].focus();
        }
    }

    type CharItem = {
        id: number;
        name: string;
        description: string;
        thumbnail: string;
        homepage: string;
        wiki: string;
        comics: [
            { name: string | null }
        ];
    }

    function renderItems(arr: CharItem[]) {
        const items = arr.map((item, i: number) => {
            let imgStyle = {};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            } else {
                imgStyle = { 'objectFit': 'cover' };
            }

            return (
                <li
                    className="char__item"
                    tabIndex={0}
                    // @ts-ignore
                    ref={el => itemRefs.current[i] = el}
                    key={item.id}
                    onClick={() => {
                        onCharSelected(item.id);
                        focusOnItem(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                            onCharSelected(item.id);
                            focusOnItem(i);
                        }
                    }} >
                    <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });

        return (
            <TransitionGroup component={null}>
                <ul className="char__grid">
                    {items}
                </ul>
            </TransitionGroup>
        )
    }

    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;
