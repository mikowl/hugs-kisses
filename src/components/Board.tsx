import { range, calculateWinner } from "../utils";
import { Fireworks } from "@fireworks-js/react";
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

	const status = winner ? (
		<p>The winner is {winner}</p>
	) : (
		<p>
			Next player: <i>{xIsNext ? X : O}</i>
		</p>
	);

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
			<div className={`status${winner ? " gameover" : ""}`}>{status}</div>
			{winner && (
				<Fireworks
					options={{
						rocketsPoint: {
							min: 0,
							max: 100,
						},
					}}
					className="fireworks"
				/>
			)}
		</>
	);
}
