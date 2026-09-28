import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { ListingsModule } from './listings/listings.module.js';
import { CategoriesModule } from './categories/categories.module.js';
import { BookingsModule } from './bookings/bookings.module.js';
import { ReviewsModule } from './reviews/reviews.module.js';
import { WishlistsModule } from './wishlists/wishlists.module.js';
import { PaymentsModule } from './payments/payments.module.js';
import { ConversationsModule } from './conversations/conversations.module.js';
import { MessagesModule } from './messages/messages.module.js';
import { CancellationsModule } from './cancellations/cancellations.module.js';
import { ListingPhotosModule } from './listing-photos/listing-photos.module.js';
import { ListingAvailabilityModule } from './listing-availability/listing-availability.module.js';
import { FeaturesModule } from './features/features.module.js';
import { RatingFeaturesModule } from './rating-features/rating-features.module.js';
import { UserPaymentMethodsModule } from './user-payment-methods/user-payment-methods.module.js';
import { HelpArticlesModule } from './help-articles/help-articles.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'server',
    }),
    UsersModule,
    ListingsModule,
    CategoriesModule,
    BookingsModule,
    ReviewsModule,
    WishlistsModule,
    PaymentsModule,
    ConversationsModule,
    MessagesModule,
    CancellationsModule,
    ListingPhotosModule,
    ListingAvailabilityModule,
    FeaturesModule,
    RatingFeaturesModule,
    UserPaymentMethodsModule,
    HelpArticlesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
