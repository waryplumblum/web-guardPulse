import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-url-form',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './url-form.component.html',
  styleUrl: './url-form.component.css'
})
export class UrlFormComponent {
  url = signal(''); // Manejo de la URL

  @Output() submitUrl = new EventEmitter<string>(); // Evento para emitir la URL

  onSubmit() {
    this.submitUrl.emit(this.url()); // Emitir la URL cuando el formulario se envíe
  }

  isValidUrl(): boolean {
    const pattern = /^https?:\/\/.+$/;
    return pattern.test(this.url());
  }
}
