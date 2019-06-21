import { Component, OnInit } from '@angular/core';

import { NgForm, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Bar } from './bar.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  submitted = false;
  cutOff: number;
  oal: number;
  facing: number;
  barEnd: number;
  partsToDate: number;
  cycleTime: number;
  latheForm: FormGroup;
  bars: Bar[];

  partsToMake: number;


  ngOnInit(){
    this.initForm()
    this.newBars();
  }
  
  private initForm() {
    let cutOff: number;
    let oal: number;
    let mainFacing: number;
    let subFacing: number;
    let barEnd: number;
    let bars = new FormArray([]);


    this.latheForm = new FormGroup({
      'cutOff': new FormControl(cutOff, Validators.required),
      'oal': new FormControl(oal, Validators.required),
      'mainFacing': new FormControl(mainFacing, Validators.required),
      'subFacing': new FormControl(subFacing, null),
      'barEnd': new FormControl(barEnd, Validators.required),
      'bars': bars
    });
  }

  onSubmit(){
    this.cutOff = this.latheForm.value.cutOff;
    this.oal = this.latheForm.value.oal;
    this.facing = this.latheForm.value.mainFacing + this.latheForm.value.subFacing;
    this.barEnd = this.latheForm.value.barEnd;
    this.bars = this.latheForm.value.bars;
    this.partsToMake = this.calculateQuantity();
    this.submitted = true;
  }

  calculateQuantity(){
    let totalPartLength = this.oal + this.cutOff + this.facing;
    let totalPieces = 0;
    let id = 0;
    for (var i in this.bars){
      let length = this.bars[i].barLength - this.barEnd;
      let pieces = Math.floor(length/totalPartLength);
      let tempTotal = pieces * this.bars[i].noBars;
      totalPieces = totalPieces + tempTotal;
      id = id + 1;
    }
    return totalPieces;
  }

  calculateTime(){

  }

  getControls(){
    return (<FormArray>this.latheForm.get('bars')).controls;
  }

  newBars() {
    (<FormArray>this.latheForm.get('bars')).push(
      new FormGroup({
        'noBars': new FormControl(null, Validators.required),
        'barLength': new FormControl(null, Validators.required)
      })
    )
  }

  onRemoveBar(index: number){
    (<FormArray>this.latheForm.get('bars')).removeAt(index);
  }


}
