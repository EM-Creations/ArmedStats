import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerlistComponent } from './serverlist.component';

describe('ServerlistComponent', () => {
  let component: ServerlistComponent;
  let fixture: ComponentFixture<ServerlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
