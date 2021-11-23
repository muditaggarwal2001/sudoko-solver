import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { sudoku } from 'src/app/interfaces/sudoku';
import { Util } from 'src/app/shared/Util';

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.scss']
})
export class SudokuComponent implements OnInit {
  problemGrid: sudoku;
  solutionGrid: sudoku;
  problemControl: FormControl;
  constructor() {
    this.problemControl = new FormControl('', [Validators.minLength(81), Validators.maxLength(81)]);
    this.problemGrid = Util.createBaseSudoku();
    this.solutionGrid = Util.createBaseSudoku();
  }

  ngOnInit(): void {
    const baseProblem = '003020600900305001001806400008102900700000008006708200002609500800203009005010300';
    this.convertNorvigsFormatToProblemGrid(baseProblem);
  }

  convertNorvigsFormatToProblemGrid(problem: string) {
    for(let i = 0; i < problem.length; i++) {
      const row = (i - ( i % 9))/9;
      const col = i%9;
      this.problemGrid[row][col].value = (problem[i] === '0' || problem[i] === '.') ? undefined : (+problem[i]);
      if(this.problemGrid[row][col].value)
        this.problemGrid[row][col].readonly = true;
    }
  }

  submitProblem() {
    this.convertNorvigsFormatToProblemGrid(this.problemControl.value);
  }

  solveProblem() {

  }

}
