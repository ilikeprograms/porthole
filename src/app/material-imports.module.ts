import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import {
  MatSelectModule,
  MatDialogModule,
  MatChipsModule,
  MatGridListModule,
  MatButtonModule,
  MatCheckboxModule, MatSnackBarModule, MatButtonToggleModule, MatExpansionModule, MatListModule, MatMenuModule,
  MatToolbarModule, MatTooltipModule, MatFormFieldModule, MatIconModule, MatCardModule, MatTabsModule, MatSidenavModule
} from '@angular/material';


@NgModule({
  imports: [
    MatSidenavModule,
    MatSelectModule,
    MatDialogModule,
    MatTabsModule,
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
    MatSidenavModule,
    MatSelectModule,
    MatDialogModule,
    MatTabsModule,
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
