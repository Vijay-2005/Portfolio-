import { timer, Observable } from 'rxjs';
import { HashnodeService } from './../services/hashnode.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent {
  loading: boolean = true; // Added loading state
  blogPostData: any = null; // Store actual data
  errorFetching: boolean = false; // Store error state

  constructor(private hashnodeService: HashnodeService) { }

  blogPost$: Observable<any> | undefined;
  
  ngOnInit(): void {
    this.blogPost$ = this.hashnodeService.getBlogPosts();

    this.blogPost$.subscribe({
      next: (response) => {
        // Checking to see if it returned GraphQL data correctly
        if (response && response.data) {
          this.blogPostData = response.data;
        } else {
          this.errorFetching = true;
        }
        timer(1000).subscribe(() => (this.loading = false));
      },
      error: (err) => {
        console.error('Error fetching blogs:', err);
        this.errorFetching = true;
        timer(1000).subscribe(() => (this.loading = false));
      },
    });
  }

}
