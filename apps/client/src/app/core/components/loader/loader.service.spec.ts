import { TestBed } from "@angular/core/testing";

import { LoaderService } from "./loader.service";

describe("LoaderService", () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should be able to show the loader", () => {
    service.show();
    expect(service.$isOpen()).toBeTruthy();
  });

  it("should be able to hide the loader", () => {
    service.hide();
    expect(service.$isOpen()).toBeFalsy();
  });
});
