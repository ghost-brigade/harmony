import { TestBed } from "@angular/core/testing";
import { I18nPipe } from "./i18n.pipe";
import { I18nService } from "../services/i18n.service";
import { I18nKey } from "../constants/i18n.constants";

describe("I18nPipe", () => {
  let pipe: I18nPipe;
  let i18nService: I18nService;
  let getTranslationSpy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [I18nService],
    });

    i18nService = TestBed.inject(I18nService);
    getTranslationSpy = jest.spyOn(i18nService, "getTranslation");
    pipe = new I18nPipe(i18nService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("create an instance", () => {
    expect(pipe).toBeTruthy();
  });

  it("should return the correct translation", () => {
    const testCases = [
      { key: "testKey1", translation: "testTranslation1" },
      { key: "testKey2", translation: "testTranslation2" },
    ];

    testCases.forEach((testCase) => {
      getTranslationSpy.mockReturnValueOnce(testCase.translation);

      expect(pipe.transform(testCase.key as I18nKey)).toBe(
        testCase.translation
      );
      expect(getTranslationSpy).toHaveBeenCalledWith(testCase.key);
    });
  });
});
