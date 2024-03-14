import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '../../../_module/Material.Module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,MaterialModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class headerComponent {

}
