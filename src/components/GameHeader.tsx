import classes from './GameHeader.module.scss'
import type {FC} from "react";

interface GameHeaderProps {
    score: number;
    moves: number;
    resetGame: () => void;
}

const GameHeader:FC <GameHeaderProps>= ({score, moves, resetGame}) => {
    return (
        <div className={classes.gameHeader}>
            <h1 className={classes.gameHeader__title}>Memory Card Game</h1>
            <div className={classes.gameHeader__stats}>
                <div className={classes.gameHeader__score}>
                    <span className={classes.gameHeader__scoreLabel}>score:</span>
                    <span className={classes.gameHeader__scoreValue}>{score}</span>
                </div>
                <div className={classes.gameHeader__moves}>
                    <span className={classes.gameHeader__movesLabel}>moves:</span>
                    <span className={classes.gameHeader__movesValue}>{moves}</span>
                </div>
            </div>
            <button className={classes.gameHeader__resetButton} onClick={resetGame}>New game</button>
        </div>
    );
};

export default GameHeader;