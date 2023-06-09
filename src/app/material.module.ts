import { NgModule } from "@angular/core";
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

const MATERIAL_MODULES: NgModule['imports'] & NgModule['exports'] = [
  MatInputModule,
  MatButtonModule
];


@NgModule({
  imports: MATERIAL_MODULES,
  exports: MATERIAL_MODULES
})
export class MaterialModule {}