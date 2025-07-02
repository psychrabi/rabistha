import { downloads } from "../data/downloads";

export default function Download() {
  return (

    <section className="bg-white dark:bg-gray-900 min-h-[calc(100vh-8.6875rem)]">
      <div className="container px-6 py-4 mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
          ASTER <span className="text-blue-500">Downloads</span>
        </h1>
        <div className="flex mx-auto my-6">
          <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
          <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
          <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div>
            <h1 className='text-2xl'>Try ASTER for free</h1>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              If you have not yet decided to purchase our product or doubt its capabilities and compatibility with the available programs and equipment, we suggest you download ASTER and try it in the work right now.
            </p>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              The program will work without restrictions 14 days after which you will need payment and activation.
            </p>
            <p className="mt-3 text-gray-600 dark:text-gray-300"> ASTER v2.60.5 works with Windows 8 and above. For Windows 7 and Windows Vista use <a href="https://www.ibik.ru/download/Aster/v2_31/Setup_ASTER2311.exe">version 2.31.1</a></p>
          </div>
          <div>
            <h1 className='text-2xl'>Before installation, we recommend you to read</h1>
            <ul className="list-disc list-inside">
              <li className="mt-3 text-gray-600 dark:text-gray-300 text-xl">
                <a href="https://www.dokwiki.ibik.ru/en/v3/core/ugd/ugd_terms">
                  Licensing and Updates
                </a>
              </li>
              <li className="mt-3 text-gray-600 dark:text-gray-300 text-xl">
                <a href="https://www.dokwiki.ibik.ru/en/v2/core/ugd/ugd_eula">
                  End User License Agreement
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mb-10">
          <table className="table">
            <thead>
              <tr className="">
                <th>Program Version</th>
                <th>Supported OS</th>
                <th>Download</th>
                <th>Manual</th>
              </tr>
            </thead>
            <tbody>
              {downloads.map((item, idx) => (
                <tr key={idx}>
                  <td className="text-2xl">
                    <div className="font-semibold fond-wide">{item.name}</div>
                  </td>
                  <td>{item.os}</td>
                  <td className="space-x-2">
                    <a
                      href={item.downloadLink}
                      className="btn btn-primary"
                      download
                    >
                      Download {item.name}
                    </a>
                  </td>
                  <td className="space-x-2">
                    <a
                      href={item.manualLink}
                      className="btn btn-secondary"
                      download
                    >
                      User Manual
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 text-sm text-base-content/60">
          <p className="mt-3 text-gray-600 dark:text-gray-300 text-lg">
            Looking for older versions? Check out our <a href="/archived-downloads" className="link link-primary">program archive</a> page.
          </p>
        </div>
        <div className="mt-8 text-sm text-base-content/60">
          <p className="mt-3 text-gray-600 dark:text-gray-300 text-lg">
            If you have any questions about installation or activation, please contact our <a href="/contact" className="link link-primary">support service</a>.
          </p>
        </div>
      </div>
    </section>

  );
}