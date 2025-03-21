import { LightningElement, track } from 'lwc';
import fetchsqm from '@salesforce/apex/Vetrotech_Sales_Cls.getvolume';

export default class Vetrotech_Sales_report extends LightningElement {
@track vdata =[];
@track pdata =[];
@track tablerend= false;
@track tablerendfalse = false;
@track monthOptions;
@track selectedlabel1;
@track selectedlabel2;
@track selectedlabel3;
@track selectedlabel4;
@track errormsg;
@track error;
@track columns = ['Fire','Protect','Total','PFire','PProtect','PTotal','YFire','YProtect','YTotal']
curyear = new Date().getFullYear();
year = new Date().getFullYear()-1;
Title ='Vetrotech Sales';

connectedCallback(){

    this.frommonth = 'From Month Of Previous year';
    this.tomonth = 'To Month Of Previous year';
    this.yfrommonth = 'From Month Of Current Year';
    this.ytomonth = 'To Month Of Current Year';
    
    this.monthOptions = [
        { label: 'Jan', value: '01' },
        { label: 'Feb', value: '02' },
        { label: 'Mar', value: '03' },
        { label: 'Apr', value: '04' },
        { label: 'May', value: '05' },
        { label: 'Jun', value: '06' },
        { label: 'Jul', value: '07' },
        { label: 'Aug', value: '08' },
        { label: 'Sep', value: '09' },
        { label: 'Oct', value: '10' },
        { label: 'Nov', value: '11' },
        { label: 'Dec', value: '12' }
    ];
}

    handleMonthChange(event0) {
        this.selectedMonth = event0.detail.value;
        this.selectedlabel1 = this.monthOptions.find(option => option.value === this.selectedMonth).label;
    }

    handleMonthChange1(event1) {
    this.selectedMonth1 = event1.detail.value;
    this.selectedlabel2 = this.monthOptions.find(option => option.value === this.selectedMonth1).label;
    }

    handleMonthChange2(event2) {
        this.selectedMonth2 = event2.detail.value;
        this.selectedlabel3 = this.monthOptions.find(option => option.value === this.selectedMonth2).label;
    }
    
    handleMonthChange3(event3) {
            this.selectedMonth3 = event3.detail.value;
            this.selectedlabel4 = this.monthOptions.find(option => option.value === this.selectedMonth3).label;
    }
     
    handleSubmit(event) {
    
        if(this.selectedMonth !=undefined && this.selectedMonth1 != undefined && this.selectedMonth2 != undefined && this.selectedMonth3 != undefined )
        {
         fetchsqm ({frm : this.selectedMonth , to : this.selectedMonth1, yfrm :this.selectedMonth2, yto : this.selectedMonth3 })
        .then (result =>{
        this.tablerend = true;
        this.tablerendfalse= false;
        this.vdata = result;
        this.error =undefined;
        })
    .catch(error=>{
        if (error && error.body && error.body.message) {
        this.error = error.body.message;
        }
        else {
            this.errorMessage = 'An unknown error occurred.';
        }
        this.tablerendfalse =true;
        this.vdata = undefined;
        
    })

 
}
else{
    this.tablerendfalse = true;
    this.errormsg ='Please Make Month Selection'; 
}
    }
    
}