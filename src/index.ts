import { Board } from './Board';

const board = new Board();
console.log(board);
const boardElement = document.querySelector('#board');
const squareElements = document.querySelectorAll('.board > div');
/**
 *
 * @param x
 * @param y
 * if the x value is even or 0 then the square is dark if the y value is odd based on the x and y value starting at 0
 * if the x value is odd then the sqaure is dark if the y value is even or 0 on the x and y value starting at 0
 * @returns boolean
 */

function squareIsDark(x: number, y: number): boolean {
  return (x % 2 === 0 && y % 2 !== 0) || (x % 2 !== 0 && y % 2 === 0);
}

function handleSquareClick(event: any) {
  // Remove all active classes before adding one
  document
    .querySelectorAll('.active')
    .forEach((sqaure) => sqaure.classList.remove('active'));
  if (event.target.classList.contains('fa-solid')) {
    // If the event target is the piece add to the parent square
    // element
    event.target.parentNode.classList.add('active');
  } else {
    event.target.classList.add('active');
  }
}

let isDown: boolean = false;
let originalPosition: number[] = [];
let currentPosition: number[] = [];
let currentPiece: any;
let targetSquare: any;
function handleDown(event: any) {
  isDown = true;
  originalPosition = [event.clientX, event.clientY];
  if (event.target.firstChild) {
    currentPiece = event.target.firstChild;
  } else if (event.target.classList.contains('fa-solid')) {
    currentPiece = event.target;
  }
}

function handleUp(event: any) {
  isDown = false;
  originalPosition = [];
  currentPiece = '';
}

function updatePiecePosition() {}

function movePiece(event: any) {
  event.preventDefault();
  if (isDown) {
    currentPosition = [event.clientX, event.clientY];
    currentPiece.style.transform = `translate(${
      currentPosition[0] - originalPosition[0]
    }px, ${currentPosition[1] - originalPosition[1]}px)`;
  }
  updatePiecePosition();
}

function createBoardSquare(x: number, y: number): void {
  // file letters are to represent each file
  const fileLetters: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const div = document.createElement('div');
  // Create id of element for chess notation
  const id: string = fileLetters[x] + (y + 1);
  const isDark = squareIsDark(x, y);
  div.setAttribute('id', id);
  div.classList.add('square', isDark ? 'dark' : 'light');
  boardElement?.appendChild(div);
  div.addEventListener('click', handleSquareClick);
  div.addEventListener('mousedown', handleDown, true);
  div.addEventListener('mouseup', handleUp, true);
  div.addEventListener('mousemove', movePiece, true);
}

function renderBoard(): void {
  const fileLength = 8;
  const rankLength = 8;
  for (let y = 0; y < fileLength; y++) {
    for (let x = 0; x < rankLength; x++) {
      createBoardSquare(x, y);
    }
  }
}

function renderPieces(): void {
  // file letters are to represent each file
  const fileLetters: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  for (const rank of board.spots) {
    for (const spot of rank) {
      console.log(spot.getPieceName());
      if (!spot.piece) {
        break;
      }
      const color = spot.getPieceColor();
      const type = spot.getPieceName();
      // get the notation of the square
      const [x, y] = spot.getCoordinates();
      const notation = fileLetters[x] + (y + 1);
      const squareElement = document.getElementById(notation);
      // Adding piece to board
      const pieceElement = document.createElement('i');
      pieceElement.classList.add(
        'fa-3x',
        'fa-solid',
        type ? `fa-chess-${type}` : '',
        color ? color : ''
      );
      // Alternative of chess pieces is to add -piece to the end
      squareElement?.appendChild(pieceElement);
    }
  }
}

function main(): void {
  board.initGame();
  console.log(board.spots);
  renderBoard();
  renderPieces();
}
main();
