import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageItem } from '../../shared/models/messageItem';
import { GenericCrud } from '../generic-crud';
import { MessageDto } from '../../shared/models/messageDto';

@Component({
  selector: 'contact-me',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.css'
})
export class ContactMeComponent extends GenericCrud<MessageDto> implements OnInit {
  
  message! : MessageItem;
  path = "Mail";

  ngOnInit(): void {
    this.newMessage();
  }

  sendMessage() {
    let messageBody = `
    ------------------ start of message ------------------
    ${ this.message.message }
    ------------------- end of message -------------------
    Email: ${ this.message.emailaddress }
    Mobile: ${ this.message.mobilenumber }`;
    let newMessage = new MessageDto(this.message.name, 'Mesage from Job App', messageBody);

    this.onSave(this.path, newMessage);
    this.newMessage();
  }

  newMessage() {
    this.message = new MessageItem(0, "", "", "", "");
  }
}
