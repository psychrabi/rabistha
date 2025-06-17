import { useEffect, useState } from "react";
import Download from "../components/Download";
import Pagination from "../components/Pagination";
import { useAdminStore } from "../store/adminStore";

function FAQ() {
	const { fetchFAQs, faqs } = useAdminStore()
	const [currentPage, setCurrentPage] = useState(1);
	const [faqsPerPage] = useState(10);
	const indexOfLastFAQ = currentPage * faqsPerPage;
	const indexOfFirstFAQ = indexOfLastFAQ - faqsPerPage;
	const currentFAQs = faqs.slice(indexOfFirstFAQ, indexOfLastFAQ);

	useEffect(() => {
		fetchFAQs()
	}, []);
	return (
		<section className="bg-white dark:bg-gray-900 min-h-[calc(100vh-11.75rem)]">
			<div className="container px-6 py-4 mx-auto">
				<h1 className="text-2xl font-semibold text-gray-800 lg:text-3xl dark:text-white">Frequently Asked Questions</h1>
				<div className="flex mx-auto my-6">
					<span className="inline-block w-100 h-1 bg-blue-500 rounded-full"></span>
					<span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
					<span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
				</div>
				<div className="space-y-2">
					{currentFAQs.map((faq, idx) => (
						<div key={idx} className="collapse collapse-plus bg-gray-100 rounded-lg dark:bg-gray-800">
							<input type="radio" name={`faqs`} />
							<div className="collapse-title font-semibold text-gray-700 dark:text-white">{faq.title}</div>
							<div className="collapse-content">
								<div
									className="prose max-w-none text-white"
									dangerouslySetInnerHTML={{ __html: faq?.content }}
								/>
							</div>
						</div>
					))}
				</div>

			</div>
			<Pagination perPage={faqsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} total={faqs.length} />
			<Download />
		</section>
	);
}
export default FAQ;