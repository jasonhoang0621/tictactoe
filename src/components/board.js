import Square from "./square";

const Board = (props) => {
  return (
    <>
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <div key={i}>
            {Array(5)
              .fill()
              .map((_, j) => {
                return (
                  <Square
                    key={j}
                    value={props.squares[i * 5 + j]}
                    onClick={() => props.onClick(i * 5 + j)}
                    winSquare={props.winSquares.includes(i * 5 + j)}
                  />
                );
              })}
          </div>
        ))}
    </>
  );
};

export default Board;
