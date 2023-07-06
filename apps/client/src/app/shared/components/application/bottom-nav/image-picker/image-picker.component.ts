import { Component, Input, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilePicker } from "@capawesome/capacitor-file-picker";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { ToastService } from "apps/client/src/app/core/components/toast/toast.service";
import { ServerService } from "apps/client/src/app/views/application/server/server.service";
import { BottomNavService } from "../bottom-nav.service";
import { I18nPipe } from "apps/client/src/app/core/pipes/i18n.pipe";

@Component({
  selector: "harmony-image-picker",
  standalone: true,
  imports: [CommonModule, I18nPipe],
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
      readData: true,
    });
    const file = this.b64toBlob(result.files[0].data as string);
    this.serverService.$file.set(file);
    this.bottomNavService.$addFilesOpen.set(false);
  }

  async openCamera() {
    const perms = await Camera.checkPermissions();
    if (perms.camera === "denied" || perms.photos === "denied") {
      const req = await Camera.requestPermissions({
        permissions: ["camera", "photos"],
      });
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
      quality: 70,
      allowEditing: false,
      source: CameraSource.Camera,
      resultType: CameraResultType.Uri,
      width: 1200,
      height: 1200,
    });
    if (image.webPath) {
      const file = await fetch(image.webPath);
      const blob = await file.blob();
      this.serverService.$file.set(blob);
      this.bottomNavService.$addFilesOpen.set(false);
    }
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
