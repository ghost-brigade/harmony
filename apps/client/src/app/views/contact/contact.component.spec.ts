import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ContactComponent } from "./contact.component";

describe("ToastComponent", () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ContactComponent, RouterTestingModule],
    });

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
