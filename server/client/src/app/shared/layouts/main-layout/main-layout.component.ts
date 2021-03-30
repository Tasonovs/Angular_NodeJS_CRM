import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MaterialService } from '../../services/material.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements AfterViewInit {

  @ViewChild('floating') floatingRef!: ElementRef

  links = [
    {url: '/overview', name: 'Обзор'},
    {url: '/analytics', name: 'Аналитика'},
    {url: '/history', name: 'История'},
    {url: '/order', name: 'Добавить заказ'},
    {url: '/categories', name: 'Ассортимент'}
  ]

  constructor(private auth: AuthService, private router: Router) { }

  //* Инициализируем элемент после загрузки DOM дерева
  ngAfterViewInit(): void {
    MaterialService.initFloatingButton(this.floatingRef)
  }

  logout(event: Event) {
    event.preventDefault()
    this.auth.logout()
    console.log('logout main')
    this.router.navigate(['/login'])
  }
}
