import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

const menu = [
  {
    judul: "Bluefield Science Fair",
    tanggal: "20 Agustus 2024",
    waktu: "09:00 - 15:00",
    lokasi: "Aula Bluefield Highschool",
    deskripsi:
      "Acara tahunan yang menampilkan proyek-proyek sains dari siswa-siswa Bluefield. Terdapat berbagai eksperimen menarik dan demonstrasi.",
  },
  {
    judul: "Seminar Pendidikan Nasional",
    tanggal: "15 September 2024",
    waktu: "10:00 - 12:00",
    lokasi: "Ruang Serba Guna Bluefield Highschool",
    deskripsi:
      "Seminar yang menghadirkan pembicara dari berbagai universitas terkemuka untuk membahas tren pendidikan terbaru.",
  },
  {
    judul: "Kompetisi Basket Antar Sekolah",
    tanggal: "5 Oktober 2024",
    waktu: "08:00 - 17:00",
    lokasi: "Lapangan Basket Bluefield Highschool",
    deskripsi: "Kompetisi basket tahunan yang diikuti oleh sekolah-sekolah dari berbagai daerah.",
  },
];

export default function UpcommingEvents() {
  return (
    <section className="min-h-[40vh] px-3 sm:px-12 lg:px-24 py-12 bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-merriweather text-2xl font-semibold">Upcomming Events</h2>
        <Link
          href="/web-design/school/school-1/news-and-events"
          className="text-blue-500 flex items-center gap-3 hover:text-blue-700 transition-all min-w-max"
        >
          See all
          <FaArrowRight />
        </Link>
      </div>{" "}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full h-full">
        {menu.map((item, index) => (
          <div key={index} className="bg-gray-50 p-4 shadow dark:bg-gray-950 flex flex-col h-full gap-2">
            <div>
              <p className="text-2xl">{item.tanggal}</p>
              <p className="text-blue-500 font-semibold">{item.waktu}</p>
              <p className="text-blue-700 font-semibold">@{item.lokasi}</p>
            </div>
            <h3 className="font-merriweather font-bold text-lg">{item.judul}</h3>
            <p className="text-sm text-gray-600">{item.deskripsi}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
