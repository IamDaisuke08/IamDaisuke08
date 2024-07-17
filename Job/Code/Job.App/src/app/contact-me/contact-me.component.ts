import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, Validators } from '@angular/forms';
import { GenericCrud } from '@app/generic-crud';
import { MessageDto } from '@models/messageDto';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'contact-me',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.css'
})
export class ContactMeComponent extends GenericCrud<MessageDto> implements OnInit {

  contactForm! : FormGroup;
  path = "Mail";

  get name() {
    return this.contactForm.get('name');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get mobile() {
    return this.contactForm.get('mobile');
  }

  get messageTxt() {
    return this.contactForm.get('message');
  }

  ngOnInit(): void {
    this.newMessage();
  }

  sendMessage() {
    let messageBody = `    ------------------ start of message ------------------

    ${ this.messageTxt?.value }
    
    ------------------- end of message -------------------
    Email: ${ this.email?.value }
    Mobile: ${ this.mobile?.value }`;
    let newMessage = new MessageDto(this.name?.value, 'Mesage from Job App', messageBody);

    this.onSave(this.path, newMessage);
    this.newMessage();
  }

  newMessage() {
    this.contactForm = new FormGroup({
      name:  new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [Validators.maxLength(20), Validators.pattern("^[0-9]*$")]),
      message: new FormControl('', Validators.maxLength(1000))
    });
  }
}
