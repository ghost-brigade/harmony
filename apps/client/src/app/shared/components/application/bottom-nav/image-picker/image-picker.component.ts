import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilePicker } from "@capawesome/capacitor-file-picker";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { ToastService } from "apps/client/src/app/core/components/toast/toast.service";
import { ServerService } from "apps/client/src/app/views/application/server/server.service";
import { BottomNavService } from "../bottom-nav.service";

@Component({
  selector: "harmony-image-picker",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./image-picker.component.html",
  styleUrls: ["./image-picker.component.css"],
})
export class ImagePickerComponent {
  @Input() open = false;
  serverService = inject(ServerService);
  toastService = inject(ToastService);
  bottomNavService = inject(BottomNavService);

  async addFiles() {
    const result = await FilePicker.pickImages({
      multiple: false,
    });
    this.serverService.$file.set(result.files[0].blob);
    this.bottomNavService.$addFilesOpen.set(false);
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
    if (image.webPath) {
      const file = await fetch(image.webPath);
      console.log(file);
      const blob = await file.blob();
      this.serverService.$file.set(blob);
      this.bottomNavService.$addFilesOpen.set(false);
    }

    console.log(image);
  }

  b64toBlob = (b64Data: string, contentType = "", sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };
}
