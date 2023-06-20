import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AlertComponent } from "./alert.component";
import { AlertService } from "./alert.service";
import { AlertKind } from "./alert.model";

describe("AlertComponent", () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  let alertService: AlertService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AlertComponent],
      providers: [AlertService], // Add AlertService to providers.
    });

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    alertService = TestBed.inject(AlertService); // Inject AlertService.
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set styles based on alert type", () => {
    const testCases = [
      {
        type: "success",
        alertStyle:
          "text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400",
        buttonStyle:
          "bg-green-50 text-green-500 focus:ring-green-400 hover:bg-green-200 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700",
      },
      {
        type: "error",
        alertStyle: "text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400",
        buttonStyle:
          "bg-red-50 text-red-500 focus:ring-red-400 hover:bg-red-200 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700",
      },
      {
        type: "info",
        alertStyle:
          "text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400",
        buttonStyle:
          "bg-blue-50 text-blue-500 focus:ring-blue-400 hover:bg-blue-200 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700",
      },
      {
        type: "warning",
        alertStyle:
          "text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300",
        buttonStyle:
          "bg-yellow-50 text-yellow-500 focus:ring-yellow-400 hover:bg-yellow-200 dark:bg-gray-800 dark:text-yellow-300 dark:hover:bg-gray-700",
      },
      {
        type: "other",
        alertStyle: "bg-gray-50 dark:bg-gray-800",
        buttonStyle:
          "bg-gray-50 text-gray-500 focus:ring-gray-400 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white",
      },
    ];

    testCases.forEach((testCase) => {
      alertService.$message.set("EMPTY");
      alertService.$type.set(testCase.type as AlertKind);
      fixture.detectChanges();
      expect(component.$alertStyle()).toBe(testCase.alertStyle);
      expect(component.$buttonStyle()).toBe(testCase.buttonStyle);
      expect(component.$type()).toBe(testCase.type);
      expect(component.$message()).toBe("EMPTY");
    });
  });

  it("should call AlertService dismiss when dismiss is called", () => {
    const dismissSpy = jest.spyOn(alertService, "dismiss");
    component.dismiss();
    expect(dismissSpy).toHaveBeenCalled();
  });
});
