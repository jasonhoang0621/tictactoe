import { useEffect, useState } from "react";
import Board from "./components/board";

const App = () => {
  const [history, setHistory] = useState([{ squares: Array(25).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState("");
  const [pos, setPos] = useState([{ x: -1, y: -1 }]);
  const [sort, setSort] = useState("asc");
  const [winSquares, setWinSquares] = useState(Array(5).fill(null));

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24],
      [0, 5, 10, 15, 20],
      [1, 6, 11, 16, 21],
      [2, 7, 12, 17, 22],
      [3, 8, 13, 18, 23],
      [4, 9, 14, 19, 24],
      [(0, 6, 12, 18, 24)],
      [4, 8, 12, 16, 20],
    ];
    const isFull = squares.every((square) => square !== null);
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c, d, e] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c] &&
        squares[a] === squares[d] &&
        squares[a] === squares[e]
      ) {
        setWinSquares([a, b, c, d, e]);
        return squares[a];
      }
    }
    if (isFull) {
      return "Draw";
    }
    return null;
  };

  const handleClick = (i) => {
    const temp = history.slice(0, stepNumber + 1);
    const current = temp[temp.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setHistory(
      temp.concat([
        {
          squares: squares,
        },
      ])
    );
    setStepNumber(temp.length);
    setXIsNext(!xIsNext);
    setPos([...pos, { x: i % 5, y: Math.floor(i / 5) }]);
  };

  const jumpTo = (step) => {
    const winner = calculateWinner(history[step].squares);
    if (!winner) {
      setWinSquares(Array(5).fill(null));
    }
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const moves = history.map((_, move) => {
    const desc = move
      ? "Go to move #" + move + ` (${pos[move]?.x}, ${pos[move]?.y})`
      : "Go to game start";
    return (
      <li key={move}>
        <button
          onClick={() => jumpTo(move)}
          style={stepNumber === move ? { fontWeight: "bold" } : {}}
        >
          {desc}
        </button>
      </li>
    );
  });

  const reverseMoves = history.reverse().map((_, move) => {
    const desc = move
      ? "Go to move #" +
        (history.length - move) +
        ` (${pos[history.length - move]?.x}, ${pos[history.length - move]?.y})`
      : "Go to game start";
    return (
      <li key={move}>
        <button
          onClick={() => jumpTo(history.length - move)}
          style={
            stepNumber === history.length - move ? { fontWeight: "bold" } : {}
          }
        >
          {desc}
        </button>
      </li>
    );
  });

  useEffect(() => {
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
    if (winner === "Draw") {
      setStatus("Draw");
    } else if (winner) {
      setStatus("Winner: " + winner);
    } else {
      setStatus("Next player: " + (xIsNext ? "X" : "O"));
    }
  }, [history, status, xIsNext, stepNumber]);

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={history[stepNumber].squares}
          onClick={(i) => handleClick(i)}
          winSquares={winSquares}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <div>
          Sort:
          <button style={{ marginLeft: 5 }} onClick={() => setSort("asc")}>
            ASC
          </button>
          <button style={{ marginLeft: 5 }} onClick={() => setSort("desc")}>
            DESC
          </button>
        </div>

        <ol>{sort === "asc" ? moves : reverseMoves}</ol>
      </div>
    </div>
  );
};

export default App;
