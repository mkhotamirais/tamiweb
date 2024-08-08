"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NotepadText } from "lucide-react";

const websiteRequirements = [
  {
    title: "Homepage",
    content: ["School name and logo", "Welcome message", "Recent news and announcements", "Upcoming events calendar"],
  },
  {
    title: "About Us",
    content: [
      "School history",
      "Mission and vision",
      "Principal's message",
      "Faculty and staff profiles with photos and bios",
    ],
  },
  {
    title: "Admissions",
    content: [
      "Enrollment process",
      "Admission requirements",
      "Online application form",
      "Tuition fees and financial aid information",
    ],
  },
  {
    title: "Academics",
    content: [
      "Curriculum overview",
      "Grade-level syllabi",
      "Extracurricular activities",
      "Special programs and services (e.g., gifted education, special education)",
    ],
  },
  {
    title: "Student Life",
    content: [
      "Clubs and organizations",
      "Sports teams and schedules",
      "Student achievements and awards",
      "Photo and video gallery",
    ],
  },
  {
    title: "Parent Resources",
    content: [
      "Parent-teacher association (PTA) information",
      "Volunteer opportunities",
      "School policies and handbooks",
      "Important forms and documents for download",
    ],
  },
  {
    title: "News & Events",
    content: ["School newsletter", "Event calendar", "Press releases and media coverage"],
  },
  {
    title: "Contact Us",
    content: ["School address and map", "Phone and email contact information", "Contact form for inquiries"],
  },
  {
    title: "Career Opportunities",
    content: ["Job listings", "Application process", "Employee benefits"],
  },
];

export default function RequestClientDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button title="request client" size={"icon"} className="fixed bg-black/30 right-4 bottom-4 rounded-full">
          <NotepadText />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100vh-4rem)] max-w-3xl overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="text-center">Request Client</DialogTitle>
          <DialogDescription>
            <div className="px-3 py-8 md:px-8 max-w-3xl mx-auto my-8 bg-white dark:bg-gray-950 shadow-lg leading-relaxed">
              <h2 className="text-xl font-bold mb-4">
                Subject: Request for Website Development for Bluefield High School
              </h2>
              <p>
                <b>Dear Khotami,</b> My name is Ahmad Rafi, and I am the principal of Bluefield High School. We are
                interested in developing a website for our school to enhance our online presence and provide essential
                information to students, parents, and the community. We have identified several key features and pages
                that we would like to include on the website:
              </p>
              <h3 className="text-xl font-semibold mt-6 mb-3">Website Requirements</h3>
              <div>
                {websiteRequirements.map((item, index) => (
                  <div key={index}>
                    <h4 className="font-medium text-lg mt-4 mb-2">{item.title}</h4>
                    <ul className="list-inside list-disc">
                      {item.content.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="text-xl font-semibold mt-6 mb-3">Additional Features:</h3>
                Responsive Design: The website should be mobile-friendly and accessible on all devices. <br />
                Content Management System (CMS): We need an easy-to-use CMS so our staff can update content regularly.{" "}
                <br />
                SEO Optimization: To improve our visibility in search engine results. <br />
                Secure and Fast: Ensuring the website is secure and has fast load times. <br />
                We would appreciate it if you could provide us with a detailed proposal, including the estimated
                timeline and cost for the project. If you need any further information or would like to schedule a
                meeting, please feel free to contact me at ahmad.rafi@bluefieldhigh.edu.
                <br />
                Thank you for your time and consideration. We look forward to working with you to create a wonderful
                online presence for our school.
                <br />
                Best regards,
                <br />
                Ahmad Rafi <br />
                Principal <br />
                Bluefield High School <br />
                ahmad.rafi@bluefieldhigh.edu <b></b>
                (123) 456-7890
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
