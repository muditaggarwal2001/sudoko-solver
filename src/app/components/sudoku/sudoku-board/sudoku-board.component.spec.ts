import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Util } from '../../../shared/Util';

import { SudokuBoardComponent } from './sudoku-board.component';

describe('SudokuBoardComponent', () => {
  let component: SudokuBoardComponent;
  let fixture: ComponentFixture<SudokuBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SudokuBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SudokuBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reflect the change in grid when cell is changed with number', () => {
    component.grid = Util.createBaseSudoku();
    expect(component.grid.length).toEqual(9);
    expect(component.grid[0].length).toEqual(9);

    component.cellChanged({ data: '8'}, 1 , 1);
    expect(component.grid[1][1].value).toEqual(8)
  });

  it('should reflect the change in grid when cell is changed with number', () => {
    component.grid = Util.createBaseSudoku();

    component.cellChanged({ data: ''}, 1 , 1);
    expect(component.grid[1][1].value).toEqual(undefined);
  });

});
