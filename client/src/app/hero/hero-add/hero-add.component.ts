import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';
import { SharedService } from '../../shared/shared.service';


@Component({
  selector: 'app-hero-add',
  templateUrl: './hero-add.component.html',
  styleUrls: ['./hero-add.component.scss']
})
export class HeroAddComponent implements OnInit {

  heroForm: FormGroup;
  // isLoading = false;
  constructor(
    private router: Router,
    private heroService: HeroService,
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private location: Location,
  ) {}

  ngOnInit() {
    this.heroForm = this.formBuilder.group({
      no: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(4)]],
      salary: [8964, [Validators.min(0)]],
      description: [''],
      isTop: [false],
    });
  }

  onFormSubmit() {
    // heroForm.value即上面构建的Hero对象
    this.heroService.addHero(this.heroForm.value).subscribe(({ data }) => {

      this.sharedService.openSnackBar(`${this.heroForm.value.name}添加成功!`);
      this.router.navigate(['/hero-detail', data.addHero.id]);
    });
  }

  goBack() {
    this.location.back();
  }
}
