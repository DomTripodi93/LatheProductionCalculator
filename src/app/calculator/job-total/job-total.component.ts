import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { CalculatorService } from '../calculator.service';

@Component({
  selector: 'app-job-total',
  templateUrl: './job-total.component.html',
  styleUrls: ['./job-total.component.css']
})
export class JobTotalComponent implements OnInit, OnDestroy {
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
    let cutTo = 48;
    let cycleTime: number


    this.calc.latheForm = new FormGroup({
      'cycleTime': new FormControl(cycleTime),
      'cutOff': new FormControl(cutOff, Validators.required),
      'oal': new FormControl(oal, Validators.required),
      'mainFacing': new FormControl(mainFacing, Validators.required),
      'subFacing': new FormControl(subFacing, null),
      'barEnd': new FormControl(barEnd, Validators.required),
      "cutTo": new FormControl(cutTo),
      'bars': bars
    });
  }

  ngOnDestroy(){
    this.calc.resetValues()
  }


}