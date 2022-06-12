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
    console.log(this.piece);
    console.log(this.isOccupied());
    if (this.isOccupied()) {
      this.removePiece();
    }
    console.log(this.piece);
    console.log(this.isOccupied());
    this.piece = piece;
    this.piece.setPiecePosition(this.x, this.y);
    console.log(this.piece);
    console.log(this.piece, this.x, this.y);
  }
  isOccupied(): boolean {
    return this.piece !== null;
  }
  removePiece(): Piece {
    const piece = this.piece;
    this.piece = null;
    return piece;
  }

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
