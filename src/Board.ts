import { Spot } from './Spot';
import { Piece } from './Piece';
export class Board {
  public spots: Spot[][];
  constructor() {
    // 2D array representing the positions of a spots starting
    // from 8 - 1 on the file and a - h by default'
    this.spots = [[], [], [], [], [], [], [], []];
    const fileLength = 8;
    const rankLength = 8;
    for (let y: number = 0; y < fileLength; y++) {
      for (let x: number = 0; x < rankLength; x++) {
        this.spots[y][x] = new Spot(x, y);
      }
    }
  }

  public getSpot(x: number, y: number): Spot {
    return this.spots[y][x];
  }

  public initGame() {
    // Init white pices
    const rankLength = 8;
    let color = 'white';
    this.spots[0][0].occupySpot(new Piece(color, 'rook'));
    this.spots[0][1].occupySpot(new Piece(color, 'knight'));
    this.spots[0][2].occupySpot(new Piece(color, 'bishop'));
    this.spots[0][3].occupySpot(new Piece(color, 'queen'));
    this.spots[0][4].occupySpot(new Piece(color, 'king'));
    this.spots[0][5].occupySpot(new Piece(color, 'bishop'));
    this.spots[0][6].occupySpot(new Piece(color, 'knight'));
    this.spots[0][7].occupySpot(new Piece(color, 'rook'));
    // Init pawns
    for (let x = 0; x < rankLength; x++) {
      this.spots[1][x].occupySpot(new Piece(color, 'pawn'));
    }
    // Init black pieces
    color = 'black';
    this.spots[7][0].occupySpot(new Piece(color, 'rook'));
    this.spots[7][1].occupySpot(new Piece(color, 'knight'));
    this.spots[7][2].occupySpot(new Piece(color, 'bishop'));
    this.spots[7][3].occupySpot(new Piece(color, 'queen'));
    this.spots[7][4].occupySpot(new Piece(color, 'king'));
    this.spots[7][5].occupySpot(new Piece(color, 'bishop'));
    this.spots[7][6].occupySpot(new Piece(color, 'knight'));
    this.spots[7][7].occupySpot(new Piece(color, 'rook'));
    // Init pawns
    for (let x = 0; x < rankLength; x++) {
      this.spots[6][x].occupySpot(new Piece(color, 'pawn'));
    }
  }
}
