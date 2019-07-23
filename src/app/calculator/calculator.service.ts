import { Injectable } from '@angular/core';
import { Bar } from './bar.model';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';


@Injectable({providedIn: 'root'})
export class CalculatorService {
    submitted = false;
    cutOff: number;
    oal: number;
    facing: number;
    barEnd: number;
    partsToDate: number;
    cycleTime: number;
    latheForm: FormGroup;
    bars: Bar[];
    runHours: number;

    partsToMake: number;
    mainFacing: number;
    subFacing: number;

    cutTo: number;
    fullBars: Bar[] =[]
    regBars = 0;
    weight: number;
    dia: number;
    density: number;
    hexSize: number;
    averageBar: number;
    feet: number;


    materials =[
        "Stainless Steel",
        "Steel",
        "Carbon Steel",
        "Aluminum",
        "Monel",
        "Delrin",
        "A286"
    ];

    densities = [
        {
            material: "Stainless Steel", 
            density: ".289"
        },
        {
            material: "Steel", 
            density: ".28"
        },
        {
            material: "Carbon Steel", 
            density: ".285"
        },
        {
            material: "Aluminum", 
            density: ".098"
        },
        {
            material: "Monel", 
            density: ".318"
        },
        {
            material: "Delrin", 
            density: ".0513"
        },
        {
            material: "A286", 
            density: ".286"
        }
    ];


    resetValues(){
        this.submitted = false;
        this.cutOff = null;
        this.oal = null;
        this.facing = null;
        this.barEnd = null;
        this.latheForm = null;
        this.bars = null;
        this.partsToMake = null;

        this.cutTo = null;
        this.fullBars = null;
        this.regBars = 0;
        this.weight = null;
        this.density = null;
        this.hexSize = null;
        this.averageBar = null;
        this.feet = null;

        this.cycleTime = null;
        this.partsToDate = null;
    }

    onSubmitRemaining(){
        this.cutOff = this.latheForm.value.cutOff;
        this.oal = this.latheForm.value.oal;
        this.facing = this.latheForm.value.mainFacing + this.latheForm.value.subFacing;
        this.barEnd = this.latheForm.value.barEnd;
        this.bars = this.latheForm.value.bars;
        this.partsToMake = this.calculateQuantity();
        if (this.latheForm.value.cycleTime){
            this.cycleTime = this.latheForm.value.cycleTime;
            this.runHours = +this.findRunTime().toFixed(2)
        }
        this.submitted = true;
    }


    onSubmitTotal(){
        this.cutTo = +this.latheForm.value.cutTo
        this.cutOff = this.latheForm.value.cutOff;
        this.oal = this.latheForm.value.oal;
        this.subFacing = this.latheForm.value.subFacing;
        this.mainFacing = this.latheForm.value.mainFacing
        this.facing = +this.mainFacing + +this.subFacing;
        this.barEnd = this.latheForm.value.barEnd;
        this.fullBars = this.latheForm.value.bars;
        this.findRunable();
        this.partsToMake = this.calculateQuantity()
        if (this.latheForm.value.cycleTime){
            this.cycleTime = this.latheForm.value.cycleTime;
            this.runHours = +this.findRunTime().toFixed(2)
        }
        this.submitted = true;
    }


    onSubmitByWeight(){
        this.averageBar = +this.latheForm.value.averageBar
        this.cutTo = +this.latheForm.value.cutTo
        this.weight = this.latheForm.value.weight
        this.cutOff = this.latheForm.value.cutOff;
        this.oal = this.latheForm.value.oal;
        this.subFacing = this.latheForm.value.subFacing;
        this.mainFacing = this.latheForm.value.mainFacing
        this.facing = this.mainFacing + this.subFacing;
        this.barEnd = this.latheForm.value.barEnd;
        this.bars = this.latheForm.value.bars;
        let matPick = this.densities.filter( mat =>{
            return mat.material === this.latheForm.value.material
        })
        this.density = +matPick[0].density
        if (this.latheForm.value.type == "Hex"){
            this.hexSize = this.latheForm.value.dia;
            this.findLengthFromHexWeight();
        } else {
            this.dia = this.latheForm.value.dia;
            this.findLengthFromWeight();
        }
        this.findRunable();
        this.partsToMake = this.calculateQuantity()
        if (this.latheForm.value.cycleTime){
            this.cycleTime = this.latheForm.value.cycleTime;
            this.runHours = +this.findRunTime().toFixed(2)
        }
        this.submitted = true;
    }

    calculateQuantity(){
        let totalPartLength: number = this.oal + this.cutOff + this.facing;
        let totalPieces = 0;
        for (let i in this.bars){
          let length;Number;
          if (this.bars[i].barLength > this.barEnd){ 
              length = this.bars[i].barLength - this.barEnd;
          } else {
              length = 0
          }
          let pieces = Math.floor(length/totalPartLength);
          let tempTotal = pieces * this.bars[i].noBars;
          totalPieces = totalPieces + tempTotal;
        }
        return totalPieces;
    }
    
    findRunTime(){
        // let totalSecs = this.cycleMin * 60 + this.cycleSec;
        let secsLeft = this.cycleTime * this.partsToMake;
        let hoursLeft = secsLeft/3600;
            return hoursLeft
    }

       
    findRunable(){
        this.regBars = 0;
        this.bars = [];
        let barRegHold: Bar={
            "barLength": 0,
            "noBars": 0
        };
        for (let bar in this.fullBars){
            let barHold: Bar={
                "barLength": 0,
                "noBars": 0
            };
            barHold.noBars = this.fullBars[bar].noBars;
            this.regBars = this.regBars + (Math.floor(+this.fullBars[bar].barLength/this.cutTo)*this.fullBars[bar].noBars);
            barHold.barLength = this.fullBars[bar].barLength%this.cutTo;
            if (barHold.barLength != 0){
                this.bars.push(barHold);
            }
        }
        barRegHold.noBars = this.regBars;
        barRegHold.barLength = this.cutTo;
        this.bars.push(barRegHold);
    }
    
    findLengthFromWeight(){
        let fullBars: Bar[] = [];
        let barSizedHold: Bar ={
            "barLength": 0,
            "noBars": 0
        };
        let barHold: Bar ={
            "barLength": 0,
            "noBars": 0
        };
        let rad = this.dia/2;
        let radSq = rad * rad;
        let area = Math.PI * radSq;
        let inWeight = this.density * area;
        let ftWeight = inWeight * 12;
        this.feet = this.weight/ftWeight;
        barSizedHold.barLength = this.averageBar
        barSizedHold.noBars = Math.floor(this.feet*12/this.averageBar)
        fullBars.push(barSizedHold);
        barHold.barLength = this.feet%this.averageBar;
        barHold.noBars = 1
        fullBars.push(barHold)
        this.fullBars = fullBars
        this.feet = +this.feet.toFixed(2)
    }

    findLengthFromHexWeight(){
        this.fullBars = [];
        let barHold: Bar={
            "barLength": 0,
            "noBars": 0
        };
        let barSizedHold: Bar ={
            "barLength": 0,
            "noBars": 0
        };
        let edge = this.hexSize/(Math.sqrt(3))
        let area = edge*edge*3*Math.sqrt(3)/2
        let inWeight = this.density * area;
        let ftWeight = inWeight * 12;
        this.feet = this.weight/ftWeight;
        barSizedHold.barLength = this.averageBar
        barSizedHold.noBars = Math.floor(this.feet*12/this.averageBar)
        this.fullBars.push(barSizedHold);
        barHold.barLength = this.feet%this.averageBar;
        barHold.noBars = 1
        this.fullBars.push(barHold)
        this.feet = +this.feet.toFixed(2)
    }
      
    
    getControls(){
    return (<FormArray>this.latheForm.get('bars')).controls;
    }

    newBars() {
    (<FormArray>this.latheForm.get('bars')).push(
        new FormGroup({
        'noBars': new FormControl(1, Validators.required),
        'barLength': new FormControl(null, Validators.required)
        })
    )
    }

    onRemoveBar(index: number){
    (<FormArray>this.latheForm.get('bars')).removeAt(index);
    }
    

}