import { TestBed } from "@angular/core/testing";
import { AlertService } from "./alert.service";
import { AlertKind } from "./alert.model";
import { I18nKey } from "../../constants/i18n.constants";

describe("AlertService", () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should be able to show an alert", () => {
    const config = {
      message: "TEST_MESSAGE" as I18nKey,
      type: "error" as AlertKind,
    };
    service.show(config);

    expect(service.$message()).toEqual(config.message);
    expect(service.$type()).toEqual(config.type);
    expect(service.$visible()).toBeTruthy();
  });

  it("should be able to dismiss an alert", () => {
    service.dismiss();
    expect(service.$visible()).toBeFalsy();
  });
});
