import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FtxToastComponent } from './ftx-toast.component';

describe('FtxToastComponent', () => {
  let component: FtxToastComponent;
  let fixture: ComponentFixture<FtxToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FtxToastComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FtxToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
