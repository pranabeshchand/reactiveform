
import { NgModule } from '@angular/core';
import { Router, Route, Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminPropsComponent } from './admin-props/admin-props.component';
import { BringbackComponent } from './bringback/bringback.component';
import { CampaignComponent } from './campaign/campaign.component';
import { AccountComponent } from './account/account.component';
import { SocialpostComponent } from './socialpost/socialpost.component';
import { ReferralComponent } from './referral/referral.component';
import { AuthGuard } from '../../guard/auth.guard';
import { EditCampaignComponent } from './edit-campaign/edit-campaign.component';
import { RecentAccountComponent } from './recent-account/recent-account.component';
import { ReviewListComponent } from './review-list/review-list.component';
import { PageMetaTagsComponent } from './page-metatags/metaTags.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                canActivate: [AuthGuard],
                component: AdminDashboardComponent,
            },
            {
                path: 'account',
                canActivate: [AuthGuard],
                component: AccountComponent
            },
            {
                path: 'props',
                component: AdminPropsComponent
            },
            {
                path: 'bringback',
                canActivate: [AuthGuard],
                component: BringbackComponent
            },
            {
                path: 'campaign',
                canActivate: [AuthGuard],
                component: CampaignComponent
            },
            {
                path: 'reviews',
                canActivate: [AuthGuard],
                component: ReviewListComponent
            },
            {
                path: 'pagemeta',
                canActivate: [AuthGuard],
                component: PageMetaTagsComponent
            },
            {
                path: 'scoialpost',
                canActivate: [AuthGuard],
                component: SocialpostComponent
            },
            {
                path: 'referral',
                canActivate: [AuthGuard],
                component: ReferralComponent
            },
            {
                path: 'campaign/:way/:type/:name/:id',
                canActivate: [AuthGuard],
                component: EditCampaignComponent
            },
            {
                path: 'recent-account',
                canActivate: [AuthGuard],
                component: RecentAccountComponent
            }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {

}
