import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { TermsComponent } from "./terms.component";

describe("ToastComponent", () => {
  let component: TermsComponent;
  let fixture: ComponentFixture<TermsComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [TermsComponent, RouterTestingModule],
    });

    fixture = TestBed.createComponent(TermsComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
