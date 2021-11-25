import { Component, Input } from '@angular/core';
import { sudoku } from '../../../interfaces/sudoku';

@Component({
  selector: 'app-sudoku-board',
  templateUrl: './sudoku-board.component.html',
  styleUrls: ['./sudoku-board.component.scss']
})
export class SudokuBoardComponent {

  @Input() readOnly: boolean =false;
  @Input() grid: sudoku | undefined;

  cellChanged(event: any, row: number, col: number) {
    if(this.grid) {
      this.grid[row][col].value = +event.data || undefined;
    }
  }

}
