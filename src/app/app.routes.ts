import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
// import { MicrochipsComponent } from './components/microchips/microchips.component';
// import { BitDepthValueComponent } from './components/microchips/bit-depth-value/bit-depth-value.component';
import { BarComponent } from './graphics/bar/bar.component';
import { TemplateComponent } from './template/template.component';
import { LineComponent } from './graphics/line/line.component';
import { AreaComponent } from './graphics/area/area.component';
import { StackedBarComponent } from './graphics/stacked/stacked.component';


export const routes: Routes = [
    { path: '', redirectTo: 'main', pathMatch: 'full' },
    { path: 'main', component:  MainComponent },
    { path: 'main/template/:table/:column', component:  TemplateComponent },
    { path: 'main/bar/:table/:column', component:  BarComponent },
    { path: 'main/line/:table/:column', component:  LineComponent },
    { path: 'main/area/:table/:column', component:  AreaComponent },
    { path: 'main/stacked/:table/:column', component:  StackedBarComponent },
];
