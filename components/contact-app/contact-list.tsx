import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaPenToSquare, FaTrash, FaUser } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/helper";
import Link from "next/link";
import { getContacts } from "@/actions/contact-app";
import { DeleteContactBtn } from "@/components/contact-app/buttons";

export const ContactList = async ({ query, currentPage }: { query: string; currentPage: number }) => {
  const contacts = await getContacts(query, currentPage);

  if (contacts.length === 0) {
    return <div className="text-xl italic text-center mt-8">contact not found</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {contacts
        ?.sort((a, b) => new Date(a?.createdAt).getTime() - new Date(b?.createdAt).getTime())
        .map((item) => (
          <Card key={item?.id} className="flex justify-center flex-col items-center">
            <CardHeader>
              <CardTitle>{item.phone}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1 items-center">
              <Avatar>
                <AvatarImage src={item.image} alt="avatar" className="object-center object-cover" />
                <AvatarFallback className="bg-sky-500">
                  <FaUser />
                </AvatarFallback>
              </Avatar>
              <CardDescription className="text-base capitalize">{item.name}</CardDescription>
              <CardDescription>{formatDate(item.createdAt.toString())}</CardDescription>
            </CardContent>
            <CardFooter className="flex gap-1">
              <Button size="sm" asChild>
                <Link href={`/contact-app/edit/${item.id}`}>
                  <FaPenToSquare />
                </Link>
              </Button>
              <DeleteContactBtn id={item.id} />
            </CardFooter>
          </Card>
        ))}
    </div>
  );
};
