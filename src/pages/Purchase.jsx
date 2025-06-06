import { ArrowLeftRight, Blocks, CircleHelp, Users } from 'lucide-react';
import { useState } from 'react';
import useCartStore from '../store/cartStore';
import Cart from '../components/Cart';

function Purchase() {
  const [isPerpetual, setIsPerpetual] = useState(false);
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
    annual: {
      'Annual-2': { id: 'annual-2', name: 'Annual License - 2 Users', price: 14.99, users: 2, features: ['2 users', 'Expandable (up to 12) *', 'Transferrable (4 Times)', 'Technical Support'], is_popular: true },
      'Annual-3': { id: 'annual-3', name: 'Annual License - 3 Users', price: 19.99, users: 3, features: ['up to 3 users', 'Expandable (up to 12)  *', 'Transferrable (4 Times)', 'Technical Support'], is_popular: false },
      'Annual-6': { id: 'annual-6', name: 'Annual License - 6 Users', price: 36.99, users: 6, features: ['up to 6 users', 'Expandable (up to 12)  *', 'Transferrable (4 Times)', 'Technical Support'], is_popular: false }
    },
    perpetual: {
      'Pro-2': { id: 'pro-2', name: 'Perpetual License - 2 Users', price: 45.99, users: 2, features: ['2 users', 'Expandable (up to 12) *', 'Transferrable (4 Times / year)', 'Technical Support'], is_popular: true },
      'Pro-3': { id: 'pro-3', name: 'Perpetual License - 3 Users', price: 57.99, users: 3, features: ['up to 3 users', 'Expandable (up to 12) *', 'Transferrable (4 Times / year)', 'Technical Support'], is_popular: false },
      'Pro-6': { id: 'pro-6', name: 'Perpetual License - 6 Users', price: 109.99, users: 6, features: ['up to 6 users', 'Expandable (up to 12) *', 'Transferrable (4 Times / year)', 'Technical Support'], is_popular: false }
    }
  };

  const currentPricing = isPerpetual ? pricingData.perpetual : pricingData.annual;

  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="font-bold text-3xl">Pricing</h1>
        <span>Whatever your status, our offers evolve according to your needs</span>
      </div>

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
        {Object.entries(currentPricing).map(([plan, data]) => (
          <div
            key={plan}
            className={`flex flex-col gap-6 bg-base-200 rounded-box p-8 w-90 ${data.is_popular ? 'border border-primary shadow' : ''}`}
          >
            {data.is_popular && (
              <div className="badge badge-primary self-center badge-lg">
                Most popular
              </div>
            )}
            <div className="flex flex-col gap-4 text-center">
              <h2 className="text-xl">{plan}</h2>
              <h1 className="text-5xl font-bold">${data.price}</h1>
              <span className="text-sm">
                {(plan === 'Pro-2' || plan === "Annual-2") ? 'Share PC with 2 users' : `Share PC with up to ${data.users} users`}
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
            <button 
              onClick={() => addItem(data)}
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
  );
}

export default Purchase;