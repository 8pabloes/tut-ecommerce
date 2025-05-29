package com.tfc.rallyshop.config;

import com.stripe.Stripe;
import org.springframework.context.annotation.Configuration;
import jakarta.annotation.PostConstruct;

@Configuration
public class StripeConfig {

    @PostConstruct
    public void init() {
       Stripe.apiKey = System.getenv("STRIPE_SECRET_KEY");
}
}
