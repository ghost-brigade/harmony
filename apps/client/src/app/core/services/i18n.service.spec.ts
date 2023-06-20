import { TestBed } from "@angular/core/testing";
import { I18nService } from "./i18n.service";

describe("I18nService", () => {
  let service: I18nService;
  let localStorageSpy: jest.SpyInstance;
  let navigatorSpy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [I18nService],
    });

    service = TestBed.inject(I18nService);
    localStorageSpy = jest.spyOn(
      Object.getPrototypeOf(localStorage),
      "getItem"
    );
    navigatorSpy = jest.spyOn(window.navigator, "language", "get");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should set the language to en-US if it doesn't exist in keys", () => {
    localStorageSpy.mockReturnValue("en-GB");
    service.getUserLanguage();
    expect(service.language()).toBe("en-US");
  });

  it("should get user language from navigator and set to en-US if doesn't exist", () => {
    localStorageSpy.mockReturnValue(null);
    navigatorSpy.mockReturnValue("en-GB");
    service.getUserLanguage();
    expect(service.language()).toBe("en-US");
  });

  it("should set keep the language if it exists in keys", () => {
    localStorageSpy.mockReturnValue("en-US");
    service.getUserLanguage();
    expect(service.language()).toBe("en-US");
  });

  it("should set the language to en-US if there is no navigator or localStorage value", () => {
    localStorageSpy.mockReturnValue(null);
    navigatorSpy.mockReturnValue(null);
    service.getUserLanguage();
    expect(service.language()).toBe("en-US");
  });

  it("should return translation for a given key", () => {
    // assuming 'welcome' key exists in I18N_CONSTANTS for 'en-US' locale and it translates to 'Welcome'
    expect(service.getTranslation("APP_NAME")).toBe("Harmony");
  });

  it("should return key if translation does not exist", () => {
    expect(service.getTranslation("INVALID_KEY")).toBe("INVALID_KEY");
  });
});
