import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { LogoComponent } from "./logo.component";

describe("LogoComponent", () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have default mainClasses as h-10 w-10", () => {
    expect(component.mainClasses).toBe("h-10 w-10");
  });

  it("should have default borderClasses as fill-black stroke-black", () => {
    expect(component.borderClasses).toBe("fill-black stroke-black");
  });

  it("should have default colorClasses as fill-[#ffff7f] stroke-[#ffff7f]", () => {
    expect(component.colorClasses).toBe("fill-[#ffff7f] stroke-[#ffff7f]");
  });

  it("should apply passed classes to svg element", () => {
    component.mainClasses = "custom-main";
    component.borderClasses = "custom-border";
    component.colorClasses = "custom-color";
    fixture.detectChanges();

    const svgElement = fixture.debugElement.query(By.css("svg"));
    expect(svgElement.classes["custom-main"]).toBeTruthy();
    const pathElement = fixture.debugElement.query(By.css("path"));
    expect(pathElement.classes["custom-border"]).toBeTruthy();
  });
});
