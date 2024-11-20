// PaymentForm.tsx

import React, { useEffect, useState } from "react";
import { loadStripe, StripeError } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  TextField,
  Snackbar,
} from "@mui/material";
import { useSelector } from "react-redux";
import { AppState } from "../store";
import { useLocation, useParams } from "react-router-dom";
import { Donation } from "../models/donation";

const stripePromise = loadStripe(
  "pk_test_51P5Sz6BjFOxRNNm30hhvK11HTQdkQgswBZn51U8SYKwZCwAqsQef5gpGXdhHdFBTCkQEw2lQGJkrPtXiRoDYws7j00rc7D5nOG"
);

const CheckoutForm: React.FC = (props) => {
  const { id } = useParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false); // [1]
  const [amount, setAmount] = useState<Number>(0);
  const stripe = useStripe();
  const elements = useElements();
  const [donationEvent, setDonationEvent] = useState<any>({});

  const loggedInUser = useSelector((state: AppState) => state.user);

  useEffect(() => {
    fetch(`http://localhost:3000/event/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to fetch event data");
      })
      .then((data) => {
        setDonationEvent(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const updateEvents = async (donation: Donation) => {
    const response = await fetch(`http://localhost:3000/event/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...donationEvent,
        donations: [...donationEvent.donations, donation],
        currentDonation: donationEvent.currentDonation + donation.amount,
      }),
    });

    if (response.ok) {
      // alert("Event updated successfully");
      setPaymentSuccess(true);
    } else {
      alert("Failed to update event");
    }
  };

  const createDonation = async (amount: Number) => {
    const response = await fetch("http://localhost:3000/donations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount, createdBy: loggedInUser }),
    });

    if (response.ok) {
      const data = await response.json();

      updateEvents(data);
    } else {
      alert("Failed to create donation");
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setError(error.message ?? "An error occurred");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/payment/create-payment-intent",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: Number(amount) * 100 }), // Set your desired amount
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create payment intent");
      }

      const { clientSecret } = await response.json();

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod?.id as string,
      });

      if (error) {
        setError(error.message ?? "An error occurred");
        setLoading(false);
      } else {
        createDonation(amount);
        setLoading(false);
      }
    } catch (err) {
      setError((err as Error).message ?? "An error occurred");
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={2} style={{ height: "100vh" }}>
      <Grid item xs={12} sm={6}>
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <CardHeader
            title="Payment Information"
            sx={{
              backgroundColor: "#f0f0f0",
              borderBottom: "1px solid #ccc",
              padding: "12px 16px",
              borderRadius: "2px 2px 0 0",
            }}
          />
          <CardContent
            sx={{ flex: 1, display: "flex", flexDirection: "column" }}
          >
            <Typography variant="body2" sx={{ marginBottom: 1 }}>
              <strong>Event name:</strong> {donationEvent.title}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 1 }}>
              <strong>Description:</strong> {donationEvent.description}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 1 }}>
              <strong>Price:</strong> ${" "}
              {String(amount) ? amount.toString() : "0"}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <CardHeader title="Payment Form" />
          <CardContent>
            <form onSubmit={handleSubmit}>
              <CardElement />
              <br />
              <TextField
                label="Amount"
                type="number"
                InputProps={{ inputProps: { min: 1 } }}
                fullWidth
                required
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value))}
              />
              <Button
                type="submit"
                disabled={!stripe || loading}
                variant="contained"
                color="primary"
                sx={{ width: "50%", marginTop: 2 }}
              >
                {loading ? "Processing..." : "Pay Now"}
              </Button>
              {error && <div>{error}</div>}
            </form>
          </CardContent>
        </Card>
      </Grid>
      {paymentSuccess && (
        <Snackbar
          open={paymentSuccess}
          autoHideDuration={6000}
          onClose={() => setPaymentSuccess(false)}
          message="Payment successful"
        />
      )}
    </Grid>
  );
};

export const PaymentForm: React.FC = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);
