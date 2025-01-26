import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/ui/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-client',
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {

}
