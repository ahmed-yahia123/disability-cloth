import { Component } from '@angular/core';
import { Router } from '@angular/router';
Router
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
 constructor(private router: Router) { }

  goToContact() {
    this.router.navigate(['/home']);
  }
}
