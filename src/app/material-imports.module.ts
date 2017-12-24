import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule,
  MatChipsModule,
  MatGridListModule,
  MatButtonModule,
  MatCheckboxModule, MatSnackBarModule, MatButtonToggleModule, MatExpansionModule, MatListModule, MatMenuModule,
  MatToolbarModule, MatTooltipModule, MatFormFieldModule, MatIconModule, MatCardModule } from '@angular/material';


@NgModule({
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatExpansionModule,
    MatListModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatMenuModule
  ],
  exports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatExpansionModule,
    MatListModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatMenuModule
  ]
})
export class MaterialImportsModule {

}
