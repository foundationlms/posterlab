import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Share2, FileDown, BrainCircuit, CreditCard, ChevronRight, Check, Beaker } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Layout className="h-6 w-6 text-indigo-600" />,
      title: "Professional Templates",
      description: "Create stunning academic posters with our research-focused templates"
    },
    {
      icon: <BrainCircuit className="h-6 w-6 text-indigo-600" />,
      title: "AI Co-pilot",
      description: "Get intelligent suggestions and content optimization with our Pro plan"
    },
    {
      icon: <Share2 className="h-6 w-6 text-indigo-600" />,
      title: "Easy Sharing",
      description: "Share your posters with colleagues and download in multiple formats"
    },
    {
      icon: <FileDown className="h-6 w-6 text-indigo-600" />,
      title: "High-Resolution Exports",
      description: "Export publication-ready posters in PDF and PNG formats"
    }
  ];

  const plans = [
    {
      name: "Free",
      price: "0",
      description: "Perfect for trying out PosterLab",
      features: [
        "1 poster",
        "Basic templates",
        "Standard export formats",
        "Community support"
      ]
    },
    {
      name: "Standard",
      price: "9.99",
      description: "Great for researchers and students",
      features: [
        "Up to 100 posters",
        "All professional templates",
        "High-resolution exports",
        "Priority support",
        "No watermark"
      ],
      popular: true
    },
    {
      name: "Pro",
      price: "16.99",
      description: "Best for power users",
      features: [
        "Everything in Standard",
        "AI co-pilot assistance",
        "Advanced customization",
        "Premium support",
        "Early access to features"
      ]
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 bg-white">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Create Research Posters</span>
                  <span className="block text-indigo-600">in Minutes, Not Hours</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  PosterLab helps researchers create professional academic posters with AI-powered assistance. Start free, no credit card required.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button
                      onClick={() => navigate('/signin')}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                    >
                      Start Free
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button
                      onClick={() => navigate('/pricing')}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                    >
                      View Pricing
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
            alt="Scientific research visualization"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything You Need for Academic Posters
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Create professional research posters with our intuitive tools and AI assistance.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div key={index} className="relative">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-50">
                        {feature.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                      <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Pricing</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Start Free, Upgrade When Ready
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              No credit card required to start. 14-day money-back guarantee on all paid plans.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-lg shadow-lg divide-y divide-gray-200 bg-white ${
                  plan.popular ? 'ring-2 ring-indigo-600' : ''
                }`}
              >
                <div className="p-6">
                  {plan.popular && (
                    <span className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-indigo-100 text-indigo-600">
                      Most Popular
                    </span>
                  )}
                  <h2 className="mt-4 text-2xl font-bold text-gray-900">{plan.name}</h2>
                  <p className="mt-2 text-gray-500">{plan.description}</p>
                  <p className="mt-8">
                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-500">/year</span>
                  </p>
                  <button
                    onClick={() => navigate('/signin', { state: { plan: plan.name.toLowerCase() } })}
                    className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${
                      plan.popular
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                    }`}
                  >
                    {plan.price === "0" ? "Start Free" : "Get Started"}
                  </button>
                </div>
                <div className="px-6 pt-6 pb-8">
                  <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">
                    What's included
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex space-x-3">
                        <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                        <span className="text-base text-gray-500">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block">Create your first poster for free today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-200">
            No credit card required. Start with our free plan and upgrade when you're ready.
          </p>
          <button
            onClick={() => navigate('/signin')}
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
          >
            Get Started Free
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;