import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Employees } from 'app/model/employee';
import { SignupService } from 'app/services/signup.service';
 



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  dataServer: any = [];
  userForm: FormGroup;
  empObj: Employees = new Employees();
  editId: any;


  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private signupservice: SignupService) { }


  formbuilderMEthod(data) {

    this.userForm = this.formBuilder.group({
      employee_name: [data.employee_name, [Validators.required, Validators.minLength(3),]],
      designation: [data.designation, []],
      salary: [data.salary, [Validators.required,]],
      email: [data.email, [Validators.required, Validators.email,]],
      phone_number: [data.phone_number, [Validators.required, Validators.minLength(10),]],
      qualification: [data.qualification, []],
      manager: [data.manager, []],
    });
  }
  ngOnInit() {
    this.getAllemployee();
    this.formbuilderMEthod("data")
  }


  get employee_name() {
    return this.userForm.get("employee_name");
  }

  get designation() {
    return this.userForm.get("designation");
  }
  get salary() {
    return this.userForm.get("salary");
  }

  get phone_number() {
    return this.userForm.get("phone_number");
  }
  get email() {
    return this.userForm.get("email");
  }
  get qualification() {
    return this.userForm.get("qualification");
  }
  get manager() {
    return this.userForm.get("manager");
  }
  reset() {
    this.userForm.reset();
    this.editId = ""
  }

  updateLocalStorage() {
    localStorage.setItem('key', JSON.stringify(this.dataServer));

  }
  onSubmit() {
    console.log(this.userForm.value);
    console.log("edit Id", this.editId)
    if (this.editId != '' && this.editId != undefined) {
      this.dataServer[this.editId] = this.userForm.value

    } else {
      this.dataServer.push(this.userForm.value)

    }
    this.updateLocalStorage()
    this.getAllemployee()
    this.reset()

  }
  getAllemployee() {
    this.dataServer = JSON.parse(localStorage.getItem('key'))

  }
  editEmployee(index) {
    this.editId = index;
    this.formbuilderMEthod(this.dataServer[index])

  }
  deleteEmployee(i) {
    this.dataServer.splice(i, 1);
    this.updateLocalStorage()

  }

}


