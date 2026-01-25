import classes from './Card.module.scss'
import type {Card} from "../App.tsx";

interface CardProps {
    card: Card;
    onClick: (card: Card) => void;
}

const CardComponent = ({ card, onClick }: CardProps) => {

    const handleClick = () =>{
        onClick(card);
    }

    return (
        <div
            className={`${classes.card} ${card.isFlipped ? classes.card__flipped : ""}
            ${card.isMatched ? classes.card__matched : ""}
            `}
            onClick={handleClick}
        >
            <div className={classes.card__front}>?</div>
            <div className={classes.card__back}>{card.value}</div>
        </div>
    );
};

export default CardComponent;