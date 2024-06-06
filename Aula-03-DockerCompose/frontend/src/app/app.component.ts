import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Data } from './Data';

const HOST = 'http://localhost';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  data: Data[] = Array();
  url = HOST+':4000/results';
  month = Array();
  price = Array();
  chart!: Chart;
  
  constructor(private httpClient: HttpClient) {
	Chart.register(...registerables);  
  }

  ngOnInit() {
    this.httpClient.get<Data[]>(this.url).subscribe({
        next: (res: Data[]) => {
			res.forEach((y: Data) => {
			  this.month.push(y.month);
			  this.price.push(y.price);
			});
			this.chart = new Chart('canvas', {
			  type: 'line',
			  data: {
				labels: this.month,
				datasets: [
				  {
					data: this.price,
					borderColor: '#3cba9f',
					fill: false
				  }
				]
			  },
			  options: {
				scales: {
					x: {
						display: true
					},
					y: {
						display: true
					}
				},
				plugins: {
					legend: {
						display: false
					}
				}
			  }
			});
		},
        error: (e) => console.log(e),
        complete: () => console.info("Complete!")
    });
    
  }
}