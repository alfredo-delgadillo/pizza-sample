import { Injectable, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { ProgressComponent } from 'src/app/shared/components/progress/progress.component';
import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private container: ComponentRef<ProgressComponent>;
  viewContainerRef: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private popup: MessageService) { }

  showProgress() {
    if (this.viewContainerRef) {
      const factory = this.componentFactoryResolver.resolveComponentFactory(ProgressComponent);
      this.container = this.viewContainerRef.createComponent(factory);
      this.container.changeDetectorRef.detectChanges();
    }
    else {
      this.showMessage('Progress bar needs viewContainerRef to be set', true);
    }
  }

  hideProgress() {
    if (this.container) {
      this.container.destroy();
    }
  }

  showMessage(message: string, isError: boolean = false) {
    this.popup.showMessage(message, isError);
  }
}
