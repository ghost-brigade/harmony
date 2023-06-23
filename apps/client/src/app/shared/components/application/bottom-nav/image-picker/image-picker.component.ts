import { Component, Input, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilePicker } from "@capawesome/capacitor-file-picker";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { ToastService } from "apps/client/src/app/core/components/toast/toast.service";

@Component({
  selector: "harmony-image-picker",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./image-picker.component.html",
  styleUrls: ["./image-picker.component.css"],
})
export class ImagePickerComponent {
  @Input() open = false;

  toastService = inject(ToastService);

  async addFiles() {
    const result = await FilePicker.pickMedia({
      multiple: true,
    });
    console.log(result);
  }

  async openCamera() {
    console.log("open camera");
    const perms = await Camera.checkPermissions();
    console.log(perms);
    if (perms.camera === "denied" || perms.photos === "denied") {
      const req = await Camera.requestPermissions({
        permissions: ["camera", "photos"],
      });
      console.log(req);
      if (req.camera === "denied") {
        this.toastService.show({
          message: "CAMERA_PERMISSION_DENIED",
          type: "error",
          delay: 5000,
        });
        return;
      }
    }
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      source: CameraSource.Camera,
      resultType: CameraResultType.Uri,
    });
    console.log(image);
  }
}
