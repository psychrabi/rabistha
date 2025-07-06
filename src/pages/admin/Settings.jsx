
import api from '@/utils/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';


const settingsSchema = z.object({
  siteName: z.string().min(1, 'Site name is required'),
  siteDescription: z.string().min(1, 'Site description is required'),
  contactEmail: z.string().email('Valid email is required'),
  contactPhone: z.string().min(1, 'Phone number is required'),
  contactAddress: z.string().min(1, 'Address is required'),
  smtpHost: z.string().min(1, 'SMTP host is required'),
  smtpPort: z.string().min(1, 'SMTP port is required'),
  smtpUser: z.string().email('Valid SMTP user email is required'),
  smtpPass: z.string().min(1, 'SMTP password is required'),
  currency: z.string().min(1, 'Currency is required'),
  taxRate: z.number().min(0, 'Tax rate must be positive'),
});

export default function AdminSettings() {
  const [, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general')

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(settingsSchema),
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await api.getSettings();
      setSettings(data);
      reset(data);
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      await api.request('/settings', {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      setSettings(data);
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <section className="w-full p-6 overflow-y-auto  h-full">
      <div className="mb-4">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Settings</h1>
            <p className="text-slate-600 dark:text-gray-300">Configure your ASTER license management system</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 justify-center">
        {/* Sidebar */}
        <div className="lg:w-[15%]">
          <ul className="menu bg-base-100 rounded-box w-full">
            <li>
              <button className={activeTab === 'general' ? 'active' : ''} onClick={() => setActiveTab('general')} >
                General Settings
              </button>
            </li>
            <li>
              <button className={activeTab === 'contact' ? 'active' : ''} onClick={() => setActiveTab('contact')} >
                Contact Information
              </button>
            </li>
            <li>
              <button className={activeTab === 'billing' ? 'active' : ''} onClick={() => setActiveTab('billing')} >
                Billing Settings
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-200">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                {/* General Settings Tab */}
                {activeTab === 'general' && (
                  <div className="space-y-6">
                    <h2 className="card-title">General Settings</h2>
                    <div>
                      <label className="block text-sm text-gray-500 dark:text-gray-300" htmlFor="siteName">Site Name</label>
                      <input placeholder="ASTER Multiseat"
                        {...register('siteName')}
                        type="text" className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                      {errors.siteName && (
                        <p className="mt-3 text-xs text-red-400 dark:text-red-600">{errors.siteName.message}</p>
                      )}
                    </div>
                    <div >
                      <label className="block text-sm text-gray-500 dark:text-gray-300">Site Description</label>
                      <textarea
                        className={`block mt-2 w-full  placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300 ${errors.siteDescription ? 'textarea-error' : ''}`}
                        placeholder="Transform one computer into multiple workstations"
                        {...register('siteDescription')}
                      ></textarea>
                      {errors.siteDescription && (
                        <p className="mt-3 text-xs text-red-400 dark:text-red-600">{errors.siteDescription.message}</p>

                      )}
                    </div>
                    <div className="form-control">
                      <label className="block text-sm text-gray-500 dark:text-gray-300">Logo Upload</label>
                      <input type="file" className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300" accept="image/*" />
                      <p className="mt-3 text-xs text-grey-400 dark:text-gray-600">Upload your company logo (PNG, JPG)</p>
                    </div>
                  </div>
                )}

                {/* Contact Information Tab */}
                {activeTab === 'contact' && (
                  <div className="space-y-6">

                    <h2 className="card-title">Contact Information</h2>
                    <div>
                      <label className="block text-sm text-gray-500 dark:text-gray-300" htmlFor="siteName">Contact Email</label>
                      <input placeholder="email@example.com"
                        {...register('contactEmail')}
                        type="email" className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                      {errors.contactEmail && (
                        <p className="mt-3 text-xs text-red-400 dark:text-red-600">{errors.contactEmail.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 dark:text-gray-300" htmlFor="siteName">Phone number</label>
                      <input placeholder="+1 (555) 123-4567"

                        {...register('contactPhone')}
                        type="tel" className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                      {errors.contactPhone && (
                        <p className="mt-3 text-xs text-red-400 dark:text-red-600">{errors.contactPhone.message}</p>
                      )}
                    </div>
                    <div >
                      <label className="block text-sm text-gray-500 dark:text-gray-300">Business Address</label>
                      <textarea
                        className={`block mt-2 w-full  placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300 ${errors.siteDescription ? 'textarea-error' : ''}`}
                        placeholder="Transform one computer into multiple workstations"
                        {...register('contactAddress')}
                      ></textarea>
                      {errors.contactAddress && (
                        <p className="mt-3 text-xs text-red-400 dark:text-red-600">{errors.contactAddress.message}</p>

                      )}
                    </div>
                  </div>
                )}             

                {/* Billing Settings Tab */}
                {activeTab === 'billing' && (
                  <div className="space-y-6">
                    <h2 className="card-title">Billing Settings</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div>
                        <label className="block text-sm text-gray-500 dark:text-gray-300" htmlFor="siteName">Tax Rate (%)</label>
                        <input
                          {...register('taxRate', { valueAsNumber: true })}
                           step="0.01"
                          placeholder="0.00"
                          type="number" className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                        {errors.taxRate && (
                          <p className="mt-3 text-xs text-red-400 dark:text-red-600">{errors.taxRate.message}</p>
                        )}
                      </div>
                         <div>
                        <label className="block text-sm text-gray-500 dark:text-gray-300" htmlFor="siteName">Default Currency</label>
                         <select
                          className={`select block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300 ${errors.currency ? 'select-error' : ''}`}
                          {...register('currency')}
                        >
                          <option value="">Select currency</option>
                          <option value="USD">USD - US Dollar</option>
                          <option value="EUR">EUR - Euro</option>
                          <option value="GBP">GBP - British Pound</option>
                          <option value="RUB">RUB - Russian Ruble</option>
                        </select>
                        {errors.currency && (
                          <p className="mt-3 text-xs text-red-400 dark:text-red-600">{errors.currency.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                <div className="card-actions justify-end pt-6">
                  <button type="submit" className={`btn btn-primary ${saving ? 'loading' : ''}`} disabled={saving} >
                    {saving ? 'Saving...' : 'Save Settings'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
