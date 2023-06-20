import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { HomeNavbarComponent } from "./navbar.component";

describe("ToastComponent", () => {
  let component: HomeNavbarComponent;
  let fixture: ComponentFixture<HomeNavbarComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HomeNavbarComponent, RouterTestingModule],
    });

    fixture = TestBed.createComponent(HomeNavbarComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
