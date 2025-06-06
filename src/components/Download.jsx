import { DownloadCloud } from 'lucide-react'
import React from 'react'

export default function Download() {
	return (
		<section class="bg-white dark:bg-gray-900">
			<div class="container flex flex-col items-center px-4 py-12 mx-auto text-center">
				<h1 class="text-2xl font-bold tracking-tight text-gray-800 xl:text-3xl dark:text-white">
					Try ASTER for free
				</h1>

				<p class="block max-w-4xl mt-4 text-gray-500 dark:text-gray-300 text-lg" >
					The program will work without restrictions 14 days after which payment and activation will be required.
				</p>
				<p>
					ASTER v2.60.5 works with Windows 8 and higher. Use for Windows 7 and Windows Vista version 2.31.1
				</p>
				<div class="mt-6 flex gap-3">
					<button class="flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
						<DownloadCloud />
						<span class="mx-1">Download ASTER v2.60.5</span>
					</button>
					<button class="flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
						<DownloadCloud />
						<span class="mx-1">Download ASTER v2.31.1</span>
					</button>
				</div>
			</div>
		</section>
	)
}
