import { ArrowLeftRight, Blocks, CircleHelp, Users } from 'lucide-react';
import { useState } from 'react';
import Download from '../components/Download';
import Toast from '../components/Toast';
import useCartStore from '../store/cartStore';

function Purchase() {
  const [isPerpetual, setIsPerpetual] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const addItem = useCartStore(state => state.addItem);

  const featureIcons = {
    'users': <Users className="w-8 h-8" />,
    'Expandable': <Blocks className="w-8 h-8" />,
    'Transferrable': <ArrowLeftRight className="w-8 h-8" />,
    'Support': <CircleHelp className="w-8 h-8" />,
  };

  const getFeatureIcon = (feature) => {
    const key = Object.keys(featureIcons).find(k => feature.toLowerCase().includes(k.toLowerCase()));
    return key ? featureIcons[key] : 'fa-check';
  };

  const pricingData = {
    annual: [
      { id: 1, type: 'annual-2', name: 'Annual License - 2 Users', price: 14.99, discounted_price: 12.99, users: 2, features: ['2 users', 'Expandable (up to 12) *', 'Transferrable (4 Times)', 'Technical Support'], is_popular: true },
      { id: 2, type: 'annual-3', name: 'Annual License - 3 Users', price: 19.99, discounted_price: 17.99, users: 3, features: ['up to 3 users', 'Expandable (up to 12)  *', 'Transferrable (4 Times)', 'Technical Support'], is_popular: false },
      { id: 3, type: 'annual-6', name: 'Annual License - 6 Users', price: 36.99, discounted_price: 32.99, users: 6, features: ['up to 6 users', 'Expandable (up to 12)  *', 'Transferrable (4 Times)', 'Technical Support'], is_popular: false }
    ],
    perpetual: [
      { id: 4, type: 'pro-2', name: 'Perpetual License - 2 Users', price: 59.99, discounted_price: 53.99, users: 2, features: ['2 users', 'Expandable (up to 12) *', 'Transferrable (4 Times / year)', 'Technical Support'], is_popular: true },
      { id: 5, type: 'pro-3', name: 'Perpetual License - 3 Users', price: 74.99, discounted_price: 67.99, users: 3, features: ['up to 3 users', 'Expandable (up to 12) *', 'Transferrable (4 Times / year)', 'Technical Support'], is_popular: false },
      { id: 6, type: 'pro-6', name: 'Perpetual License - 6 Users', price: 142.99, discounted_price: 124.99, users: 6, features: ['up to 6 users', 'Expandable (up to 12) *', 'Transferrable (4 Times / year)', 'Technical Support'], is_popular: false }
    ]
  };

  const currentPricing = isPerpetual ? pricingData.perpetual : pricingData.annual;

  const handleAddToCart = (item) => {
    const itemDetails = {
      id: item.id,
      type: item.type,
      price: item.price
    }
    addItem(itemDetails);
    setToastMessage(`${item.name} added to cart`);
    setShowToast(true);
  };

  return (
    <section className="bg-white dark:bg-gray-900 min-h-[calc(100vh-8.6875rem)]">
      <div className="container px-6 py-4 mx-auto">

        <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
          Pricing
        </h1>
        <div className="flex mx-auto my-6">
          <span className="inline-block w-30 h-1 bg-blue-500 rounded-full"></span>
          <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
          <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
        </div>
                  <span className='text-2xl'>Whatever your status, our offers evolve according to your needs</span>

      </div>
      <div className="flex flex-col gap-8 items-center py-12">
        <div className="flex gap-2">
          <span>Annual</span>
          <input
            type="checkbox"
            className="toggle toggle-secondary"
            checked={isPerpetual}
            onChange={(e) => setIsPerpetual(e.target.checked)}
          />
          <span className="flex flex-col">Perpetual</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 items-end px-2 gap-8">
          {currentPricing.map((data) => (
            <div
              key={data.id}
              className={`flex flex-col gap-6 bg-base-200 text-gray-100 rounded-box p-8 w-90 ${data.is_popular ? 'border border-primary shadow' : ''}`}
            >
              {data.is_popular && (
                <div className="badge badge-primary self-center badge-lg">
                  Most popular
                </div>
              )}
              <div className="flex flex-col gap-4 text-center">
                <h2 className="text-xl capitalize">{data.type}</h2>
                <h1 className={`text-3xl font-bold ${data.discounted_price ? 'line-through' : ''}`}>${data.price}</h1>
                {data.discounted_price && (
                  <h1 className="text-5xl font-bold">${data.discounted_price}</h1>
                )}
                <span className="text-sm">
                  {(data.type === 'pro-2' || data.type === "annual-2") ? 'Share PC with 2 users' : `Share PC with up to ${data.users} users`}
                </span>
              </div>
              <div className="flex flex-col">
                {data.features.map((feature, i) => (
                  <div key={i} className="flex gap-4 py-3 items-center">
                    {getFeatureIcon(feature)}
                    {feature}
                  </div>
                ))}
              </div>
              <button type="button"
                onClick={() => handleAddToCart(data)}
                className={`btn ${data.is_popular ? 'btn-primary' : 'btn-neutral'}`}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <div>
          <p>
            * Multiple licenses can be activated in the same computer to get total combined number of workplaces
          </p>
        </div>
      </div>
      <Download />
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </section>
  );
}

export default Purchase;