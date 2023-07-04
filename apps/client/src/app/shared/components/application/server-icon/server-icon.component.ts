import { AfterViewInit, Component, Input } from "@angular/core";
import { NgIf } from "@angular/common";

@Component({
  selector: "harmony-server-icon",
  standalone: true,
  imports: [NgIf],
  templateUrl: "./server-icon.component.html",
})
export class ServerIconComponent implements AfterViewInit {
  @Input() image: string | undefined = "";
  @Input() title = "";
  @Input() size = "h-8 w-8";

  ngAfterViewInit() {
    const svg = document.getElementById("dynamicFontSvg");
    const textElement = document.getElementById("dynamicFontSize");

    if (svg && textElement) {
      const svgWidth = svg.getBoundingClientRect().width;
      console.log(svgWidth);
      const fontSize = svgWidth * 0.8;
      textElement.setAttribute("font-size", fontSize + "px");
    }
  }
}
