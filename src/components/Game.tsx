import { SetStateAction, useState } from "react";
import { calculateWinner } from "../utils";
import Board from "./Board";

export default function Game() {
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const xIsNext = currentMove % 2 === 0;
	const currentSquares = history[currentMove];

	function handlePlay(nextSquares: any[]) {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	}

	function jumpTo(nextMove: SetStateAction<number>) {
		setCurrentMove(nextMove);
	}

	const winner = calculateWinner(currentSquares);

	const moves = history.map((squares, move: number) => {
		const desc = move ? `Go to move #${move}` : `Go to game start`;
		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>{desc}</button>
			</li>
		);
	});

	return (
		<div className="game">
			<div className="game-board">
				<Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
			</div>
			{winner && <button onClick={() => jumpTo(0)}>New Game?</button>}
			<div className="game-info">
				<h3>History</h3>
				<ol>{moves}</ol>
			</div>
		</div>
	);
}
