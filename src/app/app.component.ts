import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'to_do_list';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }
  ngOnInit(){
    this.activatedRoute.fragment.subscribe((val)=> {
      console.log(val);
      this.jumpTo(val);
    })
      
  }

  jumpTo(section?: string | null) {
    document.getElementById(section  as string)?.scrollIntoView({ behavior: 'smooth' });
  }
  

  goHome() {
    this.router.navigateByUrl('Home');
  }
}
