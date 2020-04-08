import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-edit',
  templateUrl: './hero-edit.component.html',
  styleUrls: ['./hero-edit.component.scss']
})
export class HeroEditComponent implements OnInit {

  heroForm: FormGroup;
  id = '';
  no = '';
  name = '';
  salary = 0;
  description = '';
  isTop = false;
  // matcher = new MyErrorStateMatcher();
  isLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroService: HeroService,
    private formBuilder: FormBuilder,
    private location: Location,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.heroForm = this.formBuilder.group({
      no: ['', Validators.required],
      name: ['', Validators.required],
      salary: [0],
      description: [''],
      isTop: [false],
    });

    this.heroService
      .getOneHeroById(this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(({ data }) => {
        this.id = data.getOneHeroById.id;
        this.heroForm.setValue({
          no: data.getOneHeroById.no,
          name: data.getOneHeroById.name,
          salary: data.getOneHeroById.salary,
          description: data.getOneHeroById.description,
          isTop: data.getOneHeroById.isTop,
        });
      });
  }

  onFormSubmit() {
    this.isLoading = true;
    this.heroService.updateHero(this.heroForm.value).subscribe(() => {
      this.isLoading = false;
      this.snackBar.open(`${this.heroForm.value.name}保存成功!`, '关闭', {
        duration: 2000,
      });
      this.goBack();
    });
  }

  goBack() {
    this.location.back();
  }
}
