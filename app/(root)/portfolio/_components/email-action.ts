"use server";

import React from "react";
import { Resend } from "resend";
import EmailStyle from "./email-style";

const resend = new Resend(process.env.RESEND_API_KEY);

const validateString = (value: unknown, maxLength: number) => {
  if (!value || typeof value !== "string" || value.length > maxLength) {
    return false;
  }
  return true;
};

const getErrorMessage = (error: unknown) => {
  let message: string;
  if (error instanceof Error) {
    message = error?.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "something went wrong";
  }
  return message;
};

export const emailAction = async (formData: FormData) => {
  const sender = formData.get("sender");
  const message = formData.get("message");

  if (!validateString(sender, 500)) {
    return { error: "Invalid sender" };
  }

  if (!validateString(message, 2000)) {
    return { error: "Invalid message" };
  }

  let data;
  try {
    data = await resend.emails.send({
      from: "Contact From <onboarding@resend.dev>",
      to: "mkhotamirais@gmail.com",
      subject: "Message from contact form",
      reply_to: sender as string,
      //   text: message as string,
      // react: <ContactFormEmail message={message} sender={sender} />
      react: React.createElement(EmailStyle, { message: message as string, sender: sender as string }),
    });
  } catch (error: unknown) {
    // handle error tanpa tanpa dipisah
    // if (error instanceof Error) {
    //   return {
    //     error: error?.message,
    //   };
    // } else if (error && typeof error === "object" && "message" in error) {
    //   return {
    //     error: error.message,
    //   };
    // }

    // handle error jika dipisah
    return {
      error: getErrorMessage(error),
    };
  }
  return {
    data,
  };
};
