import { useEffect, useState } from "react";
import { Ticket } from "../types";

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
}

const useTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch("/api/tickets");
        if (!response.ok) {
          throw new Error("Failed to fetch tickets");
        }
        const data: Ticket[] = await response.json();
        setTickets(data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const updateTicket = async (
    ticketId: string,
    updatedData: Partial<Ticket>,
  ) => {
    try {
      const response = await fetch(`/api/tickets/${ticketId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        throw new Error("Failed to update ticket");
      }
      const updatedTicket = await response.json();
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id === updatedTicket.id ? updatedTicket : ticket,
        ),
      );
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return { tickets, loading, error, updateTicket };
};

export default useTickets;
