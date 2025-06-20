import { DownloadCloud } from 'lucide-react'

export default function Download() {
	return (
		<section className="bg-white">
			<div className="container flex flex-col items-center px-4 py-12 mx-auto text-center">
				<h1 className="text-2xl font-bold tracking-tight text-gray-800 xl:text-3xl ">
					Try ASTER for free
				</h1>
				<p className="block max-w-4xl mt-6 text-gray-900 text-lg">
					The program will work without restrictions 14 days after which payment and activation will be required.
				</p>
				<div className="mt-6 mb-2 flex gap-3">
					<a href="https://www.ibik.ru/download/Aster/v2_60/Setup_ASTER2605.exe" className="cursor-pointer flex items-center text-xl  px-8 py-4 font-medium tracking-wide text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
						<DownloadCloud />
						<span className="mx-1">Download ASTER v2.60.5</span>
					</a>
					<a href="https://www.ibik.ru/download/Aster/v2_31/Setup_ASTER2311.exe" className="cursor-pointer flex items-center text-xl px-8 py-4 font-medium tracking-wide text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
						<DownloadCloud />
						<span className="mx-1">Download ASTER v2.31.1</span>
					</a>
				</div>

				<p className="block max-w-4xl mt-2 text-gray-900  text-lg" >
					* ASTER v2.60.5 works with Windows 8 and higher. <br />
					** For Windows 7 use ASTER v2.31.1.
				</p>
			</div>
		</section>
	)
}
