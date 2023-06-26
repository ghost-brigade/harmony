import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: "harmony-direct-messages",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./direct-messages.component.html",
  styleUrls: ["./direct-messages.component.css"],
})
export class DirectMessagesComponent {}
