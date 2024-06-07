
import React, { useEffect, useRef, useState } from 'react';
import createBoard from '../stuff/createBoard.js';
import "../Components/Css/board.css"
import Cell from "../Components/Cell.js"
import { revealed } from '../stuff/reveal.js';
import Modal from './modal.js';
import Timer from './Timer.js';




const Board = ({difficulty }) => {
    const [grid, setGrid] = useState([]); 
    const [nonMineCount , setNonMineCount] = useState(0);
    const [mineLocations, setMineLocations] = useState([])
    const [gameOver, setGameOver] = useState(false);
    const [flagCount, setFlagCount] = useState(0);
    const timerRef = useRef();
    const [timerzero, settimerzero] = useState(false);
    
    
    useEffect(( ) =>{
            //chama a funcao 
            settimerzero(!timerzero);
            freshBoard();
            
    }, [difficulty]);

    //settimerzero(false);

    //cria a funcao 
           
    const freshBoard=()=>{
      //  settimerzero(false);
        let sizex = 1; 
        let sizey = 1; 
        let mines = 1;
        console.log("ESTE" + difficulty);
        switch(difficulty ){
            
            case 'easy' :
             sizex = 9; 
             sizey = 9; 
             mines = 10;
            break;

            case 'medium' :
             sizex = 16; 
             sizey = 16; 
             mines = 40;
            break;

            case 'hard' :
             sizex = 30; 
             sizey = 16; 
             mines = 99;
            break;

        }
                const newBoard = createBoard(sizex,sizey,mines); //cria o tabuleiro com o tamanho 10x 10y e 20 minas 
                setNonMineCount(sizex*sizey - mines);
                setMineLocations(newBoard.mineLocation) //da a localizacao de todas as bombas 

                //console.log(newBoard);
                setGrid(newBoard.board);
                setFlagCount(0);
              //  settimerzero(false);
            }
            
 
        const restartGame=()=>{
            freshBoard();
            setGameOver(false);
        }


    //acontece sempre q se clica no botao direito /trata das flag 
    const updateFlag = (e, x, y) => {
        e.preventDefault(); // Isto faz com que o menu do botão direito não apareça
        let newGrid = JSON.parse(JSON.stringify(grid)); // Cria uma cópia do tabuleiro
        if (newGrid[x][y].flagged) {
            newGrid[x][y].flagged = false;
            setFlagCount(flagCount - 1); // Diminui a contagem de bandeiras
        } else {
            newGrid[x][y].flagged = true;
            setFlagCount(flagCount + 1); // Aumenta a contagem de bandeiras
        }
        setGrid(newGrid);
        console.log("Right-Click");
    };

    //revelarCelula 

    const revealCell = (x ,y) =>{
        if(grid[x][y].revealed || gameOver){
            return;
        }
        let newGrid = JSON.parse(JSON.stringify(grid)) //cria uma copia do tabuleiro 
        if(newGrid[x][y].value === 'X'){ //se clicar numa mina , em "X" ele acaba a partida
            //alert('mine found');
            for(let i = 0; i < mineLocations.length; i++){
                newGrid[mineLocations[i][0]] [mineLocations[i][1]].revealed = true;
            }
            setGrid(newGrid)
            setGameOver(true);


        }else{ // se ja nao houver mais campos sem minas para serem clicados, ele acaba a partida
            let newRevealedBoard = revealed(newGrid , x , y, nonMineCount )   
            setGrid(newRevealedBoard.arr)
            setNonMineCount(newRevealedBoard.newNonMinesCount)
            if(newRevealedBoard.newNonMinesCount === 0){
                setGameOver(true)
            }
        }
    }
    

    return (
        <div>
            <p>{gameOver && <Modal restartGame={restartGame}/>} </p> 
            <p> Vazias: {nonMineCount} </p>
            <p>Minas restantes: {mineLocations.length - flagCount} </p>
            <Timer gameOver={gameOver} timerzero={timerzero} />
            <div style={{display: "flex", justifyContent:"center", alignItems:"center",flexDirection:"column"}}>
            {
                    grid.map((singleRow , index1 ) => { //mostra o tabuleiro no ecra
                        return (
                            <div className='board' key = {index1}> 
                                {singleRow.map((cel, index2) => {
                                    return <Cell revealCell={revealCell} details={cel} updateFlag={updateFlag} key={index2} />
                                })}
                            </div>
                        )
                    })
            }
            </div>

        </div>
    )
}



export default Board;
