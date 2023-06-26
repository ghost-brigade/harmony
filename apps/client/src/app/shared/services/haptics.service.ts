import { Injectable } from "@angular/core";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

@Injectable({
  providedIn: "root",
})
export class HapticsService {
  async haptics(impactStyle: ImpactStyle = ImpactStyle.Light) {
    await Haptics.impact({
      style: impactStyle,
    });
  }
}
