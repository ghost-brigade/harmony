import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AvatarComponent } from "./avatar.component";
import { By } from "@angular/platform-browser";

describe("AvatarComponent", () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should show an img tag when image is provided", () => {
    component.image = "test-image.png";
    fixture.detectChanges();

    const imageElement = fixture.debugElement.query(By.css("img"));
    expect(imageElement).toBeTruthy();
    expect(imageElement.nativeElement.src).toContain("test-image.png");
  });

  it("should show svg tag when image is not provided", () => {
    component.image = "";
    fixture.detectChanges();

    const imageElement = fixture.debugElement.query(By.css("img"));
    const svgElement = fixture.debugElement.query(By.css("svg"));
    expect(imageElement).toBeFalsy();
    expect(svgElement).toBeTruthy();
  });

  it("should show status when status is provided", () => {
    component.status = "green";
    fixture.detectChanges();

    const statusElement = fixture.debugElement.query(By.css("span"));
    expect(statusElement).toBeTruthy();
    expect(statusElement.nativeElement.classList).toContain("bg-green-400");
  });

  it("should not show status when status is not provided", () => {
    component.status = "";
    fixture.detectChanges();

    const statusElement = fixture.debugElement.query(By.css("span"));
    expect(statusElement).toBeFalsy();
  });
});
