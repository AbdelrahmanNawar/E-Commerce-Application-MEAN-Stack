import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotedProductsComponent } from './promoted-products.component';

describe('PromotedProductsComponent', () => {
  let component: PromotedProductsComponent;
  let fixture: ComponentFixture<PromotedProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotedProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
