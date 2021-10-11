function checkWinner(state){

  const win = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
  ]

  for(let i = 0; i < win.length; i++){

      const [a, b, c] = win[i];

      if(state[a] == state[b] && state[a] == state[c] && state[a] != null)
          return state[a];

  }

  return null;

}

const Square = ({id, handleClickSquare , enabled}) => {

  const [color, setColor] = React.useState('green');
  const [player, setPlayer] = React.useState(null);
  const symbol = ["O","X "];

  const palet = ["white", "red"];

  React.useEffect(() => {

    console.log(`Render Square ${id}`);

    return () => console.log(`unMounting square ${id}`)

  });

  return (
    <button     
      className = {color}
      onClick = {(e) => {
      
        if(enabled){
          let actualPlayer = handleClickSquare(id);

          let colorPlayer = palet[actualPlayer]
  
          setColor(colorPlayer);
          e.target.style.background = colorPlayer;      
  
          setPlayer(actualPlayer);
        }

    }}>
      {symbol[player]}
    </button>
  );

}

const Board = () => {

  const [state, setState] = React.useState(Array(9).fill(null));
  const [player, setPlayer] = React.useState(0);
  const symbol = ["O","X "];
  
  let status = `-`;
  let winner = checkWinner(state);

  if(winner != null) status = `Player ${symbol[winner]} wins. Press F5 to play again`

  console.log(status);

  function renderSquare (i){

    return <Square id ={i} 
            handleClickSquare = {clickSquare} 
            enabled = {winner==null}>
              
            </Square>;

  }

  const clickSquare = idSquare =>{

    let actualPlayer = player;

    state[idSquare] = actualPlayer;

    setState(state);

    let nextPlayer = (actualPlayer + 1)%2;
    setPlayer(nextPlayer);

    return actualPlayer;

  }

  return (
    <div className="game-board">
      <div className="grid-row">
        {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
      </div>
      <div className="grid-row">
        {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
      </div>
      <div className="grid-row">
        {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
      </div>
      <div id="info">
        <h1>{status}</h1>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Board />, document.getElementById("root"));
