const Square = (props) => {
  return (
    <button
      className="square"
      onClick={props.onClick}
      style={{
        color: props.value === "O" ? "red" : "black",
        backgroundColor: props.winSquare ? "yellow" : "white",
      }}
    >
      {props.value}
    </button>
  );
};
export default Square;
