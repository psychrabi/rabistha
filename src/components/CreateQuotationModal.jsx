import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useAdminStore } from '../store/adminStore';


const quoteSchema = z.object({
	userId: z.number().min(1, 'Customer is required'),
	items: z.array(z.object({
		description: z.string().min(1, 'Description is required'),
		quantity: z.number().min(1, 'Quantity must be at least 1'),
		price: z.number().min(0, 'Price must be positive'),
	})).min(1, 'At least one item is required'),
	discount: z.number().min(0).default(0),
	discountType: z.enum(['amount', 'percent']).default('amount'),
	notes: z.string().optional(),
	message: z.string().optional(),
	subTotal: z.number().optional(),
	taxable: z.number().optional(),
	tax: z.number().optional(),
	total: z.number().optional(),
	validUntil: z.string().min(1, 'Valid until date is required'),
});

function formatDateForInput(dateStr) {
	if (!dateStr) return '';
	const d = new Date(dateStr);
	// Adjust for timezone offset so the date is correct in local time
	const tzOffset = d.getTimezoneOffset() * 60000;
	return new Date(d - tzOffset).toISOString().slice(0, 10);
}


// Helper to convert number to words (USD)
function numberToWordsUSD(amount) {
	// Simple version, use Intl.NumberFormat for currency, and a basic number-to-words for dollars/cents
	const ones = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
	const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
	function numToWords(n) {
		if (n < 20) return ones[n];
		if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? "-" + ones[n % 10] : "");
		if (n < 1000) return ones[Math.floor(n / 100)] + " hundred" + (n % 100 ? " " + numToWords(n % 100) : "");
		if (n < 1000000) return numToWords(Math.floor(n / 1000)) + " thousand" + (n % 1000 ? " " + numToWords(n % 1000) : "");
		return n.toString();
	}
	const [dollars, cents] = amount.toFixed(2).split('.').map(Number);
	let words = '';
	if (dollars > 0) words += numToWords(dollars) + (dollars === 1 ? ' dollar' : ' dollars');
	if (cents > 0) words += (words ? ' and ' : '') + numToWords(cents) + (cents === 1 ? ' cent' : ' cents');
	if (!words) words = 'zero dollars';
	return words.charAt(0).toUpperCase() + words.slice(1);
}

export default function CreateQuotationModal({ quote, onClose }) {
	const dialogRef = useRef(null);
	const { users, token } = useAdminStore()
	const [lastAutoNote, setLastAutoNote] = useState('');
	const navigate = useNavigate()

	const { register, handleSubmit, reset, watch, control, setValue, getValues, formState: { errors } } = useForm({
		resolver: zodResolver(quoteSchema),
		defaultValues: quote
			? {
				...quote,
				validUntil: formatDateForInput(quote.validUntil),

				// Ensure items are numbers for quantity/price
				items: quote.items?.map(item => ({
					...item,
					quantity: Number(item.quantity),
					price: Number(item.price),
				})) || [],
			}
			: {},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'items',
	});

	const items = watch('items');
	const discountValue = Number(watch('discount')) || 0;

	const notes = watch('notes');

	const itemArray = Array.isArray(items)
		? items.filter(
			(item) => typeof item === 'object' && item && 'description' in item && 'quantity' in item && 'price' in item
		)
		: [];

	const subTotal = useMemo(() => {
		return itemArray.reduce((sum, item) => sum + ((Number(item.quantity) || 0) * (Number(item.price) || 0)), 0);
	}, [itemArray]);

	const discount = useMemo(() => {
		const discountType = getValues('discountType')
		if (discountType === 'percent') {
			return +(subTotal * (discountValue / 100)).toFixed(2);
		}
		return discountValue;
	}, [discountValue, subTotal]);

	const taxable = Math.max(subTotal - discount, 0);
	const tax = +(taxable * 0.13).toFixed(2);
	const total = +(taxable + tax).toFixed(2);

	const onSubmit = async (data) => {

		const method = quote && quote.id ? 'PUT' : 'POST';
		const url = quote && quote.id
			? `http://localhost:4000/api/admin/quotes/${quote.id}`
			: 'http://localhost:4000/api/admin/quotes';


		// Patch calculated fields before sending
		const patchedData = {
			...data,
			userId: Number(quote.userId),
			subTotal,
			taxable,
			tax,
			total,
			price: total,
			validUntil: new Date(data.validUntil).toISOString(),
		};
		try {
			const quote = await fetch(url, {
				method,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify(patchedData),
			});
			reset({ quote });

		} catch (error) {
			console.error('Failed to create quote:', error);
		} finally {
			window.location.reload();
		}
	};

	useEffect(() => {
		if (dialogRef.current) {
			dialogRef.current.showModal();
		}
		const totalText = `Total Payable: ${numberToWordsUSD(total)}`;
		if (!total || notes === lastAutoNote) {
			setLastAutoNote(totalText);
			setValue('notes', totalText);
		}
	}, [total]);
	return (
		<dialog ref={dialogRef} id="createQuotationModal" className="modal">
			<div className="modal-box w-11/12 max-w-5xl">
				{/* Display all errors */}
				{Object.keys(errors).length > 0 && (
					<ul>
						{Object.values(errors).map((error, index) => (
							<li key={index}>{error.message}</li>
						))}
					</ul>
				)}
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="text-gray-700 dark:text-gray-200">Customer's Name</label>
							<select
								className={`select select-bordered ${errors.userId ? 'select-error' : ''} mt-2 block w-full px-4 py-2  text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring`}
								{...register('userId', { required: true, valueAsNumber: true })}
							>
								<option value="">Select customer</option>
								{users.map((user) => (
									<option key={user.id} value={user.id}>
										{user.name} ({user.email})
									</option>
								))}
							</select>
							{errors.userId && (
								<label className="label">
									<span className="label-text-alt text-error">{errors.userId.message}</span>
								</label>
							)}
						</div>
						<div >
							<label className="text-gray-700 dark:text-gray-200">Valid Until</label>
							<input
								type="date"
								className={`input input-bordered ${errors.validUntil ? 'input-error' : ''} mt-2 block w-full px-4 py-2  text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring`}
								{...register('validUntil')}
							/>
							{errors.validUntil && (
								<label className="label">
									<span className="label-text-alt text-error">{errors.validUntil.message}</span>
								</label>
							)}
						</div>
					</div>
					{/* Items Section */}
					<div className="divider">Quote Items</div>
					<div className="space-y-4">
						<div className="grid grid-cols-12 gap-4 font-semibold">
							<div className="col-span-6">Description</div>
							<div className="col-span-2">Quantity</div>
							<div className="col-span-2">Price</div>
							<div className="col-span-2">Total</div>
						</div>
						{fields.map((item, idx) => (
							<div className="grid grid-cols-12 gap-4" key={item.id}>
								<div className="col-span-6">
									<input
										type="text"
										placeholder="Product description"
										className="block w-full px-4 py-2  text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
										{...register(`items.${idx}.description`)}
									/>
								</div>
								<div className="col-span-2">
									<input
										type="number"
										className="block w-full px-4 py-2  text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
										{...register(`items.${idx}.quantity`, { valueAsNumber: true })}
									/>
								</div>
								<div className="col-span-2">
									<input
										type="number"
										step="0.01"
										className="block w-full px-4 py-2  text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
										{...register(`items.${idx}.price`, { valueAsNumber: true })}
									/>
								</div>
								<div className="col-span-1 flex items-center">
									<span className="text-lg font-semibold">
										${((Number(watch(`items.${idx}.quantity`)) || 0) * (Number(watch(`items.${idx}.price`)) || 0)).toFixed(2)}
									</span>
								</div>
								<div className="col-span-1 flex items-center">
									<button type="button" className="btn btn-error btn-xs ml-2" onClick={() => remove(idx)}>
										Remove
									</button>
								</div>
							</div>
						))}
						<div>
							<button type="button" className="btn btn-outline btn-primary btn-sm" onClick={() => append({ description: '', quantity: 1, price: 0 })}>
								+ Add Item
							</button>
						</div>
						<div className="grid grid-cols-12 gap-4">
							<div className="col-span-8"></div>
							<div className="col-span-2 text-right flex items-center justify-end">Sub Total</div>
							<div className="col-span-2 flex items-center">
								<span className="font-semibold">${subTotal.toFixed(2)}</span>
							</div>
						</div>
						<div className="grid grid-cols-12 gap-4">
							<div className="col-span-8"></div>
							<div className="col-span-2 text-right flex items-center justify-end">Discount</div>
							<div className="col-span-1 flex items-center gap-2">
								<input
									type="number"
									placeholder="Discount"
									className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
									{...register('discount', { valueAsNumber: true })}
								/>
							</div>
							<div className="col-span-1 flex items-center gap-2">
								<select
									className="select block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
									{...register('discountType')}
								>
									<option value="amount">$</option>
									<option value="percent">%</option>
								</select>
							</div>
						</div>
						{/* Discount summary row */}
						{discount > 0 && (
							<div className="grid grid-cols-12 gap-4">
								<div className="col-span-8"></div>
								<div className="col-span-2 text-right flex items-center justify-end">Discount Value</div>
								<div className="col-span-2 flex items-center">
									<span className="font-semibold">-${discount.toFixed(2)}</span>
								</div>
							</div>
						)}
						<div className="grid grid-cols-12 gap-4">
							<div className="col-span-8"></div>
							<div className="col-span-2 text-right flex items-center justify-end">Taxable</div>
							<div className="col-span-2 flex items-center">
								<span className="font-semibold">${taxable.toFixed(2)}</span>
							</div>
						</div>
						<div className="grid grid-cols-12 gap-4">
							<div className="col-span-8"></div>
							<div className="col-span-2 text-right flex items-center justify-end">Tax (13%)</div>
							<div className="col-span-2 flex items-center">
								<span className="font-semibold">${tax.toFixed(2)}</span>
							</div>
						</div>
						<div className="grid grid-cols-12 gap-4">
							<div className="col-span-8"></div>
							<div className="col-span-2 text-right flex items-center justify-end">Total</div>
							<div className="col-span-2 flex items-center">
								<span className="font-bold text-lg">${total.toFixed(2)}</span>
							</div>
						</div>
					</div>
					<div className="divider"></div>
					<div className="grid grid-cols-2 gap-4">
						<div >
							<label className="label">Notes (Optional)</label>
							<textarea
								className="mt-2 block w-full px-4 py-2  text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
								placeholder="Additional notes or terms"
								{...register('notes')}
							></textarea>
						</div>
						<div>
							<label className="label">Message (Optional)</label>
							<textarea
								className="mt-2 block w-full px-4 py-2  text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
								placeholder="Messages to the customer"
								{...register('message')}
							></textarea>
						</div>
					</div>

					<div className="card-actions justify-end">
						<button type="submit" className="btn btn-primary">
							{quote ? 'Update' : 'Create'} Quotation
						</button>
						<button className="btn btn-secondary" onClick={onClose}>Close</button>
					</div>
				</form>
			</div>
		</dialog>
	)
}
