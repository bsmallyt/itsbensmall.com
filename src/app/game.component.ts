import { Component, ElementRef, OnInit, AfterViewInit, OnDestroy, ViewChild, Renderer2, Inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import * as game from '../assets/game.js';

@Component({
  selector: 'app-game',
  standalone: true,
  template: `
    <canvas #myCanvas style="border:none; background:white"></canvas>
  `,
  imports: [CommonModule]
})
export class AppGame implements AfterViewInit, OnDestroy {
  @ViewChild('myCanvas', { static: true }) game!: ElementRef<HTMLCanvasElement>;

  constructor(private renderer2: Renderer2, @Inject(DOCUMENT) private document: Document) {}

  ngOnDestroy() {
    game.stop();
  }

  ngAfterViewInit() {
    this.initializeGame();
  }

  initializeGame() {
    this.resizeCanvas();
    const canvas = this.game.nativeElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      game.stop(); 
      game.startGame(ctx, canvas);
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.resizeCanvas();
  }

  private resizeCanvas() {
    const canvas = this.game.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 113;
    game.resize(canvas);
  }
}
