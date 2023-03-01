import { Component } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {

  public isLoading: boolean = true;

  constructor(private appService: AppService) {
    this.appService.isLoading.subscribe((isLoading) => this.isLoading = isLoading);
  }
}
