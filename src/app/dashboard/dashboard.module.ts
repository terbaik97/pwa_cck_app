
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from "@angular/router";
import { IonicModule } from '@ionic/angular';
import { DashboardPageRoutingModule } from './dashboard-routing.module';
import { DashboardPage } from './dashboard.page';
import { NgCircleProgressModule } from 'ng-circle-progress';

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Dashboard",
      urls: [{ title: "Dashboard", url: "/dashboard" }, { title: "Dashboard" }],
    },
    component: DashboardPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgCircleProgressModule.forRoot({
      "clockwise": false,
      "unitsFontSize":"40",
      "titleFontSize": "57",
      "subtitleFontSize": "25",
      "titleColor":"#3880FF",
      "unitsColor":"#3880FF",
      "outerStrokeLinecap":"round",
    })
  ],
  declarations: [DashboardPage,]
})
export class DashboardPageModule {}
