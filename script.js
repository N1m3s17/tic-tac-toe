let board = new Array(9);
let winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

const gameBoard = (() => {
    const setBoard = () => {
        for(let i = 0; i < 9; i++) {
        const gameContainer = document.querySelector('.container');
        const gameDiv = document.createElement('div');
            gameDiv.className = 'game-div';
            gameDiv.id = i;
        gameContainer.append(gameDiv);
    }
} 
return {setBoard,}
})();

const gamePlayer = (name, gamePiece) => {
    let indexes = [];
    let playerStatus = false;
    const getName = () => name;
    const getGamePiece = () => gamePiece;
    const currentPlayerStatus = () => {
        return playerStatus;
    };

    const playerInput = (el) => {
        const div = document.getElementById(el.target.id);
            div.textContent = gamePiece;
            board[parseInt(el.target.id)] = gamePiece;
    }

    const changePlayerStatus = () => {
        if(playerStatus === false) {
            playerStatus = true;
        } else {
            playerStatus = false;
        }
        
    };

    const updateIndex = () => {
        board.reduce(function (total, next, ind) {
            if(next === gamePiece){
                indexes.push(ind);
                return indexes;
            }
        }, [])
    }

    const checkDraw = () => {
        const foundItem = board.find((item) => {
            return item === '';
        })
        return foundItem;
    }

    const getWinner = () => {    
        let result = false;
        if(result === false){
            for(let i = 0; i < winningConditions.length; i++){
                result = winningConditions[i].every(val => indexes.includes(val));
                if (result === true){
                    break
                };
            }
        }
        return result;

    }

    const displayWinner = () => {
        const gameContainer = document.querySelector('.container');
        const dialogBox = document.createElement('DIALOG');
        dialogBox.textContent = `${name} won the game`;
        dialogBox.show();
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'CLOSE';
        closeBtn.addEventListener('click', () => {
            dialogBox.close();
        })
        dialogBox.append(closeBtn);
        gameContainer.append(dialogBox);

    }

    const displayDraw = () => {
        const gameContainer = document.querySelector('.container');
        const dialogBox = document.createElement('DIALOG');
        dialogBox.textContent = "It's a draw.";
        dialogBox.show();
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'CLOSE';
        closeBtn.addEventListener('click', () => {
            dialogBox.close();
        })
        dialogBox.append(closeBtn);
        gameContainer.append(dialogBox);

    }

    return {getName, getGamePiece, playerInput, currentPlayerStatus, changePlayerStatus, updateIndex, getWinner, displayWinner, displayDraw,};
}

    const playerForm = document.querySelector('#player-form');
    playerForm.addEventListener('submit', (e) =>{
        e.preventDefault();
        const headerContainer = document.querySelector('.header-container');
        headerContainer.remove();
        const firstPlayer = e.target.playerone.value;
        const secondPlayer = e.target.playertwo.value;
        const playerOne = gamePlayer(firstPlayer, 'X');
        const playerTwo = gamePlayer(secondPlayer, 'O');     
        gameBoard.setBoard();


        const gameDiv = document.querySelectorAll('.game-div');

gameDiv.forEach(div => {
    div.addEventListener('click', (e) => {
        let found = board.findIndex(e => e === undefined);
    if(playerOne.getWinner() === false && playerTwo.getWinner() === false && found !== -1){
        if(board[parseInt(e.target.id)] === undefined){
            if(playerOne.currentPlayerStatus() === false){
                playerOne.playerInput(e);
                playerOne.changePlayerStatus();
                playerOne.updateIndex();
                let found = board.findIndex(e => e === undefined);
                if(found === -1){
                    playerOne.displayDraw();
                }
                if(playerOne.getWinner() === true){
                    playerOne.displayWinner();
                }
           } else {
                playerTwo.playerInput(e);
                playerOne.changePlayerStatus();
                playerTwo.updateIndex();
                let found = board.findIndex(e => e === undefined);
                if(found === -1){
                    playerOne.displayDraw();
                }
                if(playerTwo.getWinner() === true){
                    playerTwo.displayWinner();
                }
           }
        }
    }
    })
})
    })
    

