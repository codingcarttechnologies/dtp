import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {

  @Input('imageBase64') imageBase64: string;
  @Output('imageSelected') imageSelected = new EventEmitter<string>();

  public changeListener($event) : void {
    this.toBase64($event.target);
  }

  public toBase64(inputValue: any): void {
    if(!inputValue || inputValue.files.length == 0) {
      this.imageBase64 = '';
      this.imageSelected.emit('');
      return;
    }

    let file: File = inputValue.files[0];
    let fileReader: FileReader = new FileReader();

    fileReader.onloadend = (e) => {
      this.imageBase64 = fileReader.result;
      this.imageSelected.emit(this.imageBase64);
    };

    fileReader.readAsDataURL(file);
  }

  constructor() { }

  ngOnInit() {
  }

}
