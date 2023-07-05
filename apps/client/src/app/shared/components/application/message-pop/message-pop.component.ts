import { Component, computed, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MessagePopService } from "./message-pop.service";

@Component({
  selector: "harmony-message-pop",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./message-pop.component.html",
  styleUrls: ["./message-pop.component.css"],
})
export class MessagePopComponent {
  messagePopService = inject(MessagePopService);
  $open = computed(() => this.messagePopService.$isOpen());
  $message = computed(() => this.messagePopService.$message());
  close() {
    this.messagePopService.close();
  }
}
