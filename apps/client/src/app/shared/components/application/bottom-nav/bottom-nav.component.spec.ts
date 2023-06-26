import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BottomNavComponent } from "./bottom-nav.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe("BottomNavComponent", () => {
  let component: BottomNavComponent;
  let fixture: ComponentFixture<BottomNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomNavComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BottomNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
