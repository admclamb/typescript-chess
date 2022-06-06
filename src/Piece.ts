import { Pawn } from './pieces/Pawn';
import { Rook } from './pieces/Rook';
import { Knight } from './pieces/Knight';
import { Bishop } from './pieces/Bishop';
import { Queen } from './pieces/Queen';
import { King } from './pieces/King';

export class Piece {
  private color: string;
  private x: number | null;
  private y: number | null;
  private type: any;
  constructor(color: string, type: string) {
    this.color = color;
    this.x = null;
    this.y = null;
    switch (type) {
      case 'rook':
        this.type = new Rook();
        break;
      case 'bishop':
        this.type = new Bishop();
        break;
      case 'knight':
        this.type = new Knight();
        break;
      case 'queen':
        this.type = new Queen();
        break;
      case 'king':
        this.type = new King();
        break;
      case 'pawn':
        this.type = new Pawn();
        break;
      default:
        this.type = null;
    }
  }
  public setPiecePosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
  public getPosition() {
    return [this.x, this.y];
  }
  public getX(): number | null {
    return this.x;
  }
  public getY(): number | null {
    return this.y;
  }
  public getColor(): string {
    return this.color;
  }
  public getName(): string {
    return this.type.name;
  }
}
