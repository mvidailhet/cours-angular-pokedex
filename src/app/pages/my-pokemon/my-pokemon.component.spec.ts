import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPokemonComponent } from './my-pokemon.component';

describe('MyPokemonComponent', () => {
  let component: MyPokemonComponent;
  let fixture: ComponentFixture<MyPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyPokemonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
