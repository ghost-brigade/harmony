import { Pipe, PipeTransform, inject } from "@angular/core";
import { I18nService } from "../services/i18n.service";
import { I18nKey } from "../constants/i18n.constants";

@Pipe({
  name: "i18n",
  standalone: true,
})
export class I18nPipe implements PipeTransform {
  i18nService = inject(I18nService);

  transform(value: I18nKey): string {
    return this.i18nService.getTranslation(value);
  }
}
