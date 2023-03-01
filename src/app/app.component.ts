import { Component, OnDestroy, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { AppService } from './services/app.service';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'task-ag-grid';
  getListSubscription: Subscription;

  columnDefs: ColDef[] = [
    {
      headerName: 'Display',
      field: 'isToggled',
      cellRenderer: SlideToggleComponent
    },
    {
      field: 'date',
      valueFormatter: (data) => {
        const options = { year: "numeric", month: "short", day: "numeric" } as const;
        return data.value ? (new Date(data.value)).toLocaleDateString(undefined, options) : ''
      }
    },
    {
      field: 'isNew',
      headerName: '',
      cellStyle: data => {
        if (data.value) {
          return { color: 'blue' }
        }
        return null;
      },
      valueFormatter: (data) => {
        return data.value ? 'New' : ''
      }
    },
    {
      field: 'firstName'
    },
    {
      field: 'lastName'
    },
    {
      field: 'sex'
    }
  ];

  rowData = [];

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.getListSubscription = this.appService.getJsonData().subscribe(res => {
      this.rowData = res;
    });
  }

  ngOnDestroy(): void {
    this.getListSubscription.unsubscribe();
  }
}
