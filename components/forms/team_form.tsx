"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

interface TeamCreationFormProps {
  onTeamCreated?: (teamId: string) => void; // Optional callback after successful creation
}

export default function TeamCreationForm({ onTeamCreated }: TeamCreationFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateTeam = async () => {
    if (!name.trim()) {
      setError("Team name is required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/teams", { name, description });
      if (response.status === 201 || response.status === 200) {
        setName("");
        setDescription("");
        if (onTeamCreated) {
          const createdId = response.data?.id ?? response.data?.teamId;
          if (createdId) onTeamCreated(createdId);
        }
        alert("Team created successfully!");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status
        const message = (() => { const data = err.response?.data as unknown; if (data && typeof data === "object") { const rec = data as Record<string, unknown>; return (rec.error as string) || (rec.message as string) || err.message; } return err.message; })()
        setError(message || "Failed to create team. Please try again.")
        if (status === 403) {
          toast.error("Team limit reached for your plan", {
            description: "Upgrade to create more teams.",
            action: {
              label: "View Pricing",
              onClick: () => {
                window.location.href = "/pricing"
              },
            },
          })
        } else {
          toast.error("Failed to create team")
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
        toast.error("Unexpected error")
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto rounded-lg border bg-card p-6">
      <h2 className="text-lg font-semibold mb-4">Create a New Team</h2>
      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm text-muted-foreground mb-1">
          Team Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md bg-background"
          placeholder="Enter team name"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm text-muted-foreground mb-1">
          Description (optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded-md bg-background"
          placeholder="Enter a brief description of the team"
        ></textarea>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleCreateTeam}
          disabled={loading}
          className={`px-4 py-2 rounded-md ${loading ? "bg-gray-400 text-white" : "bg-primary text-primary-foreground hover:opacity-90"}`}
        >
          {loading ? "Creating..." : "Create Team"}
        </button>
      </div>
    </div>
  );
}

