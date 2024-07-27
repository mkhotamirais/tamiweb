import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserById } from "@/data/authData";
import React from "react";
import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function UserDetail({ params: { id } }: { params: { id: string } }) {
  const user = await getUserById(id);
  if (!user) {
    return <div>user not found</div>;
  }

  return (
    <div className="p-3 flex items-center justify-center min-h-screen ">
      <Card className="max-w-md mx-auto w-full">
        <CardHeader className="flex flex-col items-center">
          <Avatar className="w-32 h-32">
            <AvatarImage src={user?.image ?? undefined} />
            <AvatarFallback className="bg-cyan-500 text-3xl">{user.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>{" "}
          <CardTitle className="text-center">{user?.name}</CardTitle>
          <CardDescription>last login: {user?.lastLogin ? moment(user?.lastLogin).fromNow() : "never"}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center flex-col gap-4">
          <div className="flex flex-col items-center">
            <div className="text-gray-700">Name</div>
            <div className="text-lg font-semibold">{user?.name}</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-gray-700">Email</div>
            <div className="text-lg font-semibold">{user?.email}</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-gray-700">Role</div>
            <div className="text-lg font-semibold">{user?.role}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
