import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ServerNavbarComponent } from "./server-navbar.component";

describe("ServerNavbarComponent", () => {
  let component: ServerNavbarComponent;
  let fixture: ComponentFixture<ServerNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerNavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServerNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
