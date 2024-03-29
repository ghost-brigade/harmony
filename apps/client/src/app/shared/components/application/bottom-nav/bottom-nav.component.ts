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
import { NgAutoAnimateDirective } from "ng-auto-animate";
import { Capacitor } from "@capacitor/core";
import { ServerService } from "apps/client/src/app/views/application/server/server.service";
import { I18nPipe } from "apps/client/src/app/core/pipes/i18n.pipe";
import { ChatService } from "apps/client/src/app/views/application/direct-messages/chat/chat.service";

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
    I18nPipe,
  ],
  templateUrl: "./bottom-nav.component.html",
  styleUrls: ["./bottom-nav.component.css"],
  animations: BOTTOM_NAV_ANIMATION,
})
export class BottomNavComponent {
  @ViewChild("messageBox") messageBox: ElementRef<HTMLInputElement> | undefined;
  bottomNavService = inject(BottomNavService);
  hapticsService = inject(HapticsService);
  serverService = inject(ServerService);
  chatService = inject(ChatService);
  $isDMs = computed(() => this.bottomNavService.$isDMs());
  $isEmojiPickerOpen = computed(
    () =>
      this.bottomNavService.$emojiOpen() &&
      this.bottomNavService.$isTextChannel()
  );
  $isAddFilesOpen = computed(
    () =>
      this.bottomNavService.$addFilesOpen() &&
      this.bottomNavService.$isTextChannel()
  );
  $isInTextChannel = computed(() => this.bottomNavService.$isTextChannel());
  $isBottomNavOpen = computed(() => this.bottomNavService.$showBottomNav());
  $currentRoute = computed(() => this.bottomNavService.$currentRoute());
  $message = signal("");
  $inputFocused = signal(false);
  $file = computed(() => this.serverService.$file());
  $dmFile = computed(() => this.chatService.$file());
  $fileUrl = computed(() => {
    if (this.$file()) {
      return URL.createObjectURL(this.$file() as Blob);
    } else if (this.$dmFile()) {
      return URL.createObjectURL(this.$dmFile() as Blob);
    }
    return "";
  });
  $canSend = computed(() => {
    return (
      (this.$inputFocused() ||
        this.$message().trim().length > 0 ||
        this.$file() !== undefined ||
        this.$dmFile() !== undefined) &&
      this.$message().trim().length < 500
    );
  });

  toggleEmojiPicker() {
    this.bottomNavService.$addFilesOpen.set(false);
    this.bottomNavService.$emojiOpen.set(!this.$isEmojiPickerOpen());
  }

  async vibrate() {
    await this.hapticsService.haptics();
  }

  isMobile() {
    return (
      Capacitor.getPlatform() === "ios" || Capacitor.getPlatform() === "android"
    );
  }

  toggleAddFiles() {
    this.bottomNavService.$emojiOpen.set(false);
    this.bottomNavService.$addFilesOpen.set(!this.$isAddFilesOpen());
  }

  addEmoji(emoji: string) {
    this.$message.set(this.$message() + emoji);
    this.bottomNavService.$emojiOpen.set(false);
    if (this.messageBox) {
      this.messageBox.nativeElement.focus();
    }
  }

  setInputFocused(isFocused: boolean) {
    this.$inputFocused.set(isFocused);
  }

  enterPressed() {
    if (!this.isMobile()) {
      this.sendMessage();
    }
  }

  async sendMessage() {
    const msg = this.$message().trim();
    if (!msg && !this.$file() && !this.$dmFile()) {
      return;
    }

    if (this.$isDMs()) {
      this.chatService.sendMessage(msg);
    } else {
      this.serverService.sendMessage(msg);
    }
    this.$message.set("");
    await this.vibrate();
  }

  removeFile() {
    if (this.$isDMs()) {
      this.chatService.$file.set(undefined);
    } else {
      this.serverService.$file.set(undefined);
    }
  }
}
