import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RequestsService } from '../../services/requests.service';
import { RequestStatus } from '../../services/requests.service'; 

interface RequestItem {
  id: string;
  reserveId: string;
  adminId: string;
  status: RequestStatus;
  createdAt: string;
}

@Component({
  selector: 'app-requests-admin',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgForOf,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './requests-admin.component.html',
  styleUrls: ['./requests-admin.component.css']
})
export class RequestsAdminComponent implements OnInit {
  requests: RequestItem[] = [];
  loading = true;

  RequestStatus = RequestStatus;

  constructor(private requestsSvc: RequestsService) {}

  ngOnInit() {
    this.load();
  }

  private load() {
    this.loading = true;
    this.requestsSvc.showRequests().subscribe({
      next: data => {
        this.requests = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  accept(req: RequestItem) {
    this.requestsSvc
      .respondRequest({ requestId: req.id, status: RequestStatus.APPROVED })
      .subscribe(() => this.load());
  }

  reject(req: RequestItem) {
    this.requestsSvc
      .respondRequest({ requestId: req.id, status: RequestStatus.REJECTED })
      .subscribe(() => this.load());
  }

  get pending() {
    return this.requests.filter(r => r.status === RequestStatus.UNDER_REVIEW);
  }

  get history() {
    return this.requests.filter(r => r.status !== RequestStatus.UNDER_REVIEW);
  }
}
