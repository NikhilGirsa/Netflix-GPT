import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Check } from "lucide-react";
import Header from "./Header";
import { setSubscription } from "../Utils/subscriptionSlice";
import { updateUserSubscription } from "../Utils/firestoreUtils";

const Payment = () => {
  const [selectedPlan, setSelectedPlan] = useState("standard");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: "$9.99",
      features: [
        "Unlimited movies and TV shows",
        "Watch on 1 device at a time",
        "720p HD quality",
        "Download on 1 device",
      ],
    },
    {
      id: "standard",
      name: "Standard",
      price: "$15.49",
      popular: true,
      features: [
        "Unlimited movies and TV shows",
        "Watch on 2 devices at a time",
        "1080p Full HD quality",
        "Download on 2 devices",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      price: "$19.99",
      features: [
        "Unlimited movies and TV shows",
        "Watch on 4 devices at a time",
        "4K Ultra HD quality",
        "Download on 4 devices",
      ],
    },
  ];
  const handlePayment = (e) => {
    e.preventDefault();

    // Basic validation
    if (!cardNumber || !expiryDate || !cvv) {
      alert("Please fill in all payment details");
      return;
    }

    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const subscriptionData = {
        isPaid: true,
        plan: selectedPlan,
        subscriptionDate: new Date().toISOString(),
      };

      // Save to Redux first
      dispatch(setSubscription(subscriptionData));
      console.log("Payment successful! Subscription saved to Redux");

      // Try to save to Firestore (async, don't wait)
      if (user?.uid) {
        updateUserSubscription(user.uid, subscriptionData)
          .then(() => console.log("Subscription saved to Firestore"))
          .catch((error) => console.warn("Firestore unavailable:", error));
      }

      // Show success message
      setPaymentSuccess(true);
      setProcessing(false);

      // Navigate after showing success
      setTimeout(() => {
        console.log("Navigating to /browse");
        navigate("/browse");
      }, 1500);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="pt-20 md:pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Choose Your Plan
            </h1>
            <p className="text-gray-400 text-lg">
              Watch anywhere. Cancel anytime.
            </p>
          </div>

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative cursor-pointer rounded-lg p-6 transition-all ${
                  selectedPlan === plan.id
                    ? "bg-red-600 border-2 border-red-500 scale-105"
                    : "bg-zinc-900 border-2 border-zinc-700 hover:border-zinc-500"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-4xl font-bold text-white">{plan.price}</p>
                  <p className="text-gray-400 text-sm">per month</p>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-white">
                      <Check className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Payment Form */}
          <div className="max-w-md mx-auto bg-zinc-900 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Payment Details
            </h2>

            {paymentSuccess && (
              <div className="mb-6 bg-green-600 text-white px-4 py-3 rounded-lg flex items-center justify-center space-x-2">
                <Check className="w-5 h-5" />
                <span className="font-semibold">
                  Payment Successful! Redirecting...
                </span>
              </div>
            )}

            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  required
                  disabled={processing || paymentSuccess}
                  className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    placeholder="MM/YY"
                    maxLength="5"
                    required
                    disabled={processing || paymentSuccess}
                    className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    maxLength="3"
                    required
                    disabled={processing || paymentSuccess}
                    className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={processing || paymentSuccess}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition"
              >
                {paymentSuccess
                  ? "Payment Complete!"
                  : processing
                  ? "Processing..."
                  : `Pay ${
                      plans.find((p) => p.id === selectedPlan)?.price
                    }/month`}
              </button>
              <p className="text-xs text-gray-500 text-center mt-4">
                This is a demo payment. No actual charges will be made.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
