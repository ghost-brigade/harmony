import {
  Component,
  Input,
  WritableSignal,
  computed,
  signal,
} from "@angular/core";
import { NgFor, NgIf } from "@angular/common";
import {
  EMOJIS,
  EMOJI_CATEGORIES,
} from "apps/client/src/app/core/constants/emojis";
import { I18nPipe } from "apps/client/src/app/core/pipes/i18n.pipe";
import { FormsModule } from "@angular/forms";
import { Output, EventEmitter } from "@angular/core";

@Component({
  selector: "harmony-emoji-picker",
  standalone: true,
  imports: [NgFor, NgIf, I18nPipe, FormsModule],
  templateUrl: "./emoji-picker.component.html",
  styleUrls: ["./emoji-picker.component.css"],
})
export class EmojiPickerComponent {
  @Input() open = false;
  @Output() emojiEvent = new EventEmitter<string>();

  $searchValue = signal("");
  category: WritableSignal<(typeof EMOJI_CATEGORIES)[number] | "EMOJI_ALL"> =
    signal(EMOJI_CATEGORIES[0]);
  categories = [...EMOJI_CATEGORIES, "EMOJI_ALL"] as const;
  emojis = computed(() => {
    return EMOJIS.filter((emoji) => {
      if (this.$searchValue().length > 0) {
        const emojiIncludesSearchValue = emoji.names.some((name) =>
          name.includes(this.$searchValue().toLowerCase())
        );
        if (this.category() === "EMOJI_ALL") return emojiIncludesSearchValue;
        return emoji.category === this.category() && emojiIncludesSearchValue;
      }
      if (this.category() === "EMOJI_ALL") return true;
      return emoji.category === this.category();
    });
  });

  setCategory(category: (typeof this.categories)[number]) {
    this.category.set(category);
  }

  emitEmoji(emoji: string) {
    this.emojiEvent.emit(emoji);
    this.$searchValue.set("");
  }
}
