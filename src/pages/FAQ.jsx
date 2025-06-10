import Download from "../components/Download";
import { faqs } from "../data/faqs";

function FAQ() {
	return (
		<section className="bg-white dark:bg-gray-900 min-h-[calc(100vh-11.75rem)]">
			<div className="container px-6 py-10 mx-auto">
				<h1 className="text-2xl font-semibold text-gray-800 lg:text-3xl dark:text-white">Frequently Asked Questions</h1>
				<div class="flex mx-auto my-6">
					<span class="inline-block w-100 h-1 bg-blue-500 rounded-full"></span>
					<span class="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
					<span class="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
				</div>
				<div class="space-y-4">
					{faqs.map((faq, idx) => (
						<div key={idx} class="collapse collapse-plus bg-gray-100 rounded-lg dark:bg-gray-800">
							<input type="radio" name={`faqs`} />
							<div class="collapse-title font-semibold text-gray-700 dark:text-white">{faq.title}</div>
							<div class="collapse-content">
								<p>{faq.content}</p>
							</div>
						</div>
					))}
				</div>
			</div>
			<Download />
		</section>
	);
}
export default FAQ;