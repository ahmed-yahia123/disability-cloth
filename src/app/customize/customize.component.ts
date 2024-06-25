import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.css']
})
export class CustomizeComponent {
  selectedColor: string = 'choose your color';
  selectedAbility: string = 'what is your disability';

  constructor(private router: Router) { }

  selectColor(event: Event, color: string) {
    event.preventDefault(); // منع السلوك الافتراضي للنقر على الرابط
    this.selectedColor = color;
  }

  selectAbility(event: Event, ability: string) {
    event.preventDefault(); // منع السلوك الافتراضي للنقر على الرابط
    this.selectedAbility = ability;
  }

  goToContact() {
    this.router.navigate(['/contact']);
  }
}
