import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CalculatorService } from '../calculator.service';

@Component({
  selector: 'app-by-weight',
  templateUrl: './by-weight.component.html',
  styleUrls: ['./by-weight.component.css']
})
export class ByWeightComponent implements OnInit, OnDestroy {
  type =["Round ⌀", "Hex"];
  id: number;


  constructor(
    private calc: CalculatorService,
  ){}

  ngOnInit(){
    this.initForm()
  }
  
  private initForm() {
    let cutOff: number;
    let oal: number;
    let mainFacing: number;
    let subFacing: number;
    let barEnd = 3;
    let weight: number;
    let dia: number;
    let averageBar = 144;
    let cutTo = 48;
    let cycleTime: number

    this.calc.latheForm = new FormGroup({
      'cycleTime': new FormControl(cycleTime),
      "type": new FormControl(this.type[0]),
      "averageBar": new FormControl(averageBar),
      "cutTo": new FormControl(cutTo),
      "material" : new FormControl(this.calc.densities[0].material),
      "dia": new FormControl(dia),
      "weight": new FormControl(weight),
      'cutOff': new FormControl(cutOff, Validators.required),
      'oal': new FormControl(oal, Validators.required),
      'mainFacing': new FormControl(mainFacing, Validators.required),
      'subFacing': new FormControl(subFacing),
      'barEnd': new FormControl(barEnd, Validators.required),
    });
  }

  ngOnDestroy(){
    this.calc.resetValues()
  }


}
