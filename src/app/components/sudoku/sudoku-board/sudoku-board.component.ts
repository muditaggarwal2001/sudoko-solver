import { Component, Input, OnInit } from '@angular/core';
import { Util } from '../../../shared/Util';
import { sudoku, cell } from '../../../interfaces/sudoku';

@Component({
  selector: 'app-sudoku-board',
  templateUrl: './sudoku-board.component.html',
  styleUrls: ['./sudoku-board.component.scss']
})
export class SudokuBoardComponent {

  @Input() readOnly: boolean =false;
  @Input() grid: sudoku | undefined;
  constructor() {
   // this.grid = Util.createBaseSudoku();
  }

  cellChanged(event: any, row: number, col: number) {
    if(this.grid) {
      this.grid[row][col].value = +event.data || undefined;
      console.log(this.grid, event);
    }
  }

}
