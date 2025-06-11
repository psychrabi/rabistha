import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { testimonialsData } from '../data/testimonials'; // Assuming you have a testimonialsData.js file

export default function Testimonials() {
	const [current, setCurrent] = useState(0);
	const [slideDirection, setSlideDirection] = useState(''); // 'left' or 'right' for animation

	// Helper to get 3 visible testimonials, wrapping around
	const getVisibleTestimonials = () => {
		const visible = [];
		for (let i = 0; i < 3; i++) {
			visible.push((current + i) % testimonialsData.length);
		}
		return visible;
	};

	// Set highlight true for the current "main" testimonial (center one)
	const getHighlightArray = () => {
		const visible = getVisibleTestimonials();
		return visible.map((_idx, i) => i === 1); // Only the center one is highlighted
	};

	const handlePrev = () => {
		setSlideDirection('left');
		setTimeout(() => {
			setCurrent((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
			setSlideDirection('');
		}, 250);
	};

	const handleNext = () => {
		setSlideDirection('right');
		setTimeout(() => {
			setCurrent((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
			setSlideDirection('');
		}, 250);
	};

	const visibleIndexes = getVisibleTestimonials();
	const highlightArr = getHighlightArray();

	return (
		<section className="bg-white dark:bg-gray-900">
			<div className="container px-6 py-10 mx-auto">
				<div className="mt-6 md:flex md:items-center md:justify-between">
					<div>
						<h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
							What our clients are saying
						</h1>
						<div className="flex mx-auto mt-6">
							<span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
							<span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
							<span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
						</div>
					</div>
					<div className="flex justify-between mt-8 md:mt-0">
						<button type="button"
							title="left arrow"
							className="p-2 mx-3 text-gray-800 transition-colors duration-300 border rounded-full rtl:-scale-x-100 dark:text-gray-200 dark:hover:bg-gray-800 dark:border-gray-700 hover:bg-gray-100"
							onClick={handlePrev}
						>
							<ArrowLeft className="w-6 h-6" />
						</button>
						<button type="button"
							title="right arrow"
							className="p-2 text-gray-800 transition-colors duration-300 border rounded-full rtl:-scale-x-100 dark:text-gray-200 dark:hover:bg-gray-800 dark:border-gray-700 hover:bg-gray-100"
							onClick={handleNext}
						>
							<ArrowRight className="w-6 h-6" />
						</button>
					</div>
				</div>
				<div className={`grid grid-cols-1 gap-8 mt-8 xl:mt-12 lg:grid-cols-2 xl:grid-cols-3 w-full transition-transform duration-300 
				${slideDirection === 'left' ? '-translate-x-16 opacity-0' : slideDirection === 'right' ? 'translate-x-16 opacity-0' : 'translate-x-0 opacity-100'}`}>
					{visibleIndexes.map((idx, i) => {
						const t = testimonialsData[idx];
						const highlight = highlightArr[i];
						return (
							<div
								key={idx}
								className={`p-8 border rounded-lg dark:border-gray-700 transition-all duration-300 ${highlight
									? 'bg-blue-500 border-transparent dark:bg-blue-600 scale-110 shadow-lg z-10'
									: 'scale-100'
									}`}
								style={{ minHeight: 320 }}
							>
								<p className={`leading-loose ${highlight ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`} >
									{t.text}
								</p>
								<div className="flex items-center mt-8 -mx-2">
									<img className={`object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ${highlight ? 'ring-blue-200' : 'ring-gray-300 dark:ring-gray-700'}`} src={t.img} alt={t.name} />
									<div className="mx-2">
										<h1 className={`font-semibold ${highlight ? 'text-white' : 'text-gray-800 dark:text-white'}`} >
											{t.name}
										</h1>
										<span className={`text-sm ${highlight ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'}`}>
											{t.title}
										</span>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	)
}
