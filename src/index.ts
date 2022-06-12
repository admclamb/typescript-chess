import { Board } from './Board';

const board = new Board();
const boardElement: Element | null = document.querySelector('#board');
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
  console.log(currentPiece);
  currentPiece.style.zIndex = 100;
}

function getSquareFromCoordinates(x: number, y: number): number[] {
  if (boardElement instanceof Element) {
    const rect = boardElement.getBoundingClientRect();
    const squareLength: number = parseInt(
      getComputedStyle(boardElement).getPropertyValue('--square-length')
    );
    const rectX = x - rect.x;
    const rectY = rect.bottom - y;
    const targetYSquare = Math.floor(rectY / squareLength);
    const targetXSquare = Math.floor(rectX / squareLength);
    return [targetXSquare, targetYSquare];
  }
  throw new Error('There is not instance of board.');
}

function handleUp(event: any) {
  isDown = false;
  const [toX, toY] = getSquareFromCoordinates(
    currentPosition[0],
    currentPosition[1]
  );
  const [fromX, fromY] = getSquareFromCoordinates(
    originalPosition[0],
    originalPosition[1]
  );
  updatePiecePosition([fromX, fromY], [toX, toY]);
  currentPiece.style.zIndex = 5;
}

function updatePiecePosition(from: number[], to: number[]) {
  currentPiece.remove();
  board.movePieve(from, to);

  renderPieces();
}

function movePiece(event: any) {
  event.preventDefault();
  if (boardElement) {
    if (isDown) {
      currentPosition = [event.clientX, event.clientY];
      currentPiece.style.transform = `translate(${
        currentPosition[0] - originalPosition[0]
      }px, ${currentPosition[1] - originalPosition[1]}px)`;
    }
  }
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
      if (spot.piece) {
        const color = spot.getPieceColor();
        const type = spot.getPieceName();
        // get the notation of the square
        const [x, y] = spot.getCoordinates();
        const notation = fileLetters[x] + (y + 1);
        const squareElement = document.getElementById(notation);
        console.log('squareElement: ', squareElement);
        if (!squareElement?.firstChild) {
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
        } else {
          // Adding piece to board
          const pieceElement = document.createElement('i');
          pieceElement.classList.add(
            'fa-3x',
            'fa-solid',
            type ? `fa-chess-${type}` : '',
            color ? color : ''
          );
          squareElement.replaceChild(pieceElement, squareElement.firstChild);
        }
      }
    }
  }
}

function main(): void {
  board.initGame();
  renderBoard();
  renderPieces();
}
main();
