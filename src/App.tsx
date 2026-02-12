import GameHeader from "./components/GameHeader.tsx";
import CardComponent from "./components/Card.tsx";
import {useEffect, useState} from "react";
import classes from './App.module.scss'

const iCards = [
    "🐻",
    "🐻",
    "🐨",
    "🐨",
    "🐻‍❄️",
    "🐻‍❄️",
    "🦝",
    "🦝",
    "🐺",
    "🐺",
    "🐋",
    "🐋",
    "🐯",
    "🐯",
    "🐘",
    "🐘",
]

export interface Card{
    id: number,
    value: string,
    isFlipped: boolean,
    isMatched: boolean,
}

const shuffledCardsArray = (cardsArr: string[]) =>{
    const shuffled = [...cardsArr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }
    return shuffled;
}

const initialCards = () =>{
    const shuffled = shuffledCardsArray(iCards);
    return shuffled.map((value, index) => {
        return {
            id: index,
            value,
            isFlipped: false,
            isMatched: false,
        };
    });
}

const App = () => {
    const [cards, setCards] = useState<Card[]>(() => initialCards());
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [, setMatchedCards] = useState<number[]>([]);
    const [score, setScore] = useState<number>(0);
    const [moves, setMoves] = useState<number>(0);



    const handleCardClick = (card: Card) => {
        if (card.isFlipped || card.isMatched || flippedCards.length === 2) {
            return;
        }

        const newCards = cards.map((c) => {
            if (c.id === card.id) {
                return {...c, isFlipped: true};
            }
            return c;
        });
        setCards(newCards);

        const newFlippedCards = [...flippedCards, card.id];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            const [firstCardId, secondCardId] = newFlippedCards;
            const firstCard = cards.find(c => c.id === firstCardId)!;
            const secondCard = cards.find(c => c.id === secondCardId)!;

            if (firstCard.value === secondCard.value) {
                setTimeout(() => {
                    setMatchedCards(prev => [...prev, firstCardId, secondCardId]);
                    setScore(prev => prev + 1);
                    setCards(prev => prev.map(c => {
                        if (c.id === firstCardId || c.id === secondCardId) {
                            return {...c, isMatched: true};
                        }
                        return c;
                    }));
                    setFlippedCards([]);
                }, 500);
            } else {
                setTimeout(() => {
                    setCards(prev => prev.map(c => {
                        if (c.id === firstCardId || c.id === secondCardId) {
                            return {...c, isFlipped: false};
                        }
                        return c;
                    }));
                    setFlippedCards([]);
                }, 700);
            }
            setMoves(prev => prev + 1);
        }

    };


    const resetGame = () => {
        setCards(initialCards());
        setFlippedCards([]);
        setMatchedCards([]);
        setScore(0);
        setMoves(0);
    };
    useEffect(() => {
        const allMatched = cards.every(card => card.isMatched);
        if (cards.length > 0 && allMatched) {
            alert('You did a good job!)')
        }
    }, [cards]);
    return (
        <div className={classes.appContainer}>
            <GameHeader score={score} moves={moves} resetGame={resetGame}/>
            <div className={classes.appContainer__cardContainer}>
                {cards.map((c) => (
                    <CardComponent key={c.id} card={c} onClick={handleCardClick}/>
                ))}
            </div>

        </div>
    );
};

export default App;