import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "@core/services/user-service.interface";
import { NotificationService } from "../../shared/services/notification.service";
import { CreateUser } from "@core/models/user/create-user.model";
import { SelectFormat } from "../../shared/components/ftx-select/models/selectFormat.model";
import { DocumentTypeService } from "@core/services/document-type-sevice.interface";
import { DocumentType } from "@core/models/document-type/document-type.model";
import { UserType } from "@core/enums/userType.enum";
import { TranslateService } from "@ngx-translate/core"; // Importa el servicio de traducción
import { LanguageService } from "@core/services/language-service.interface";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-create-user",
  templateUrl: "./create-user.component.html",
  styleUrl: "./create-user.component.css",
})
export class CreateUserComponent implements OnInit {
  public tipoNits: DocumentType[] = [];
  public tipoNitsFormated: SelectFormat[] = [];

  public companySegments: any[] = [];
  public companySegmentsFormated: SelectFormat[] = [];
  public userForm!: FormGroup;
  public isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private documentTypeService: DocumentTypeService,
    private notificationService: NotificationService,
    private translate: TranslateService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.documentTypeService.getAll().subscribe({
      next: (result) => {
        this.tipoNits = result;
        this.tipoNitsFormated = result.map((element) => {
          return {
            value: element.code,
            name: element.name,
          };
        });
      },
    });
  }

  private createForm(): void {
    this.userForm = this.formBuilder.group({
      Name: ["", Validators.required],
      Surname: ["", Validators.required],
      Document: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
      Email: ["", [Validators.required, Validators.email]],
      IdentityDocumentType: ["", Validators.required],
    });
  }

  save(): void {
    if (this.userForm.valid) {
      this.isLoading = true;
      const createUser: CreateUser = new CreateUser(
        this.userForm.get("Name")?.value,
        this.userForm.get("Surname")?.value,
        this.userForm.get("Email")?.value,
        UserType.AuxiliarCustomer,
        this.userForm.get("IdentityDocumentType")?.value,
        this.userForm.get("Document")?.value
      );

      this.userService.createUser(createUser).subscribe({
        next: () => {
          this.notificationService.showSuccess(
            this.languageService.translateKey("USER_CREATED_SUCCESS")
          );

          this.userForm.reset();
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 400) {
            if (error.error.message.includes("email")) {
              this.notificationService.showError(
                this.languageService.translateKey("USER_EMAIL_ERROR_CONFLICT")
              );
            } else if (error.error.message.includes("identification")) {
              this.notificationService.showError(
                this.languageService.translateKey(
                  "USER_IDNETIFICATION_ERROR_CONFLICT"
                )
              );
            } else {
              this.notificationService.showError(
                this.languageService.translateKey("USER_CREATED_ERROR_CONFLICT")
              );
            }
          } else {
            this.notificationService.showError(
              this.languageService.translateKey("USER_CREATED_ERROR")
            );
          }

          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }
}
