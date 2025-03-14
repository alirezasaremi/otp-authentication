import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

export const withAuth = (WrappedComponent: any) => {
  return async (props: any) => {
    // const session = await auth();
    // if (!session || !session.token || !session.user) {
    //   redirect("/login");
    // }
    redirect("/login");

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
