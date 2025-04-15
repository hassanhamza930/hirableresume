import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import Stripe from 'stripe';
import admin from 'firebase-admin';
import { send } from 'process';


interface UserDataInterface {
    uid?: string,
    email: string,
    name: string,
    profilePicture?: string,
    workExperience?: string,
    education?: string,
    portfolioLinks?: string,
    skills?: string,
    projects?: string,
    contactLinks?: string,
    onboarding: boolean,
    credits: number,
    pricingPlan: "free" | "pro"
}

async function getClientReferenceId(customerId: string): Promise<string|null> {
    try {
      const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer;
      
      return customer.email
    }
    catch (error) {
      console.error('Error getting customer:', error);
      return null;
    }
  }

const serviceAccount = require('./key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const stripe = new Stripe('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', {
    apiVersion: '2024-06-20',
});

const app = express();

app.use(bodyParser.raw({ type: 'application/json' }));


app.post('/webhook', async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'] as string;
    const endpointSecret = 'whsec_DANI3D0l0VDn8jnw13lUYqpy0XEm3DDW';
    // whsec_d9ddc78da765f31b1e4b82298d1210b088fb0a1ebae23c2f8b7fa9856cf9c327 local key
    // whsec_spXLJZlAbB28B9wAzgMEkaFP4MaMeBSY  testmode server key
    // whsec_DANI3D0l0VDn8jnw13lUYqpy0XEm3DDW livemode server key
    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error(`Webhook signature verification failed: ${err instanceof Error ? err.message : err}`);
        return res.status(400).send(`Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }

    switch (event.type) {

        case 'checkout.session.completed':
            const checkoutSessionCompleted = event.data.object;
            console.log(checkoutSessionCompleted);
            console.log(checkoutSessionCompleted.customer_details);
            console.log(checkoutSessionCompleted.client_reference_id);
            var amount = checkoutSessionCompleted.amount_total;
            console.log("amount is", amount);

            const docRef = db.collection('users').doc(checkoutSessionCompleted.client_reference_id!);
            await docRef.set({ credits: 500, pricingPlan: "pro" } as UserDataInterface, { merge: true }).then(() => {
                console.log('User package changed');
            })
                .catch((error) => {
                    console.error('Error updating data:', error);
                });

            break;

        case 'customer.subscription.updated':
            const subscription = event.data.object as Stripe.Subscription;
            var customerEmail= await getClientReferenceId(subscription.customer as string);
            console.log("Customer's Email, is:  ")
            console.log(customerEmail);
            var userDocs = await db.collection('users').where('email', '==', customerEmail).get();
            var userData=userDocs.docs[0].data() as UserDataInterface;
            console.log("User's Document is:  ")
            console.log(userData);

            if (subscription.cancel_at == null) {
                //this will check if the user is resubscribing
            
                const docRef = db.collection('users').doc(userData.uid as string);
                await docRef.set({ credits: 500, pricingPlan: "pro" } as UserDataInterface, { merge: true }).then(() => {
                    console.log('User package changed');
                })
                    .catch((error) => {
                        console.error('Error updating data:', error);
                    });
            }
            else {
                //this will be where the user cancelled
                const docRef = db.collection('users').doc(userData.uid as string);
                await docRef.set({ credits: 0, pricingPlan: "free" } as UserDataInterface, { merge: true }).then(() => {
                    console.log('User package changed');
                })
                    .catch((error) => {
                        console.error('Error updating data:', error);
                    });
            }
            break;

        case 'customer.subscription.deleted':
            var deletedSubscription = event.data.object as Stripe.Subscription;
            var customerEmail= await getClientReferenceId(deletedSubscription.customer as string);
            console.log("Customer's Email, is:  ")
            console.log(customerEmail);
            var userDocs = await db.collection('users').where('email', '==', customerEmail).get();
            var userData=userDocs.docs[0].data() as UserDataInterface;
            console.log("User's Document is:  ")
            console.log(userData);


            const docToUpdate = db.collection('users').doc(userData.uid as string);
            await docToUpdate.set({ credits: 0, pricingPlan: "free" } as UserDataInterface, { merge: true }).then(() => {
                console.log('User package changed');
            })
                .catch((error) => {
                    console.error('Error updating data:', error);
                });

            console.log(`Subscription canceled: ${deletedSubscription.id}`);
            res.status(200).send();
            break;

        default:
            console.warn(`Unhandled event type ${event.type}`);
    }

    res.status(200).send();
});

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World, Webhook is working");
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});