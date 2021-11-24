import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { sudoku } from 'src/app/interfaces/sudoku';
import { digits, rowsCols, unitRowsCols } from 'src/app/shared/constants';
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

  values = {} as any;
  squares: string[] = [];
  units = {} as any;
  unitlist: string[][] = [];
  peers = {} as any;
  error = false;

  constructor() {
    this.problemControl = new FormControl('', [Validators.minLength(81), Validators.maxLength(81)]);
    this.problemGrid = Util.createBaseSudoku();
    this.solutionGrid = Util.createBaseSudoku();
  }

  ngOnInit(): void {
    const baseProblem = '003020600900305001001806400008102900700000008006708200002609500800203009005010300';
    this.convertNorvigsFormatToProblemGrid(baseProblem);
    this.initializeSetup()
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

  initializeSetup() {
    this.squares = this.cross(rowsCols, rowsCols);
    for( let item of rowsCols) {
      this.unitlist.push( this.cross(rowsCols, [item]) );
      this.unitlist.push( this.cross([item], rowsCols) );
    }

    for (let item of unitRowsCols) {
      for(let item2 of unitRowsCols) {
        this.unitlist.push( this.cross(item, item2));
      }
    }

    for (let s of this.squares){
      this.units[s] = [];
      for (let unit of this.unitlist)
        if (unit.includes(s))
          this.units[s].push(unit);
    }

    for (let s of this.squares) {
      this.peers[s] = [];
      for (let unit of this.units[s]){
        for (let sq of unit)
          if (sq !== s && !this.peers[s].includes(sq))
            this.peers[s].push(sq);
      }
    }

    this.resetValues();

  }

  private resetValues() {
    for (let i = 0; i <= 8; i++) {
      for (let j = 0; j <= 8; j++) {
        this.values[i+''+j] = digits;
      }
    }
  }

  private cross(a: string[], b: string[]) {
    let c = [];
    for( let i in a) {
      for (let j in b) {
        c.push(a[i]+b[j]);
      }
    }
    return c;
  }

  submitProblem() {
    this.error = false;
    this.convertNorvigsFormatToProblemGrid(this.problemControl.value);
  }

  solveProblem() {
    this.error = false;
    console.time("solving");
    let result = this.search( this.parseGrid() );
    console.timeEnd("solving");
    if (result) {

      for( let i = 0; i < 9; i ++) {
        for(let j = 0; j < 9; j ++) {
          this.solutionGrid[i][j].value = +result[i + '' + j];
        }
      }

    } else {
      this.error = true;
    }
    this.resetValues();
  }

  assign(values: any, square: string, digit: string): any {
    let result = true;
    let squareValue = values[square];
    for (var d = 0; d < squareValue.length; d++) {
      if(!result) {
        return false
      }
      if (squareValue.charAt(d) != digit)
        result &&= (this.eliminate(values, square, squareValue.charAt(d)) ? true : false);
    }

    return (result ? values : false);
  }

  eliminate(values: any, square: string, digit: string): any {
    if(values[square].indexOf(digit) === -1) {
      // digit already removed
      return values;
    }
    values[square] = values[square].replace(digit, "");

    if(values[square].length === 0) {
      return false;
    } else if (values[square].length === 1) {
      // There is only one value. It will become this cell's value. Should remove this value from it's peers.
      let result = true;
      for( let peer of this.peers[square]) {
        result &&= (this.eliminate(values, peer, values[square]) ? true : false);
        if(!result) {
          return false;
        }
      }
    }

    for(let unit of this.units[square]) {
      let digitPlaces = [];
      for( let sq of unit) {
        if(values[sq].indexOf(digit) !== -1) {
          digitPlaces.push(sq);
        }
      }

      if(digitPlaces.length === 0) {
        return false;
      } else if(digitPlaces.length === 1) {
        if( !this.assign(values, digitPlaces[0], digit)) {
          return false;
        }
      }
    }

    return values;
  }

  parseGrid() {
    for( let i = 0; i < 9; i ++) {
      for(let j = 0; j < 9; j ++) {
        if(this.problemGrid[i][j].value && !this.assign(this.values, (i+''+j), this.problemGrid[i][j].value+'')){
          return false;
        }
      }
    }
    return this.values;
  }

  search(sudokuValues: any): any {
    if (!sudokuValues)
      return false;

    let min = 10;
    let minSquare;
    for (let s of this.squares) {
      if(sudokuValues[s].length > 1 && sudokuValues[s].length < min) {
        min = sudokuValues[s].length;
        minSquare = s;
      }
    }

    if(!minSquare) {
      // solved
      return sudokuValues;
    }

    for (let d = 0; d < sudokuValues[minSquare].length; d++){
      let result = this.search(
                      this.assign(
                                  Object.assign({},sudokuValues),
                                  minSquare,
                                  sudokuValues[minSquare].charAt(d)
                                )
                  );
      if (result)
        return result;
    }
    return false;
  }

}
