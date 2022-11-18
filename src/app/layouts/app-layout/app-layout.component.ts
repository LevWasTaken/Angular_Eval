import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthenticationStore } from 'src/modules/authentication/authentication.store';
import { WebsocketConnection } from 'src/modules/common/WebsocketConnection';
import { NotificationStore } from 'src/modules/notification/notification.store';
import { NotificationService } from 'src/modules/notification/services/notification.service';
import { NotificationSocketService } from 'src/modules/notification/services/notification.socket.service';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.less'],
})
export class AppLayoutComponent implements OnInit, OnDestroy {
  sub?: Subscription;

  showDrawer: boolean = false;

  notification$: Observable<any>;
  constructor(
    private socket: WebsocketConnection,
    private authStore: AuthenticationStore,
    private notificationService: NotificationService,
    private notificationStore: NotificationStore,
    private notifSocketService: NotificationSocketService
  ) {
    this.notification$ = this.notificationStore.get(
      (state) => state.notifications
    );
  }

  ngOnInit(): void {
    this.sub = this.authStore.accessToken$.subscribe((accessToken) => {
      if (accessToken) {
        this.socket.connect(accessToken);
        this.notificationService.fetch();
        this.notifSocketService.onNewNotification((notif) => {
          this.notificationStore.appendNotification(notif);
        });
      } else {
        this.socket.disconnect();
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onToggleNotifications() {
    this.showDrawer = !this.showDrawer;
    this.notificationService.markAsViewed();
  }
}
