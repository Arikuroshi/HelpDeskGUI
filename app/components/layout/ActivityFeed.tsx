import React from "react";
import Section from "./Section";

interface Activity {
  id: string;
  message: string;
  createdAt?: string;
  // add other fields you use
}

interface ActivityFeedProps {
  items: Activity[];
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ items }) => {
  return (
    <Section title="Recent Activity">
      <div className="space-y-3">
        {items.map((item: Activity) => (
          <div key={item.id} className="text-sm text-black/70">
            {" — "}
            {item.message}
          </div>
        ))}
      </div>
    </Section>
  );
};

export default ActivityFeed;
