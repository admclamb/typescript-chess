import { Board } from './Board';

const gameBoard = new Board();
const boardElement = document.querySelector('#board');
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

function renderPieces(): void {}

renderBoard();
