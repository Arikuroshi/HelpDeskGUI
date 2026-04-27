import React from "react";

export default function SLAAndPriority() {
  return (
    <div className="p-6 bg-white dark:bg-black">
      <h1 className="text-2xl font-bold">Priority And SLA Definitions</h1>
      <p className="mt-4">
        Priority are assigned automatically out from impact and urgency rating
        and indicates how urgently support should address a ticket.
      </p>

      <h2 className="mt-6 text-lg font-semibold">Priority</h2>
      <ul className="list-disc pl-6 mt-2">
        <li>
          <strong>P1 - Critical:</strong>- System outage / core feature
          unavailable - Multiple users affected - No workaround available.
          Examples: - Login system down - Database failure
        </li>
        <li>
          <strong>P2 - High:</strong>- Major functionality impaired - some
          workaround available but not ideal Examples: - Ticket creation failing
          intermittently - Slow API affecting users
        </li>
        <li>
          <strong>P3 - Medium:</strong>- Non-critical functionality affected -
          Limited user impact Examples: - UI glitch in dashboard - Minor feature
          not working as expected
        </li>
        <li>
          <strong>P4 - Low:</strong>- Cosmetic issues/informational Examples: -
          Typo in help article - Minor UI misalignment
        </li>
      </ul>

      <h2 className="mt-6 text-lg font-semibold">
        SLA (Service Level Agreement)
      </h2>
      <p className="mt-2">
        SLAs define the expected level of service and response times for
        different priority levels.
      </p>
      <ul className="list-disc pl-6 mt-2">
        <li>
          <strong>P1 - Critical:</strong> Response within 15 minutes, resolution
          within 4 hours.
        </li>
        <li>
          <strong>P2 - High:</strong> Response within 1 hour, resolution within
          8 hours.
        </li>
        <li>
          <strong>P3 - Medium:</strong> Response within 4 hour, resolution
          within 48 hours(2 days).
        </li>
        <li>
          <strong>P4 - Low:</strong> Response within 24 hours (1 day),
          resolution within 120 hours (5 days).
        </li>
      </ul>
    </div>
  );
}
