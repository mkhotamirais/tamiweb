import { getContacts } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { FaPenToSquare, FaPhone, FaTrashCan, FaUser } from "react-icons/fa6";

export async function ContactList() {
  const data = await getContacts();
  return (
    <div className="grid grid-cols-2 gap-1 sm:grid-cols-4 mt-4 mb-16">
      {data
        ?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        ?.map((item) => (
          <Card className="" key={item.id}>
            <CardContent className="p-3 flex flex-col gap-3 items-center">
              <Image
                src="/images/—Pngtree—shopping cart convenient icon_4637407.png"
                // src={
                //   item?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                // }
                width={200}
                height={200}
                alt="contact image"
                priority
                className="w-28 h-28 object-center object-cover rounded-full shadow"
              />
              <div className="flex flex-col items-center">
                <h2>{item.name}</h2>
                <p>
                  <FaPhone className="inline-block mr-2" />
                  {item.phone}
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="rounded-full">
                  <FaPenToSquare />
                </Button>
                <Button variant="destructive" size="sm" className="rounded-full">
                  <FaTrashCan />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
