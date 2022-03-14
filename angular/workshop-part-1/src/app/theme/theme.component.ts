import { Component, Input, OnInit } from '@angular/core';
import { Theme } from 'src/models/theme';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {

  @Input() theme!: Theme;

  constructor() { }

  ngOnInit(): void {
  }
}
