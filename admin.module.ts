import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlockUIModule } from 'ng-block-ui';
import { EditorModule } from 'primeng/editor';
// import { FileUploadModule } from 'primeng/fileupload';
import { FileUploadModule } from 'ng2-file-upload';
import { ModalModule } from 'ngx-bootstrap/modal'; // module injection
import { TokenInterceptor } from '../../interceptor/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule } from 'primeng/calendar';
import { AppConfig } from '../../app.config';
import { NgxMatDrpModule } from 'ngx-mat-daterange-picker';
import { AccordionModule } from 'primeng/accordion';
import { ChartModule } from 'primeng/chart';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MomentModule } from 'angular2-moment/moment.module';
import { AuthGuard } from '../../guard/auth.guard';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminPropsComponent } from './admin-props/admin-props.component';
import { BringbackComponent } from './bringback/bringback.component';
import { CampaignComponent } from './campaign/campaign.component';
import { AccountComponent } from './account/account.component';
import { SocialpostComponent } from './socialpost/socialpost.component';
import { ReferralComponent } from './referral/referral.component';
import { AdminService } from '../../services/admin.service';

import { ChartsModule } from 'ng2-charts';
import { EditCampaignComponent } from './edit-campaign/edit-campaign.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { TimeChangePipe } from 'src/app/pipes/timechange.pipe';
import { RecentAccountComponent } from './recent-account/recent-account.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PaginatorModule } from 'primeng/paginator';
import { RatingModule } from 'primeng/rating';
import { ReviewListComponent } from './review-list/review-list.component';
import { PageMetaTagsComponent } from './page-metatags/metaTags.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AdminRoutingModule,
        CalendarModule,
        NgxMatDrpModule,
        AccordionModule,
        AutoCompleteModule,
        ChartModule,
        MomentModule,
        BlockUIModule,
        EditorModule,
        FileUploadModule,
        ModalModule.forRoot(),
        ChartsModule,
        MultiSelectModule,
        SelectButtonModule,
        PaginatorModule,
        RatingModule
    ],
    declarations: [
        AdminDashboardComponent,
        AdminPropsComponent,
        BringbackComponent,
        CampaignComponent,
        AccountComponent,
        SocialpostComponent,
        ReferralComponent,
        EditCampaignComponent,
        TimeChangePipe,
        RecentAccountComponent,
        ReviewListComponent,
        PageMetaTagsComponent
    ],
    providers: [
        AdminService,
        AppConfig,
        AuthGuard,
        // InstructorsService,

        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        },
        // PasswordValidation
    ]
})
export class AdminModule { }
