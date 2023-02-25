import { useState } from "react";
import { range, calculateWinner } from "../utils";
import Square from "./Square";

const SQUARE_AMOUNT = 9;

export default function Board({
	xIsNext,
	squares,
	onPlay,
}: {
	xIsNext: boolean;
	squares: string[];
	onPlay: (nextSquares: string[]) => void;
}) {
	const winner = calculateWinner(squares);
	const X = "🤗";
	const O = "😚";

	const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? X : O}`;

	function handleClick(i: number) {
		if (squares[i] || calculateWinner(squares)) return;
		const nextSquares = [...squares];
		xIsNext ? (nextSquares[i] = X) : (nextSquares[i] = O);
		onPlay(nextSquares);
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
