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
import { FilePicker } from "@capawesome/capacitor-file-picker";

@Component({
  selector: "harmony-bottom-nav",
  standalone: true,
  imports: [NgIf, EmojiPickerComponent, FormsModule],
  templateUrl: "./bottom-nav.component.html",
  styleUrls: ["./bottom-nav.component.css"],
  animations: BOTTOM_NAV_ANIMATION,
})
export class BottomNavComponent {
  @ViewChild("messageBox") messageBox: ElementRef<HTMLInputElement> | undefined;
  bottomNavService = inject(BottomNavService);
  $isEmojiPickerOpen = signal(false);
  $isInTextChannel = computed(() => this.bottomNavService.$isTextChannel());
  $message = signal("");
  $inputFocused = signal(false);

  toggleEmojiPicker() {
    this.$isEmojiPickerOpen.set(!this.$isEmojiPickerOpen());
  }

  addEmoji(emoji: string) {
    this.$message.set(this.$message() + emoji);
    this.$isEmojiPickerOpen.set(false);
    if (this.messageBox) {
      this.messageBox.nativeElement.focus();
    }
  }

  async addFiles() {
    const result = await FilePicker.pickMedia({
      multiple: true,
    });
    console.log(result);
  }

  setInputFocused(isFocused: boolean) {
    this.$inputFocused.set(isFocused);
  }
}
