import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';
import { SharedService } from '../../shared/shared.service';


@Component({
  selector: 'app-hero-edit',
  templateUrl: './hero-edit.component.html',
  styleUrls: ['./hero-edit.component.scss']
})
export class HeroEditComponent implements OnInit {

  heroForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroService: HeroService,
    private formBuilder: FormBuilder,
    private location: Location,
    private sharedServie: SharedService,
  ) { }

  ngOnInit(): void {
    this.heroForm = this.formBuilder.group({
      id: [''],
      no: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(4)]],
      salary: [0, Validators.min(0)],
      description: [''],
      isTop: [false],
    });

    this.heroService
      .getOneHeroById(this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(({ data }) => {
        this.heroForm.setValue({
          id: data.getOneHeroById.id,
          no: data.getOneHeroById.no,
          name: data.getOneHeroById.name,
          salary: data.getOneHeroById.salary,
          description: data.getOneHeroById.description,
          isTop: data.getOneHeroById.isTop,
        });
      });
  }

  onFormSubmit() {

    this.heroService.updateHero(this.heroForm.value).subscribe(() => {

      this.sharedServie.openSnackBar(`${this.heroForm.value.name}修改成功！`);
      this.goBack();
    });
  }

  goBack() {
    this.location.back();
  }
}
