import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HomeNavbarComponent } from "./navbar.component";

describe("NavbarComponent", () => {
  let component: HomeNavbarComponent;
  let fixture: ComponentFixture<HomeNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeNavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});