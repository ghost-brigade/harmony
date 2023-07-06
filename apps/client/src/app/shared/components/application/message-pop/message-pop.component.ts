import { Component, computed, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MessagePopService } from "./message-pop.service";
import { FormsModule } from "@angular/forms";
import { Dialog } from "@capacitor/dialog";
import { MESSAGE_POP_ANIMATION } from "./message-pop.animation";
import { I18nPipe } from "apps/client/src/app/core/pipes/i18n.pipe";

@Component({
  selector: "harmony-message-pop",
  standalone: true,
  imports: [CommonModule, FormsModule, I18nPipe],
  templateUrl: "./message-pop.component.html",
  styleUrls: ["./message-pop.component.css"],
  animations: MESSAGE_POP_ANIMATION,
})
export class MessagePopComponent {
  messagePopService = inject(MessagePopService);
  $open = computed(() => this.messagePopService.$isOpen());
  $message = computed(() => {
    return this.messagePopService.$message();
  });
  editedMessage = "";
  close() {
    this.messagePopService.close();
  }

  editMessage() {
    console.log(this.editedMessage);
    this.messagePopService.editMessage(
      this.messagePopService.$message()?.id as string,
      this.editedMessage.trim()
    );
    this.editedMessage = "";
    this.messagePopService.close();
  }

  async deleteMessage() {
    const d = await Dialog.confirm({
      title: "Delete Message",
      message: "Are you sure you want to delete this message?",
      okButtonTitle: "Delete",
      cancelButtonTitle: "Cancel",
    });
    if (!d.value) return;
    this.messagePopService.deleteMessage(
      this.messagePopService.$message()?.id as string
    );
    this.messagePopService.close();
  }
}
