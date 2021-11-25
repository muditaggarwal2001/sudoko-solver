import { ComponentFixture, TestBed } from '@angular/core/testing';
import { digits } from '../../shared/constants';

import { SudokuComponent } from './sudoku.component';

describe('SudokuComponent', () => {
  let component: SudokuComponent;
  let fixture: ComponentFixture<SudokuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SudokuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SudokuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.problemGrid).toBeDefined();
    expect(component.solutionGrid).toBeDefined();
    expect(component.problemControl).toBeDefined();
  });

  it("should convert the norvig's input format to problem grid", () => {
    const problem = "4.....0.0.0....................................................................7.";
    component.convertNorvigsFormatToProblemGrid(problem);
    for (let i = 0; i< 9; i++) {
      for (let j = 0; j< 9; j++) {
        if(i === 0 && j === 0) {
          expect(component.problemGrid[i][j].value).toEqual(4);
        } else if( i === 8 && j === 7) {
          expect(component.problemGrid[i][j].value).toEqual(7);
        } else {
          expect(component.problemGrid[i][j].value).toEqual(undefined);
        }

      }
    }
  });

  it("should convert the norvig's input format to problem grid from the problem input field", () => {
    const problem = "4.....0.0.0....................................................................7.";
    component.problemControl.patchValue(problem);
    component.submitProblem();
    for (let i = 0; i< 9; i++) {
      for (let j = 0; j< 9; j++) {
        if(i === 0 && j === 0) {
          expect(component.problemGrid[i][j].value).toEqual(4);
        } else if( i === 8 && j === 7) {
          expect(component.problemGrid[i][j].value).toEqual(7);
        } else {
          expect(component.problemGrid[i][j].value).toEqual(undefined);
        }

      }
    }

  });

  it('should initialize the setup required to solve sudoku', () => {
    component.unitlist = [];
    component.initializeSetup();

    expect(component.squares.length).toEqual(81);
    expect(component.unitlist.length).toEqual(27);
    for( let s of component.squares) {
      expect(component.units[s].length).toEqual(3);
      expect(component.peers[s].length).toEqual(20);
      expect(component.values[s]).toEqual(digits);
    }
  });

  it("should solve the input problem", () => {
    const problem = '4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......';
    const solution = '417369825632158947958724316825437169791586432346912758289643571573291684164875293';
    component.problemControl.patchValue(problem);
    component.submitProblem();
    component.solveProblem();
    for (let i = 0; i< 9; i++) {
      for (let j = 0; j< 9; j++) {
        expect(component.solutionGrid[i][j].value).toEqual(+solution.charAt((i*9)+j));
      }
    }
  });

});
