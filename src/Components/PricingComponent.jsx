export default function PricingComponent() {
    const plans = [
      {
        name: "Free Plan",
        price: "$0/month",
        description: "Basic features, limited email extractions.",
        features: [
          "✔️ 5 Job Filters per Day",
          "✔️ 10 Email Extractions",
          "✔️ Basic AI Resume Insights",
        ],
        buttonText: "Get Started",
        buttonColor: "bg-gray-500 hover:bg-gray-600",
      },
      {
        name: "Pro Plan",
        price: "$19/month",
        description: "Unlimited job filters, email outreach, and resume insights.",
        features: [
          "✔️ Unlimited Job Filters",
          "✔️ Unlimited Email Extractions",
          "✔️ AI Resume Optimization",
          "✔️ Automated Outreach",
        ],
        buttonText: "Upgrade to Pro",
        buttonColor: "bg-blue-600 hover:bg-blue-700",
        highlight: true, // Marking this as most popular
      },
      {
        name: "Enterprise Plan",
        price: "$49/month",
        description: "AI-powered recommendations & premium support.",
        features: [
          "✔️ Everything in Pro",
          "✔️ AI-Powered Job Suggestions",
          "✔️ Priority Support",
          "✔️ Dedicated Account Manager",
        ],
        buttonText: "Contact Sales",
        buttonColor: "bg-gray-900 hover:bg-gray-950",
      },
    ];
  
    return (
      <section className="py-16 bg-gray-100 md:py-44" id="pricing">
        <div className="max-w-6xl mx-auto px-6 text-center">
          {/* Section Title */}
          <h2 className="text-4xl font-bold text-gray-900">Pricing Plans</h2>
          <p className="text-lg text-gray-600 mt-2">
            Choose a plan that fits your job-seeking needs.
          </p>
  
          {/* Pricing Cards */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg shadow-md bg-white text-center ${
                  plan.highlight ? "border-2 border-blue-600" : ""
                }`}
              >
                <h3 className="text-2xl font-semibold text-gray-800">{plan.name}</h3>
                <p className="text-4xl font-bold mt-2">{plan.price}</p>
                <p className="text-gray-600 mt-2">{plan.description}</p>
  
                {/* Features List */}
                <ul className="mt-4 space-y-2 text-gray-700">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
  
                {/* Call-to-Action Button */}
                <button
                  className={`mt-6 px-6 py-3 text-white rounded-lg font-semibold ${plan.buttonColor}`}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  