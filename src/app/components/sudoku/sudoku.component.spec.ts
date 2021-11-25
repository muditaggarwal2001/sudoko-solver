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

  it("should eliminate rest of candidate value when assigning a value to a cell", () => {
    const spy = spyOn(component, 'eliminate').and.callThrough();
    component.assign(component.values, '00', '1');
    expect(component.values['00']).toEqual('1');
    expect(spy).toHaveBeenCalledTimes(28); // 8 candidate values and 20 peers
  });

  it("should eliminate selected value from peers when 2nd last candidate value is removed", () => {
    const spy = spyOn(component, 'eliminate').and.callThrough();
    component.values['00']='12';
    component.eliminate(component.values, '00', '2');
    expect(component.values['00']).toEqual('1');
    expect(spy).toHaveBeenCalledTimes(21);
  });

  it('should call assign on one of the peers when it is only one that has that value as its candidate', () => {
    const spy = spyOn(component, 'assign').and.callThrough();
    const value = '12345678';
    for(let i = 0; i< 9; i++) {
      component.values['0'+i] = value;
    }
    component.values['08'] = '129';
    component.values['01'] = '129';
    component.eliminate(component.values, '01', '9');
    expect(component.values['08']).toEqual('9');
    expect(spy).toHaveBeenCalled();
  });

  it('should return false when on assigning get contradiction on elimination', () => {
    component.values['08'] = '9';
    component.values['00'] = '89';
    const result = component.assign(component.values, '00', '9');
    expect(result).toBeFalsy();
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
