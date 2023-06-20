import { Pipe, PipeTransform } from "@angular/core";
import { I18nService } from "../services/i18n.service";
import { I18nKey } from "../constants/i18n.constants";

@Pipe({
  name: "i18n",
  standalone: true,
})
export class I18nPipe implements PipeTransform {
  constructor(private i18nService: I18nService) {}

  transform(value: I18nKey): string {
    return this.i18nService.getTranslation(value);
  }
}
