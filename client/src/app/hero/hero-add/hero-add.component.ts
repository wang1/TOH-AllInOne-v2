import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeroService } from '../hero.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-add',
  templateUrl: './hero-add.component.html',
  styleUrls: ['./hero-add.component.scss']
})
export class HeroAddComponent implements OnInit {

  heroForm: FormGroup;
  isLoading = false;
  constructor(
    private router: Router,
    private heroService: HeroService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private location: Location,
  ) {}

  ngOnInit() {
    this.heroForm = this.formBuilder.group({
      no: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(4)]],
      salary: [8964, [Validators.min(0), Validators.max(9999999)]],
      description: [''],
      isTop: [false],
    });
  }

  onFormSubmit() {
    this.isLoading = true;
    // heroForm.value即上面构建的Hero对象
    this.heroService.addHero(this.heroForm.value).subscribe(({ data }) => {
      this.isLoading = false;
      this.snackBar.open(`${this.heroForm.value.name}添加成功!`, '关闭', {
        duration: 2000,
      });
      this.router.navigate(['/hero-detail', data.addHero.id]);
    });
  }

  goBack() {
    this.location.back();
  }
}
