import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Bar } from "../bar.model"
import { CalculatorService } from '../calculator.service';

@Component({
  selector: 'app-remaining',
  templateUrl: './remaining.component.html',
  styleUrls: ['./remaining.component.css']
})
export class RemainingComponent implements OnInit, OnDestroy {
  id: number;

  constructor(
    private calc: CalculatorService,
  ){}

  ngOnInit(){
    this.initForm();
    setTimeout(()=>{
      this.calc.newBars();
    })
  }
  
  private initForm() {
    let cutOff: number;
    let oal: number;
    let mainFacing: number;
    let subFacing: number;
    let barEnd = 3;
    let bars = new FormArray([]);
    let cycleTime: number


    this.calc.latheForm = new FormGroup({
      'cycleTime': new FormControl(cycleTime),
      'cutOff': new FormControl(cutOff, Validators.required),
      'oal': new FormControl(oal, Validators.required),
      'mainFacing': new FormControl(mainFacing, Validators.required),
      'subFacing': new FormControl(subFacing, null),
      'barEnd': new FormControl(barEnd, Validators.required),
      'bars': bars
    });
  }

  ngOnDestroy(){
    this.calc.resetValues();
  }

}
