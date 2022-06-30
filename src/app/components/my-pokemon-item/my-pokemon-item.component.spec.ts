import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPokemonItemComponent } from './my-pokemon-item.component';

describe('MyPokemonItemComponent', () => {
  let component: MyPokemonItemComponent;
  let fixture: ComponentFixture<MyPokemonItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyPokemonItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPokemonItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
