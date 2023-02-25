import { useState } from "react";
import { range, calculateWinner } from "../utils";
import Square from "./Square";

const SQUARE_AMOUNT = 9;

export default function Board() {
	const [xIsNext, setXIsNext] = useState(true);
	const [squares, setSquares] = useState<string[]>(Array(SQUARE_AMOUNT).fill(null));

	const winner = calculateWinner(squares);
	const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? "X" : "O"}`;
	function handleClick(i: number) {
		if (squares[i] || calculateWinner(squares)) return;

		const nextSquares = [...squares];
		console.log(squares, nextSquares);
		if (squares[i]) return;
		xIsNext ? (nextSquares[i] = "X") : (nextSquares[i] = "O");
		setSquares(nextSquares);
		setXIsNext(!xIsNext);
	}

	return (
		<>
			<div className="board">
				{range(SQUARE_AMOUNT).map((i) => (
					<Square key={i + 1} value={squares[i]} onSquareClick={() => handleClick(i)} />
				))}
			</div>
			<div className="status">{status}</div>
		</>
	);
}
