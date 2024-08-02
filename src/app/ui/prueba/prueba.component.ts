import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

import { SharedModule } from "../shared/shared.module";
import { NgbCarouselModule, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import {
  AngularEditorConfig,
  AngularEditorModule,
} from "@kolkov/angular-editor";
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from "@angular/common/http";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { ContenService } from "@core/services/content-service.interface";
import {
  CreateContent,
  Contents,
  Style,
  Details,
} from "@core/models/contents/create-content.model";
import { NotificationService } from "../shared/services/notification.service";
import { ContentRepository } from "@infrastructure/repositories/content.repository";
import { HttpService } from "@infrastructure/http/http.service";
import { SelectFormat } from "../shared/components/ftx-select/models/selectFormat.model";
import { Subscription } from "rxjs";
import {
  MatExpansionModule,
  MatExpansionPanel,
} from "@angular/material/expansion";
import { ErrorStateMatcher } from "@angular/material/core";
import { CONTENTS, PRINCIPAL } from "../routes.constants";
import { Router } from "@angular/router";
import { LanguageStore } from "@infrastructure/i18n/language-store.service";
import { LanguageService } from "@core/services/language-service.interface";
import { CoreModule } from "@core/core.module";
import { TranslateModule } from "@ngx-translate/core";
import { MatDialog } from "@angular/material/dialog";
import { PreviewComponent } from "../preview/preview.component";

export interface tab {
  name: string;
}

export interface DragDropListItem {
  id: string;
  title: string;
  description: string;
  editing: boolean;
}

export interface Idioma {
  id: number;
  name: string;
  sufijo: string;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-prueba",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbCarouselModule,
    AngularEditorModule,
    HttpClientModule,
    CdkDropList,
    CdkDrag,
    MatExpansionModule,
    CoreModule,
    TranslateModule,
  ],
  providers: [
    HttpService,
    { provide: ContenService, useClass: ContentRepository },
    { provide: LanguageService, useClass: LanguageStore },
  ],

  templateUrl: "./prueba.component.html",
  styleUrl: "./prueba.component.css",
})
export class PruebaComponent implements OnInit, OnDestroy {
  @ViewChildren(MatExpansionPanel) panels!: QueryList<MatExpansionPanel>;
  matcher = new MyErrorStateMatcher();

  btnAddDisable: boolean = false;
  private mySubscription: Subscription = new Subscription();
  datosEntrada: any;
  title: string = "Crear contenido";
  companyForm: FormGroup; // Definir el FormGroup
  previsualizar: boolean = false;
  sesionDetalle: boolean = false;
  sesionProductoBuscas: boolean = false;
  sesionDetalleIndividual: boolean = false;
  sesionDetallePersonalizado: boolean = false;
  htmlContentSesion = "";
  htmlContentDescripcion = "";
  htmlContentSesionControls: FormControl[] = [];
  loading: boolean = false;

  tabs: Idioma[] = [{ id: 1, name: "Español", sufijo: "es" }];

  selected = new FormControl(0);
  @ViewChild("editar") editarModal!: ElementRef;
  @ViewChild("modalAcordeon") modalAcordeon!: ElementRef;

  tipoIdioma: SelectFormat[] = [
    { value: "es", name: "Español" },
    { value: "ja", name: "Japones" },
    { value: "en", name: "Ingles" },
  ];

  formulario: FormGroup;
  formTabs: FormArray<FormGroup> = new FormArray<FormGroup>([]);

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private contenService: ContenService,
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private languageService: LanguageService,
    private dialog: MatDialog
  ) {
    this.formulario = new FormGroup({
      tag: new FormControl("", Validators.required),
      logo: new FormControl(),
      carousel: new FormControl(),
      tabArray: this.formTabs,
    });

    this.companyForm = this.formBuilder.group({
      idioma: [""],
      name: [""],
      acordeon: [],
      facebook: [],
    });
  }

  async ngOnInit(): Promise<void> {
    let dataString = localStorage.getItem("contents");

    if (dataString !== null) {
      this.datosEntrada = JSON.parse(dataString);

      localStorage.removeItem("contents");
    }

    if (this.datosEntrada) {
      this.loading = true;
      this.title = "Editar contenido";
      this.formulario.get("tag")?.patchValue(this.datosEntrada["tag"]);
      const logoURL =
        this.datosEntrada["logo"] === null ? null : this.datosEntrada["logo"];
      const imgCarrousel: any[] =
        this.datosEntrada["carousel"] === null
          ? null
          : this.datosEntrada["carousel"];

      // Logo
      if (logoURL !== null) {
        fetch(logoURL)
          .then((response) => response.blob())
          .then((blob) => {
            // Construye un objeto File a partir del Blob
            const file = new File([blob], "nombre_archivo.jpg", {
              type: "image/jpeg",
            });
            // Simula el evento y pasa al manejador original
            const event = { target: { files: [file] } };
            this.onFileSelected(event, 0);
          });
      }
      //imgCarrousel
      if (imgCarrousel !== null) {
        const files: File[] = [];
        await Promise.all(
          imgCarrousel.map(async (imgUrl, index) => {
            const response = await fetch(imgUrl);
            const blob = await response.blob();
            const file = new File([blob], `img_${index}`, {
              type: "image/jpeg",
            });
            files.push(file);
          })
        );

        // Simula el evento y pasa al manejador original
        const event = { target: { files: files }, preventDefault: () => {} };
        this.fileBrowseHandler(event);
      }

      //creacion de pestañas
      const languages: string[] =
        this.datosEntrada["languages"] === null
          ? null
          : this.datosEntrada["languages"];
      if (languages !== null) {
        await Promise.all(
          languages.map(async (language) => {
            const resultadoFiltro = this.tipoIdioma.filter(
              (idioma) => idioma.value === language
            );
            this.companyForm.get("idioma")?.patchValue(language);
            this.loadLanguajes();
          })
        );
      }

      //Contenido
      const contents: any[] = this.datosEntrada["contents"];
      const formArray = this.formulario.get("tabArray") as FormArray<FormGroup>;
      contents.forEach((element, index) => {
        //Descripcion del Articulo

        const tab = formArray.at(index).get("descripcion");
        tab?.patchValue(contents[index]["title"]);

        //sesiones
        const details: any[] = element.details;

        details.forEach((detail: any) => {
          const label = detail.label;
          const data = detail.data;
          const sesion = new FormGroup({
            label: new FormControl(label, Validators.required),
            content: new FormControl(data),
            editing: new FormControl(false),
          });

          const formArray = this.formulario.get(
            "tabArray"
          ) as FormArray<FormGroup>;
          const tab = formArray.at(index) as FormGroup;
          const sesionesArray = tab.get("sesiones") as FormArray<FormGroup>;
          sesionesArray.push(sesion);
        });
      });
      this.loading = false;
    } else {
      this.crearPestanaForm({ id: 1, name: "Español", sufijo: "es" });
    }
  }

  ngOnDestroy() {
    this.mySubscription.unsubscribe();
  }

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "15rem",
    minHeight: "5rem",
    placeholder: "Enter text here...",
    translate: "no",
    defaultParagraphSeparator: "p",
    defaultFontName: "Arial",
    toolbarHiddenButtons: [["bold"]],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: "redText",
        class: "redText",
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ],
  };

  public acordeons: DragDropListItem[] = [];

  public mostrarImagen: boolean = true;

  addTab() {
    this.modalService.open(this.editarModal, {
      ariaLabelledBy: "modal-basic-title",
    });
  }

  addAcordeon() {
    this.modalService.open(this.modalAcordeon, {
      ariaLabelledBy: "modal-basic-title",
    });
  }

  crear() {
    this.modalService.dismissAll(this.editarModal);
    const resultadoFiltro = this.tipoIdioma.filter(
      (idioma) => idioma.value === this.companyForm.get("idioma")?.value
    );
    let index = this.tabs.length + 1;
    let idioma: Idioma = {
      id: index,
      name: resultadoFiltro[0].name,
      sufijo: resultadoFiltro[0].value,
    };

    let existingIndex = this.tabs.findIndex(
      (tab) => tab.name === idioma.name && tab.sufijo === idioma.sufijo
    );

    if (existingIndex === -1) {
      this.tabs.push(idioma);
      this.crearPestanaForm(idioma);
      this.selected.setValue(this.tabs.length - 1);
    } else {
      this.selected.setValue(existingIndex);
    }
  }
  loadLanguajes() {
    this.modalService.dismissAll(this.editarModal);
    const resultadoFiltro = this.tipoIdioma.filter(
      (idioma) => idioma.value === this.companyForm.get("idioma")?.value
    );
    let index = this.tabs.length + 1;
    let idioma: Idioma = {
      id: index,
      name: resultadoFiltro[0].name,
      sufijo: resultadoFiltro[0].value,
    };

    this.tabs.push(idioma);
    this.crearPestanaForm(idioma);
    this.selected.setValue(this.tabs.length - 1);
  }
  crearPestanaForm(idioma: Idioma) {
    // Crear los FormGroup para cada pestaña
    const formGroup = new FormGroup({
      nameTab: new FormControl(idioma.name),
      sufijo: new FormControl(idioma.sufijo),
      descripcion: new FormControl(),
      sesiones: new FormArray<FormGroup>([]),
    });
    this.formTabs.push(formGroup);
  }

  getControlSections(
    indexTab: number,
    indexAcordeon: number,
    controlName: string
  ) {
    const formArray = this.formulario.get("tabArray") as FormArray<FormGroup>;
    const tab = formArray.at(indexTab) as FormGroup;
    const sesionesArray = tab.get("sesiones") as FormArray<FormGroup>;
    const sesion = sesionesArray.at(indexAcordeon) as FormGroup;
    return sesion.get(controlName) as FormControl;
  }

  // Función para obtener el FormArray 'sesiones' dado un índice
  getArraySections(index: number): any[] {
    const formArray = this.formulario.get("tabArray") as FormArray<FormGroup>;
    const tab = formArray.at(index) as FormGroup;
    const sesionesArray = tab.get("sesiones") as FormArray<FormGroup>;
    return sesionesArray.controls; // O podrías devolver sesionesArray.controls si necesitas controles del FormArray
  }

  // Función para obtener el FormArray 'sesiones' dado un índice
  getArraySesionesValue(index: number): any[] {
    const formArray = this.formulario.get("tabArray") as FormArray<FormGroup>;
    const tab = formArray.at(index) as FormGroup;
    const sesionesArray = tab.get("sesiones") as FormArray<FormGroup>;
    return sesionesArray.value; // O podrías devolver sesionesArray.controls si necesitas controles del FormArray
  }

  getFormGroup(index: number) {
    return this.formTabs.at(index) as FormGroup;
  }

  crearAcordeon(index: number) {
    this.classInput = true;
    this.btnAddDisable = true;
    // Encontrar el mayor valor de id
    const maxId = this.acordeons.reduce((max, item) => {
      const itemId = parseInt(item.id);
      return itemId > max ? itemId : max;
    }, -Infinity);

    // Asignar el valor máximo o 0 si la lista está vacía
    let resultado = this.acordeons.length > 0 ? maxId : 0;
    resultado = resultado + 1;
    this.acordeons.push({
      description: this.companyForm.get("acordeon")?.value,
      title: "",
      id: resultado.toString(),
      editing: true,
    });

    const sesion = new FormGroup({
      label: new FormControl("", Validators.required),
      content: new FormControl(""),
      editing: new FormControl(true),
    });

    const formulario = this.formulario.get("tabArray") as FormArray<FormGroup>;
    const segundoFormGroup = formulario.at(index) as FormGroup; // Obtiene el segundo FormGroup

    // Verifica si existe el FormGroup y su propiedad 'sesiones'
    if (segundoFormGroup && segundoFormGroup.get("sesiones")) {
      const sesionesFormArray = segundoFormGroup.get(
        "sesiones"
      ) as FormArray<FormGroup>;
      // Agrega la sesión al FormArray 'sesiones' del segundo FormGroup
      sesionesFormArray.push(sesion);
    }
    this.cdr.detectChanges();
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
    this.selected.setValue(index);
  }

  imgLogo: string | ArrayBuffer | null = null;

  onFileSelected(event: any, index: number) {
    const file: File = event.target.files[0];

    this.formulario.get("logo")?.patchValue(file);
    this.renderImage(file, index);
  }

  renderImage(file: File, index: number) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imgLogo = e.target.result;
      this.validarFormulario();
    };
    reader.readAsDataURL(file);
  }

  images: string[] = [];

  onFileSelected1(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.images.push(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
  }

  onToggleChange(event: any) {
    this.previsualizar = event.checked;
  }

  deleteHandler(index: number, i: number) {
    const formArray = this.formulario.get("tabArray") as FormArray<FormGroup>;
    const tab = formArray.at(index) as FormGroup;
    const sesionesArray = tab.get("sesiones") as FormArray<FormGroup>;

    // Elimina el control en la posición 'i' del FormArray 'sesionesArray'
    sesionesArray.removeAt(i);
  }

  drop(event: CdkDragDrop<DragDropListItem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  editing = false; // Variable para controlar si se está editando el título
  // Método para activar la edición del título
  startEditing(task: AbstractControl) {
    task.patchValue({ editing: true });
  }

  // Método para finalizar la edición del título
  finishEditing(control: any) {
    this.btnAddDisable = false;
    control.get("editing").patchValue(false);
  }

  //imagenes
  files: any[] = [];

  /**
   * on file drop handler
   */
  onFileDropped($event: any) {
    this.prepareFilesList($event);
    this.validarFormulario();
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(event: any) {
    this.mostrarImagen = false;
    const files: any = event.target.files;
    for (const item of files) {
      this.renderImageCarousel(item);
    }
    this.mostrarImagen = true;
    this.prepareFilesList(files);
  }

  fileBrowseHandlerFile(files: File[]) {
    this.mostrarImagen = false;
    for (const item of files) {
      this.renderImageCarousel(item);
    }
    this.mostrarImagen = true;
    this.prepareFilesList(files);
  }

  imgCarrousel: File[] = [];

  renderImageCarousel(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imgCarrousel.push(e.target.result);
    };
    reader.readAsDataURL(file);
    this.validarFormulario();
  }

  dropFoto(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.imgCarrousel, event.previousIndex, event.currentIndex);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.imgCarrousel.splice(index, 1);
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.validarFormulario();
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: any, decimals: any) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  formHeader: boolean = false;
  formCarrousel: boolean = false;
  formContenido: boolean = false;
  formSesiones: boolean = false;

  validarFormulario() {
    if (this.imgLogo !== null) {
      this.formHeader = true;
    } else {
      this.formHeader = false;
    }

    if (this.files.length > 0) {
      this.formCarrousel = true;
    } else {
      this.formCarrousel = false;
    }

    if (this.htmlContentDescripcion != "") {
      this.formContenido = true;
    } else {
      this.formContenido = false;
    }

    if (this.htmlContentSesionControls.length > 0) {
      this.formSesiones = true;
    } else {
      this.formSesiones = false;
    }
  }

  public mostrar: boolean = false;

  visualizar() {
    this.mostrar = !this.mostrar;
    if (this.mostrar) {
      const formArray = this.formulario.get("tabArray") as FormArray<FormGroup>;
      const titleContent: Style[] = [];

      const languages: string[] = [];
      formArray.value.forEach((element) => {
        let obj: Style = new Style(element.sufijo, element.descripcion);
        titleContent.push(obj);
        languages.push(element.sufijo);
      });

      const styles = {
        "background-color": "white",
        color: "black",
      };

      const contents: Contents[] = this.retornoItem();
      const previewContent: any = {
        languages: languages,
        logo: this.imgLogo,
        carousel: this.imgCarrousel,
        contents: contents,
      };
      localStorage.setItem("contents", JSON.stringify(previewContent));
      const dialogResult = this.dialog.open(PreviewComponent, {
        height: "100%",
        width: "60%",
      });
      dialogResult.afterClosed().subscribe({
        next: () => {
          this.mostrar = false;
        },
      });
    }
  }

  guardar(index: number) {
    this.loading = true;
    const tag: string = this.formulario.get("tag")?.value;
    const logo = this.formulario.get("logo")?.value;
    const carousel: File[] = this.base64toFile();
    const formArray = this.formulario.get("tabArray") as FormArray<FormGroup>;
    const titleContent: Style[] = [];

    const languages: string[] = [];
    formArray.value.forEach((element) => {
      let obj: Style = new Style(element.sufijo, element.descripcion);
      titleContent.push(obj);
      languages.push(element.sufijo);
    });

    const styles = {
      "background-color": "white",
      color: "black",
    };

    const contents: Contents[] = this.retornoItem();
    const contetFormData: CreateContent = new CreateContent(
      tag,
      languages,
      styles,
      logo,
      carousel,
      contents
    );

    if (!this.datosEntrada) {
      //Creacion
      this.mySubscription = this.contenService
        .createContent(contetFormData)
        .subscribe(
          (result) => {
            this.loading = false;
            this.notificationService.showSuccess(
              this.languageService.translateKey("CONTENT_CREATE_SUCCESS")
            );
            this.regresar();
          },
          (error: HttpErrorResponse) => {
            const errorMesagge = error.error;
            if (error.status === 409) {
              this.notificationService.showError(
                this.languageService.translateKey(
                  "CONTENT_CREATE_ERROR_CONFLICT"
                )
              );
            } else {
              this.notificationService.showError(
                this.languageService.translateKey("CONTENT_CREATE_ERROR")
              );
            }
            this.loading = false;
          },
          () => {
            this.mySubscription.unsubscribe();
          }
        );
    } else {
      //Update
      this.mySubscription = this.contenService
        .putCreateContent(this.datosEntrada["id"], contetFormData)
        .subscribe(
          (result) => {
            this.loading = false;
            this.notificationService.showSuccess(
              this.languageService.translateKey("CONTENT_UPDATE_SUCCESS")
            );
            this.regresar();
          },
          () => {
            this.loading = false;
            this.notificationService.showError(
              this.languageService.translateKey("CONTENT_CREATE_ERROR")
            );
            this.mySubscription.unsubscribe();
          }
        );
    }
  }

  uploadImages(images: string[]): Promise<any> {
    const formData = new FormData();
    // Agrega cada imagen al FormData
    images.forEach((base64Image, index) => {
      formData.append(`image${index}`, this.base64toBlob(base64Image));
    });
    // Hacer la solicitud POST al servidor
    return this.http.post<any>("URL_DEL_ENDPOINT", formData).toPromise();
  }
  fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }
  //converir base64 a File
  base64toFile(): File[] {
    const files: File[] = [];
    this.imgCarrousel.forEach((element, index) => {
      const dataString = element + "";
      const contentType = this.getFileTypeFromBase64(element + "");
      const arr: any[] = dataString.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      files.push(
        new File([u8arr], "img" + index + "." + contentType, {
          type: "image/" + contentType,
        })
      );
    });
    return files;
  }

  getFileTypeFromBase64(base64: string): string {
    const matches = base64.match(/^data:(.*?);/);
    if (matches && matches.length > 1) {
      return matches[1].split("/")[1];
    } else {
      return "unknown";
    }
  }

  // Función para convertir una cadena base64 en un objeto Blob
  base64toBlob(base64Data: string): Blob {
    const byteCharacters = atob(base64Data.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: "image/jpeg" }); // Cambia el tipo según tu imagen
  }

  retornoItem() {
    const contents: Contents[] = [];
    const formArray = this.formulario.get("tabArray") as FormArray<FormGroup>;
    const datas: any[] = formArray.value;
    let i = 0;

    datas.forEach((data: any, index) => {
      let behavior: string = "WYSIWYG";
      let details: Details[] = [];
      if (data["sesiones"]) {
        const sesionesArray: any[] = data["sesiones"];
        sesionesArray.forEach((sesion: any, indexSesion) => {
          details.push(
            new Details(indexSesion, behavior, sesion.label, sesion.content)
          );
        });
        contents.push(new Contents(index, data["descripcion"], details));
      }
    });
    return contents;
  }

  toggleCollapse(item: any) {
    let valControl = item.get("editing").value;
    item.get("editing").patchValue(!valControl);
  }

  classInput: boolean = false;
  focusPanel(panel: MatExpansionPanel, index: number, i: number) {
    const validarControl = this.getControlSections(index, i, "label");
    const value = validarControl.value;

    if (!value.trim()) {
      validarControl.markAsTouched();
      validarControl.updateValueAndValidity();
      panel.expanded = false;
      return;
    }

    setTimeout(() => {
      this.classInput = false;
      panel._body.nativeElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
  }

  regresar() {
    this.router.navigate([
      `/${PRINCIPAL.NAME}/${CONTENTS.NAME}/${CONTENTS.CONTENT}`,
    ]);
  }
}
