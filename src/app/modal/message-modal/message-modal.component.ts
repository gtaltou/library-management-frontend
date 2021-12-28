import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.css']
})
export class MessageModalComponent implements OnInit {

  @Input('messageModal') messageModal : string;

  constructor() { }

  ngOnInit() {
  }

}
