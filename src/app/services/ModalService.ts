import { Injectable } from '@angular/core';
import { ModalComponent } from '../components/shared/modal/modal.component';
import { CssService } from './CssService';
export interface ModalState {
  modal: ModalComponent;
  zIndex: number;
  darkOpacity: number;
}
const getDarkOpacityClassBefore = (darkOpacity: number): { [key: string]: string } => {
  return {
    'content': '""',
    'position': 'absolute',
    'top': '0',
    'left': '0',
    'width': '100%',
    'height': '100%',
    'background': `rgba(0, 0, 0, ${darkOpacity})`,
    'z-index': '1',
    'pointer-events': 'none'
  };
}
const porcentageToInteger = (porcentage: number): string => {
  return Math.round(porcentage * 100).toString();
}
const positionRelative = {
  'position': 'relative'
};
@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modals: Record<string, ModalState> = {};
  private baseZIndex = 1050;
  private topZIndex = this.baseZIndex;
  private normalDarkOpacity = 0;
  private porcentageDarkOpacityToReduce = 0.1;
  private firstDarkOpacity = 0.5;

  constructor(
    private readonly cssService: CssService
  ) {
    const styles = [{
      style: getDarkOpacityClassBefore(this.firstDarkOpacity),
      className: 'shadow-' + porcentageToInteger(this.firstDarkOpacity)
    }];
    for (let i = this.firstDarkOpacity - this.porcentageDarkOpacityToReduce; i > 0; i -= this.porcentageDarkOpacityToReduce) {
      styles.push({
        style: getDarkOpacityClassBefore(i),
        className: 'shadow-' + porcentageToInteger(i)
      });
    }
    styles.forEach(s => {
      this.cssService.addDinamicClass(s.className, positionRelative);
      this.cssService.addDinamicClass(s.className + '::before', s.style);
    });
  }

  registerModal(modal: ModalComponent): void {
    this.modals[modal.modalId] = { modal, zIndex: this.baseZIndex, darkOpacity: this.normalDarkOpacity };
  }

  bringToFront(modal: ModalComponent): void {
    this.topZIndex += 1;
    this.modals[modal.modalId].zIndex = this.topZIndex;
    modal.setZIndex(this.topZIndex);
  }

  sendToBack(modal: ModalComponent): void {
    this.modals[modal.modalId].zIndex = this.baseZIndex;
    modal.setZIndex(this.baseZIndex);
    this.topZIndex = Math.max(
      this.baseZIndex,
      ...Object.values(this.modals).map(m => m.zIndex)
    );
  }

  openModal(modal: ModalComponent): void {
    modal.internalOpenModal();
    this.bringToFront(modal);
    this.handleOpacityOnOpenModal(modal);
  }

  closeModal(modal: ModalComponent): void {
    modal.internalCloseModal();
    this.sendToBack(modal);
    this.handleOpacityOnCloseModal(modal);
  }
  handleOpacityOnOpenModal(currentModal: ModalComponent): void {
    const currentModalState = this.modals[currentModal.modalId];
    currentModalState.darkOpacity = this.normalDarkOpacity;
    currentModal.deleteShadowClasses();
    currentModal.addClass('shadow-' + porcentageToInteger(0));
    Object.values(this.modals)
      .filter(m => m.modal.modalId !== currentModal.modalId)
      .forEach(m => {
        const newDarkOpacity = m.darkOpacity >= this.firstDarkOpacity ? 
          m.darkOpacity + (this.porcentageDarkOpacityToReduce * m.darkOpacity) 
          : 
          this.firstDarkOpacity;
        m.darkOpacity = newDarkOpacity > 1 ? 1 : newDarkOpacity; // just in case
        m.modal.deleteShadowClasses();
        m.modal.addClass('shadow-' + porcentageToInteger(m.darkOpacity));
      });
  }
  handleOpacityOnCloseModal(currentModal: ModalComponent): void {
    const currentModalState = this.modals[currentModal.modalId];
    currentModalState.darkOpacity = this.normalDarkOpacity;
    currentModal.deleteShadowClasses();
    currentModal.addClass('shadow-' + porcentageToInteger(this.normalDarkOpacity));
    Object.values(this.modals)
      .filter(m => m.modal.modalId !== currentModal.modalId)
      .forEach(m => {
        // const newOpacity = m.darkOpacity + (this.porcentageDarkOpacityToReduce * m.darkOpacity);
        // m.darkOpacity = newOpacity > 1 ? 1 : newOpacity;
        // m.modal.setDarkOpacity(m.darkOpacity);
        const opacityToReduce = m.darkOpacity - (this.porcentageDarkOpacityToReduce * m.darkOpacity);
        let opacity: number;
        if(m.darkOpacity - opacityToReduce <= this.normalDarkOpacity) {
          opacity = this.normalDarkOpacity;
        } else {
          opacity = m.darkOpacity - opacityToReduce;
        }
        m.darkOpacity = opacity;
        m.modal.deleteShadowClasses();
        m.modal.addClass('shadow-' + porcentageToInteger(opacity));
      });
  }
}