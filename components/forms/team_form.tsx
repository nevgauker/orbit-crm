"use client";

import { useState } from "react";
import axios from "axios";

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
      // Narrow the error type
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to create team. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-4">Create a New Team</h2>
      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Team Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          placeholder="Enter team name"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description (optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          placeholder="Enter a brief description of the team"
        ></textarea>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleCreateTeam}
          disabled={loading}
          className={`px-4 py-2 rounded-md text-white ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {loading ? "Creating..." : "Create Team"}
        </button>
      </div>
    </div>
  );
}
