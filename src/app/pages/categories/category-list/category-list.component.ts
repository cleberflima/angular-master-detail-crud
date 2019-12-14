import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../shared/category.service';
import { Category } from '../shared/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe( 
      categories => this.categories = categories,
      error => alert('Ocorreu um erro!') );
  }

  deletarCategory(category: Category): void {
    const mustDelete = confirm('Deseja realmente excluir a categoria?');

    if (mustDelete) {
      this.categoryService.delete(category.id).subscribe(
        () => this.categories = this.categories.filter(el => el != category),
        () => alert("Erro ao tentar excluir!")
      )
    }
  }

}
