import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CelebritieComponent } from './celebritie.component';

describe('CelebritieComponent', () => {
  let component: CelebritieComponent;
  let fixture: ComponentFixture<CelebritieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CelebritieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CelebritieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
