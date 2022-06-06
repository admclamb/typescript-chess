import { Piece } from './Piece';

export class Spot {
  private x: number;
  private y: number;
  public piece: any;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.piece = null;
  }
  getCoordinates(): number[] {
    return [this.x, this.y];
  }

  occupySpot(piece: Piece): void {
    this.piece = piece;
    this.piece.setPiecePosition(this.x, this.y);
  }
  isOccupied(): boolean {
    return this.piece !== null;
  }
  removePiece(): any {}

  getPieceColor(): string | null {
    if (!this.piece) {
      return null;
    }
    return this.piece.getColor();
  }
  getPieceName(): string | null {
    if (!this.piece) {
      return null;
    }
    return this.piece.getName();
  }
}
