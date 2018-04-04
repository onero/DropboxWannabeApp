import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-new-folder',
  templateUrl: './new-folder.component.html',
  styleUrls: ['./new-folder.component.scss']
})
export class NewFolderComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewFolderComponent>) { }

  ngOnInit() {
  }

  createFolder(folderName: string) {
    this.dialogRef.close(folderName);
  }
}
