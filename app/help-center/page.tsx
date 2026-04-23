import React from "react";

const HelpCenter = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-black">
      <h2 className="text-2xl font-bold text-black dark:text-zinc-50">
        Help Center
      </h2>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Find answers to your questions and access our help articles below.
      </p>
      <div className="mt-6 space-y-4">
        <a
          href="/help/article1"
          className="block p-4 border rounded-lg shadow hover:bg-gray-100 dark:hover:bg-zinc-700"
        >
          <h3 className="text-lg font-semibold text-black dark:text-zinc-50">
            Article 1: Getting Started
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            Learn how to set up your account and get started with our services.
          </p>
        </a>
        <a
          href="/help/article2"
          className="block p-4 border rounded-lg shadow hover:bg-gray-100 dark:hover:bg-zinc-700"
        >
          <h3 className="text-lg font-semibold text-black dark:text-zinc-50">
            Article 2: Managing Tickets
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            A guide on how to create, view, and manage your support tickets.
          </p>
        </a>
        <a
          href="/help/article3"
          className="block p-4 border rounded-lg shadow hover:bg-gray-100 dark:hover:bg-zinc-700"
        >
          <h3 className="text-lg font-semibold text-black dark:text-zinc-50">
            Article 3: FAQs
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            Frequently asked questions about our services and support.
          </p>
        </a>
      </div>
    </div>
  );
};

export default HelpCenter;
