import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.css'
})
export class UploadImageComponent {
  @Output() pathUrl = new EventEmitter<any>()
  @Output() deletePicture = new EventEmitter<boolean>();
  @Input() srcUrl: string | undefined

  erreurMsg: string = ''
  echecCnx: boolean = false;
  imagePicked: boolean = false;
  formatInvalid: boolean = false;
  file: any;

  constructor() { }

  ngOnInit(): void {
  }

  async picked(event: any) {
    this.echecCnx = false
    this.imagePicked = true
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      await this.handleInputChange(file);
      let formData = new FormData()
      formData.append('file', this.file);
    }
  }

  async handleInputChange(files: any) {
    this.formatInvalid = false
    this.file = files;
    const pattern = /image-*/;
    const reader = new FileReader();
    if (!this.file.type.match(pattern)) {
      this.formatInvalid = true
      this.erreurMsg = "Format d'image invalid !"
      return;
    }
    reader.onloadend = await this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(this.file);
  }

  async _handleReaderLoaded(e: any) {
    this.srcUrl = await e.target.result;
    this.pathUrl.emit(this.srcUrl)
  }


  async deletePicAction() {
    this.srcUrl = ""
    this.file = null
    this.formatInvalid = false
    this.deletePicture.emit(true);
  }
}
