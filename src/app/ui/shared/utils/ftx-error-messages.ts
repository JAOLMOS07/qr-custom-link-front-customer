import { FormControl } from "@angular/forms";
import { LanguageService } from "@core/services/language-service.interface";

export class FtxErrorMessage {
  private customErrorMessages: { [key: string]: string } = {};
  private readonly control: FormControl;
  private name?: string = "";

  constructor(
    private languageService: LanguageService,
    control: FormControl,
    name?: string
  ) {
    this.control = control;
    this.name = name ? name : "";
  }

  getErrorMessage(errorName?: string) {
    if (errorName) {
      this.name = errorName.toLowerCase();
    }
    for (const validatorKey in this.control.errors) {
      if (this.control.errors.hasOwnProperty(validatorKey)) {
        return (
          this.customErrorMessages[validatorKey] ||
          this.defaultErrorMessages(validatorKey)
        );
      }
    }
    return this.languageService.translateKey("FORM_ERRORS.INVALID", {
      name: this.name,
    });
  }

  private defaultErrorMessages(validatorKey: string): string {
    if (!this.control || !this.control.errors) {
      return this.languageService.translateKey("FORM_ERRORS.CONTROL_NULL");
    }

    const params = { name: this.name };

    if (validatorKey === "required") {
      return this.languageService.translateKey("FORM_ERRORS.REQUIRED", params);
    } else if (validatorKey === "minlength") {
      const minLength = this.control.errors[validatorKey].requiredLength;
      return this.languageService.translateKey("FORM_ERRORS.MINLENGTH", {
        ...params,
        requiredLength: minLength,
      });
    } else if (validatorKey === "maxlength") {
      const maxLength = this.control.errors[validatorKey].requiredLength;
      return this.languageService.translateKey("FORM_ERRORS.MAXLENGTH", {
        ...params,
        requiredLength: maxLength,
      });
    } else if (validatorKey === "pattern") {
      return this.languageService.translateKey("FORM_ERRORS.PATTERN", params);
    } else if (validatorKey === "confirmedValidator") {
      return this.languageService.translateKey(
        "FORM_ERRORS.CONFIRMED_VALIDATOR"
      );
    }

    return this.languageService.translateKey("FORM_ERRORS.INVALID", params);
  }
}
