import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FtxEmptyComponent } from './ftx-empty.component';

describe('FtxEmptyComponent', () => {
  let component: FtxEmptyComponent;
  let fixture: ComponentFixture<FtxEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FtxEmptyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FtxEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
