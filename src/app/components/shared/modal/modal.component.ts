import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';
import { ModalService } from '../../../services/ModalService';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'], // Corregido: styleUrls para que sea reconocido
})
export class ModalComponent implements OnInit, AfterViewInit {
  @Input() modalId: string = 'modal'.concat(Math.random().toString()); // ID del modal
  @ViewChild('modalRef') modalElement!: ElementRef; // Usar ViewChild para capturar el modal
  @ViewChild('modalContent') modalContent!: ElementRef;

  modal!: Modal; // Instancia del modal de Bootstrap

  openModalBtnId!: string; // ID del botón de apertura
  closeModalBtnId!: string; // ID del botón de cierre

  private isDragging = false; // Bandera para saber si se está arrastrando
  private startX = 0; // Posición inicial del ratón en X
  private startY = 0; // Posición inicial del ratón en Y
  private offsetX = 0; // Desplazamiento acumulado en X
  private offsetY = 0; // Desplazamiento acumulado en Y

  constructor(
    private readonly renderer: Renderer2,
    private readonly modalService: ModalService,
  ) {}

  ngOnInit(): void {
    // Configuración de IDs dinámicos basada en el modalId
    this.openModalBtnId = `${this.modalId}Open`;
    this.closeModalBtnId = `${this.modalId}Close`;
    this.modalService.registerModal(this);
  }

  ngAfterViewInit(): void {
    const modalNativeElement = this.modalElement.nativeElement;
    this.renderer.appendChild(document.body, modalNativeElement);
    this.modal = new Modal(this.modalElement.nativeElement);
  }

  openModal(): void {
    this.modalService.openModal(this);
  }

  closeModal(): void {
    this.modalService.closeModal(this);
  }

  internalOpenModal(): void {
    this.modal.show();
  }
  internalCloseModal(): void {
    this.modal.hide();
  }
  startDragging(event: MouseEvent): void {
    this.isDragging = true;
    this.startX = event.clientX - this.offsetX;
    this.startY = event.clientY - this.offsetY;
  }

  stopDragging(): void {
    this.isDragging = false;
  }

  drag(event: MouseEvent): void {
    if (!this.isDragging) return;
    this.offsetX = event.clientX - this.startX;
    this.offsetY = event.clientY - this.startY;
    const modalContent = this.modalContent.nativeElement as HTMLElement;
    modalContent.style.transform = `translate(${this.offsetX}px, ${this.offsetY}px)`;
  }

  setZIndex(zIndex: number): void {
    const modalElement = this.modalElement.nativeElement as HTMLElement;
    this.renderer.setStyle(modalElement, 'z-index', zIndex);
  }
  setDarkOpacity(opacity: number): void {
    const modalContent = this.modalContent.nativeElement as HTMLElement;
    this.renderer.setStyle(modalContent, 'background', `rgba(0, 0, 0, ${opacity})`);
  }
  addClass(className: string): void {
    const modalContent = this.modalContent.nativeElement as HTMLElement;
    this.renderer.addClass(modalContent, className);
  }
  deleteShadowClasses(): void {
    const modalContent = this.modalContent.nativeElement as HTMLElement;
    modalContent.classList.forEach(className => {
      if (className.startsWith('shadow-')) {
        this.renderer.removeClass(modalContent, className);
      }
    });
  }
}
