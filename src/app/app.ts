import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <main class="app-layout">
      <router-outlet />
    </main>
  `,
  styles: [
    `
      .app-layout {
        max-width: 900px;
        margin: 2rem auto;
        padding: 0 1rem;
      }
    `,
  ],
})
export class App {
  protected readonly title = signal('frontend');
}
