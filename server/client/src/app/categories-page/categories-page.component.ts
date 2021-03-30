import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/interfaces';
import { CategoriesService } from '../shared/services/categories.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {

  isLoading = false
  categories: Category[] = []

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.isLoading = true
    this.categoriesService.fetchAll().subscribe(categories => {
      this.isLoading = false
      this.categories = categories
    })
  }

}
