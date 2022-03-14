import { Component, OnInit } from '@angular/core';
import { Theme } from 'src/models/theme';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css']
})
export class ThemesComponent implements OnInit {

  themes: Theme[] = [];

  constructor(private themeService: ThemeService) { }

  loadThemes(): void {
    this.themeService.getThemes().subscribe(
      response => response.map(t =>
        this.themes.push(new Theme(t.themeName, t.userId?.username, t.created_at, t.subscribers.length)))
    )
  }

  ngOnInit(): void {
    this.loadThemes();
  }

}
