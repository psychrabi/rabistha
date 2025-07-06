import { archivedDownloads } from "../data/downloads";
export default function ArchivedDownloads() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-10 mx-auto">
        <div className="my-6 md:flex md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
              Archive <span className="text-blue-500">of ASTER Program</span>
            </h1>
            <div className="flex mx-auto my-6">
              <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
              <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
              <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
            </div>
            <p className="mb-6 text-base-content/70">
              Here you can find older versions of the ASTER software.
            </p>
          </div>
        </div>
          <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mb-10">
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
              {archivedDownloads.map((item, idx) => (
                <tr key={idx} className="hover:bg-base-300">
                  <td  className="text-2xl">
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


      </div>
    </section>
  );
}