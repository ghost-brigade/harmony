import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { ToastComponent } from "./toast.component";
import { ToastService } from "./toast.service";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe("ToastComponent", () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let toastService: ToastService;
  let dismissSpy: jest.SpyInstance;
  let timeoutSpy: jest.SpyInstance;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ToastComponent, NoopAnimationsModule],
      providers: [ToastService],
    });

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    toastService = TestBed.inject(ToastService);

    // Setup spies.
    dismissSpy = jest.spyOn(toastService, "dismiss");
    timeoutSpy = jest.spyOn(window, "setTimeout");
    timeoutSpy.mockImplementation((callback, delay) => {
      setTimeout(callback, delay);
      return delay;
    });

    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call ToastService dismiss after delay", fakeAsync(() => {
    toastService.$visible.set(true);
    toastService.$delay.set(1000);
    fixture.detectChanges();

    tick(1000);
    expect(dismissSpy).toHaveBeenCalled();
  }));

  it("should not call ToastService dismiss if not visible", fakeAsync(() => {
    toastService.$visible.set(false);
    toastService.$delay.set(1000);
    fixture.detectChanges();

    tick(1000);
    expect(dismissSpy).not.toHaveBeenCalled();
  }));

  it("should call ToastService dismiss when dismiss is called", () => {
    component.dismiss();
    expect(dismissSpy).toHaveBeenCalled();
  });
});
