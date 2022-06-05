export class Board {
  public board: string[][];
  constructor() {
    // 2D array representing the positions of a board starting
    // from 8 - 1 on the file and a - h by default
    this.board = [
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
    ];
  }

  public getSpot(x: number, y: number): string {
    return this.board[y][x];
  }
}
