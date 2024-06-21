import { useEffect, useState } from "react";

// pages/about.js
const title = process.env.NEXT_PUBLIC_PLATFORM;

function About() {
  const [isSFW, setIsSFW] = useState(true);

  useEffect(() => {
    // Dynamically check the title to decide if the content should be marked as SFW
    setIsSFW(!title.toLowerCase().includes("uncensored"));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <main className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-light mb-6">About {title}</h1>
        <h2 className="text-xl font-bold mb-4">
          {isSFW ? (
            <></>
          ) : (
            <>
              Content is Not Safe For Work. For safer content, visit{" "}
              <a
                href="https://tube.jimchen.me"
                className="text-gray-900 underline"
              >
                our SFW section
              </a>
              .
            </>
          )}
        </h2>

        <div className="space-y-4 text-gray-900">
          <p>
            {title} is a chill spot for self-hosting/indexing videos. No
            distractions.
          </p>

          <ul className="list-disc list-inside pl-4">
            <li>Embed videos from YouTube, Bilibili, VK, etc.</li>
            <li>No copyright issues</li>
            {isSFW && (
              <li>
                For explicit content, go to{" "}
                <a
                  href="https://nsfw.tube.jimchen.me"
                  className="text-gray-900 underline"
                >
                  NSFW section (under construction)
                </a>
                .
              </li>
            )}
            <li>
              Multi-language transcription for uploads using{" "}
              <a
                href="https://aws.amazon.com/"
                className="text-gray-900 underline"
              >
                AWS
              </a>
            </li>
          </ul>

          <p>
            Videos can be sourced from legal download sites like{" "}
            <a
              href="https://archive.org/"
              className="text-gray-900 underline"
            >
              archive.org
            </a>{" "}
            or from YouTube with a Creative Commons license.
          </p>

          <p>
            Want to contribute or self-host? Check out{" "}
            <a
              href="https://github.com/jimchen2/nextjs-tube"
              className="text-gray-900 underline"
            >
              GitHub
            </a>{" "}
            or{" "}
            <a
              href="https://hub.docker.com/r/jimchen2/nextjs-tube"
              className="text-gray-900 underline"
            >
              Docker
            </a>
            .
          </p>

          <p>
            Report issues to{" "}
            <a
              href="mailto:jimchen4214@gmail.com"
              className="text-gray-900 underline"
            >
              admin
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
}

export default About;
