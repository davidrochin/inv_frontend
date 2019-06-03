import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSearchDialogComponent } from './item-search-dialog.component';

describe('ItemSearchDialogComponent', () => {
  let component: ItemSearchDialogComponent;
  let fixture: ComponentFixture<ItemSearchDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemSearchDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
