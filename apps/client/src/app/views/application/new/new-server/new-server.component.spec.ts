import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NewServerComponent } from "./new-server.component";

describe("NewServerComponent", () => {
  let component: NewServerComponent;
  let fixture: ComponentFixture<NewServerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NewServerComponent],
    });
    fixture = TestBed.createComponent(NewServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
