import { TestBed } from "@angular/core/testing";
import { BottomNavService } from "./bottom-nav.service";

describe("BottomNavService", () => {
  let service: BottomNavService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BottomNavService],
    });

    service = TestBed.inject(BottomNavService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should set $isTextChannel to true when showMessageBar is called", () => {
    service.showMessageBar();

    expect(service.$isTextChannel()).toBe(true);
  });

  it("should set $isTextChannel to false when hideMessageBar is called", () => {
    service.$isTextChannel.set(true);
    service.hideMessageBar();

    expect(service.$isTextChannel()).toBe(false);
  });
});
