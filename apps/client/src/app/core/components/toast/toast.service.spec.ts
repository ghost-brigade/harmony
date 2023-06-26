import { TestBed } from "@angular/core/testing";

import { ToastService } from "./toast.service";
import { I18nKey } from "../../constants/i18n.constants";
import { ToastKind } from "./toast.model";

describe("ToastService", () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should be able to show the toast", () => {
    const config = {
      message: "TEST_MESSAGE" as I18nKey,
      type: "error" as ToastKind,
    };
    service.show({
      message: config.message,
      type: config.type,
    });
    expect(service.$visible()).toBeTruthy();
  });

  it("should be able to hide the loader", () => {
    service.dismiss();
    expect(service.$visible()).toBeFalsy();
  });
});
