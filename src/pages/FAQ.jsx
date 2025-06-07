import Download from "../components/Download";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { faqs } from "../data/faqs";

function FAQ() {
	const [openIndex, setOpenIndex] = useState(null);

	const toggle = (idx) => {
		setOpenIndex(openIndex === idx ? null : idx);
	};

	return (
		<section className="bg-white dark:bg-gray-900 min-h-[calc(100vh-11.75rem)]">
			<div className="container px-6 py-10 mx-auto">
			  <h1 className="text-2xl font-semibold text-gray-800 lg:text-3xl dark:text-white">FAQ's</h1>
				<hr className="my-6 border-gray-200 dark:border-gray-700" />

				<div className="space-y-4">
					{faqs.map((faq, idx) => (
						<div key={idx} className="border-b border-gray-200 dark:border-gray-700 pb-4" >
							<button className="flex items-center w-full text-left focus:outline-none" onClick={() => toggle(idx)} >
								{openIndex === idx ? (
									<Minus className="flex-shrink-0 w-6 h-6 text-blue-500" />
								) : (
									<Plus className="flex-shrink-0 w-6 h-6 text-blue-500" />
								)}
								<h2 className="mx-4 text-xl text-gray-700 dark:text-white">{faq.question}</h2>
							</button>
							{openIndex === idx && (
								<div className="flex mt-4 md:mx-10">
									<span className="border-l-2 border-blue-500 mr-4"></span>
									<div className="prose max-w-none mb-4">
										<div className="whitespace-pre-wrap">{faq.answer}</div>
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
			<Download />
		</section>
	);
}
export default FAQ;