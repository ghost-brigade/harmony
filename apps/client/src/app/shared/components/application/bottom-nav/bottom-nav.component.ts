import {
  Component,
  ElementRef,
  ViewChild,
  computed,
  inject,
  signal,
} from "@angular/core";
import { NgIf } from "@angular/common";
import { BOTTOM_NAV_ANIMATION } from "./bottom-nav.animation";
import { BottomNavService } from "./bottom-nav.service";
import { EmojiPickerComponent } from "./emoji-picker/emoji-picker.component";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { ImagePickerComponent } from "./image-picker/image-picker.component";
import { HapticsService } from "../../../services/haptics.service";
import { ChatService } from "apps/client/src/app/views/application/direct-messages/chat/chat.service";
import { NgAutoAnimateDirective } from "ng-auto-animate";

@Component({
  selector: "harmony-bottom-nav",
  standalone: true,
  imports: [
    NgIf,
    EmojiPickerComponent,
    ImagePickerComponent,
    FormsModule,
    RouterLink,
    NgAutoAnimateDirective,
  ],
  templateUrl: "./bottom-nav.component.html",
  styleUrls: ["./bottom-nav.component.css"],
  animations: BOTTOM_NAV_ANIMATION,
})
export class BottomNavComponent {
  @ViewChild("messageBox") messageBox: ElementRef<HTMLInputElement> | undefined;
  bottomNavService = inject(BottomNavService);
  hapticsService = inject(HapticsService);
  chatService = inject(ChatService);
  $isEmojiPickerOpen = signal(false);
  $isAddFilesOpen = signal(false);
  $isInTextChannel = computed(() => this.bottomNavService.$isTextChannel());
  $isBottomNavOpen = computed(() => this.bottomNavService.$showBottomNav());
  $currentRoute = computed(() => this.bottomNavService.$currentRoute());
  $message = signal("");
  $inputFocused = signal(false);

  toggleEmojiPicker() {
    this.$isAddFilesOpen.set(false);
    this.$isEmojiPickerOpen.set(!this.$isEmojiPickerOpen());
  }

  async vibrate() {
    await this.hapticsService.haptics();
  }

  toggleAddFiles() {
    this.$isEmojiPickerOpen.set(false);
    this.$isAddFilesOpen.set(!this.$isAddFilesOpen());
  }

  addEmoji(emoji: string) {
    this.$message.set(this.$message() + emoji);
    this.$isEmojiPickerOpen.set(false);
    if (this.messageBox) {
      this.messageBox.nativeElement.focus();
    }
  }

  setInputFocused(isFocused: boolean) {
    this.$inputFocused.set(isFocused);
  }

  async sendMessage() {
    this.chatService.addMessage({
      author: "Alexis",
      content: this.$message(),
      date: new Date(),
    });
    this.$message.set("");
    await this.vibrate();
  }
}
