import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-what-is-sdux-vault',
  standalone: true,
  imports: [BlogLayoutComponent, RouterModule],
  templateUrl: './what-is-sdux-vault.component.html',
  styleUrls: ['../../../docs/scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogWhatIsSduxVaultComponent {}
