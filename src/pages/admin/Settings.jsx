
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
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-600">Configure your ASTER license management system</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64">
          <div className="menu bg-base-200 rounded-box">
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
              <button className={activeTab === 'email' ? 'active' : ''} onClick={() => setActiveTab('email')} >
                Email Configuration
              </button>
            </li>
            <li>
              <button className={activeTab === 'billing' ? 'active' : ''} onClick={() => setActiveTab('billing')} >
                Billing Settings
              </button>
            </li>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                {/* General Settings Tab */}
                {activeTab === 'general' && (
                  <div className="space-y-6">
                    <h2 className="card-title">General Settings</h2>
                    <div>
                      <label class="text-gray-700 dark:text-gray-200" for="siteName">Site Name</label>
                      <input placeholder="ASTER Multiseat"
                        {...register('siteName')}
                        type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                      {errors.siteName && (
                        <label className="label">
                          <span className="label-text-alt text-error">{errors.siteName.message}</span>
                        </label>
                      )}
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Site Description</span>
                      </label>
                      <textarea
                        className={`textarea textarea-bordered ${errors.siteDescription ? 'textarea-error' : ''}`}
                        placeholder="Transform one computer into multiple workstations"
                        {...register('siteDescription')}
                      ></textarea>
                      {errors.siteDescription && (
                        <label className="label">
                          <span className="label-text-alt text-error">{errors.siteDescription.message}</span>
                        </label>
                      )}
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Logo Upload</span>
                      </label>
                      <input type="file" className="file-input file-input-bordered" accept="image/*" />
                      <label className="label">
                        <span className="label-text-alt">Upload your company logo (PNG, JPG)</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Contact Information Tab */}
                {activeTab === 'contact' && (
                  <div className="space-y-6">
                    <h2 className="card-title">Contact Information</h2>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Contact Email</span>
                      </label>
                      <input
                        type="email"
                        placeholder="contact@yourcompany.com"
                        className={`input input-bordered ${errors.contactEmail ? 'input-error' : ''}`}
                        {...register('contactEmail')}
                      />
                      {errors.contactEmail && (
                        <label className="label">
                          <span className="label-text-alt text-error">{errors.contactEmail.message}</span>
                        </label>
                      )}
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Phone Number</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className={`input input-bordered ${errors.contactPhone ? 'input-error' : ''}`}
                        {...register('contactPhone')}
                      />
                      {errors.contactPhone && (
                        <label className="label">
                          <span className="label-text-alt text-error">{errors.contactPhone.message}</span>
                        </label>
                      )}
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Business Address</span>
                      </label>
                      <textarea
                        className={`textarea textarea-bordered ${errors.contactAddress ? 'textarea-error' : ''}`}
                        placeholder="123 Business St, City, State 12345"
                        {...register('contactAddress')}
                      ></textarea>
                      {errors.contactAddress && (
                        <label className="label">
                          <span className="label-text-alt text-error">{errors.contactAddress.message}</span>
                        </label>
                      )}
                    </div>
                  </div>
                )}

                {/* Email Configuration Tab */}
                {activeTab === 'email' && (
                  <div className="space-y-6">
                    <h2 className="card-title">Email Configuration</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">SMTP Host</span>
                        </label>
                        <input
                          type="text"
                          placeholder="smtp.gmail.com"
                          className={`input input-bordered ${errors.smtpHost ? 'input-error' : ''}`}
                          {...register('smtpHost')}
                        />
                        {errors.smtpHost && (
                          <label className="label">
                            <span className="label-text-alt text-error">{errors.smtpHost.message}</span>
                          </label>
                        )}
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">SMTP Port</span>
                        </label>
                        <input
                          type="text"
                          placeholder="587"
                          className={`input input-bordered ${errors.smtpPort ? 'input-error' : ''}`}
                          {...register('smtpPort')}
                        />
                        {errors.smtpPort && (
                          <label className="label">
                            <span className="label-text-alt text-error">{errors.smtpPort.message}</span>
                          </label>
                        )}
                      </div>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">SMTP Username</span>
                      </label>
                      <input
                        type="email"
                        placeholder="your-email@gmail.com"
                        className={`input input-bordered ${errors.smtpUser ? 'input-error' : ''}`}
                        {...register('smtpUser')}
                      />
                      {errors.smtpUser && (
                        <label className="label">
                          <span className="label-text-alt text-error">{errors.smtpUser.message}</span>
                        </label>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">SMTP Password</span>
                      </label>
                      <input
                        type="password"
                        placeholder="Your app password"
                        className={`input input-bordered ${errors.smtpPass ? 'input-error' : ''}`}
                        {...register('smtpPass')}
                      />
                      {errors.smtpPass && (
                        <label className="label">
                          <span className="label-text-alt text-error">{errors.smtpPass.message}</span>
                        </label>
                      )}
                    </div>

                    <div className="alert alert-info">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>For Gmail, use an App Password instead of your regular password.</span>
                    </div>
                  </div>
                )}

                {/* Billing Settings Tab */}
                {activeTab === 'billing' && (
                  <div className="space-y-6">
                    <h2 className="card-title">Billing Settings</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Default Currency</span>
                        </label>
                        <select
                          className={`select select-bordered ${errors.currency ? 'select-error' : ''}`}
                          {...register('currency')}
                        >
                          <option value="">Select currency</option>
                          <option value="USD">USD - US Dollar</option>
                          <option value="EUR">EUR - Euro</option>
                          <option value="GBP">GBP - British Pound</option>
                          <option value="RUB">RUB - Russian Ruble</option>
                        </select>
                        {errors.currency && (
                          <label className="label">
                            <span className="label-text-alt text-error">{errors.currency.message}</span>
                          </label>
                        )}
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Tax Rate (%)</span>
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          className={`input input-bordered ${errors.taxRate ? 'input-error' : ''}`}
                          {...register('taxRate', { valueAsNumber: true })}
                        />
                        {errors.taxRate && (
                          <label className="label">
                            <span className="label-text-alt text-error">{errors.taxRate.message}</span>
                          </label>
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
    </div>
  );
}
