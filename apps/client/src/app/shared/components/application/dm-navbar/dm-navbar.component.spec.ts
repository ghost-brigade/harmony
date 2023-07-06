import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DmNavbarComponent } from "./dm-navbar.component";

describe("DmNavbarComponent", () => {
  let component: DmNavbarComponent;
  let fixture: ComponentFixture<DmNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DmNavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DmNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
