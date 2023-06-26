import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { HomeFooterComponent } from "./footer.component";

describe("ToastComponent", () => {
  let component: HomeFooterComponent;
  let fixture: ComponentFixture<HomeFooterComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HomeFooterComponent, RouterTestingModule],
    });

    fixture = TestBed.createComponent(HomeFooterComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
