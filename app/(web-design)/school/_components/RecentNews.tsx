import Link from "next/link";
import moment from "moment";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";

const menu = [
  {
    href: "#",
    title: "Bluefield Highschool Meraih Juara Olimpiade Sains Nasional",
    date: "2024-05-20T15:30:00Z",
    content:
      "Tim Olimpiade Sains Bluefield Highschool berhasil meraih juara pertama dalam kompetisi Olimpiade Sains Nasional 2024. Para siswa menunjukkan prestasi luar biasa di bidang fisika, kimia, dan biologi, membawa pulang medali emas dan mengharumkan nama sekolah.",
    image: "/school-1/pex-recent-news-1.jpg",
    writer: "ahmad",
  },
  {
    href: "#",
    title: "Pameran Seni Tahunan Bluefield Highschool Menampilkan Karya Siswa Berbakat",
    date: "2024-03-20T15:30:00Z",
    content:
      "Bluefield Highschool baru saja mengadakan pameran seni tahunan yang menampilkan berbagai karya seni dari para siswa berbakat. Acara ini dihadiri oleh orang tua, guru, dan masyarakat sekitar, yang sangat mengapresiasi kreativitas dan bakat seni para siswa.",
    image: "/school-1/pex-recent-news-2.jpg",
    writer: "abdul",
  },
  {
    href: "#",
    title: "Bluefield Highschool Adakan Webinar Karir dengan Alumni Sukses",
    date: "2024-02-20T15:30:00Z",
    content:
      "Dalam rangka membantu siswa mempersiapkan masa depan mereka, Bluefield Highschool mengadakan webinar oleh beberapa alumni sukses. Mereka berbagi pengalaman dan memberikan tips berharga mengenai dunia kerja dan pilihan karir setelah lulus dari sekolah.",
    image: "/school-1/pex-recent-news-3.jpg",
    writer: "siti",
  },
];

export default function RecentNews() {
  return (
    <section className="min-h-[40vh] lg:min-h-[70vh] px-3 sm:px-12 lg:px-24 py-12 bg-gray-50 dark:bg-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-merriweather text-2xl font-semibold">Recent News</h2>
        <Link
          href="/web-design/school/school-1/news-and-events"
          className="text-blue-500 flex items-center gap-3 hover:text-blue-700 transition-all"
        >
          See all
          <FaArrowRight />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full h-full">
        {menu.map((item, index) => (
          <div key={index} className="shadow bg-white dark:bg-gray-950 rounded-lg overflow-hidden flex flex-col">
            <Image
              src={item.image}
              width={250}
              height={250}
              alt={item.title}
              quality={80}
              className="w-full h-48 sm:h-64 object-cover object-center"
            />
            <div className="p-4 flex flex-col flex-grow">
              <p className="text-xs text-gray-500 mb-1">
                By {item.writer} - {moment(item.date).fromNow()}
              </p>
              <h3 className="text-xl font-semibold leading-7 flex-grow font-merriweather mb-3">{item.title}</h3>
              <p className="text-sm leading-5">{item.content}</p>
              <button
                type="button"
                className="self-start bg-blue-500 hover:bg-blue-700 transition-all text-white rounded-full p-2 px-4 mt-2"
              >
                visit
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
