import React, { useState, useEffect, useMemo } from "react";
import UserProfileList from "./user/UserProfileList";
import UserProfileModal from "./user/UserProfileModal";
import { getAllProfiles, deleteProfile, generateDataItems } from "./api/users";
import { IUserProfile } from "./types";
import DataTable from "./user/DataTable";
import "./index.css";

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState<string | undefined>(undefined);
  const [profiles, setProfiles] = useState<IUserProfile[]>([]);
  const data = useMemo(() => generateDataItems(0, 1000), []);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    const fetchedProfiles = await getAllProfiles();
    setProfiles(fetchedProfiles);
  };

  const handleProfileSaved = () => {
    setIsModalOpen(false);
    setSelectedProfileId(undefined);
    fetchProfiles(); // Refresh the profiles list after save
  };

  const handleEditProfile = (id: string) => {
    setSelectedProfileId(id);
    setIsModalOpen(true);
  };

  const handleCreateProfile = () => {
    setSelectedProfileId(undefined);
    setIsModalOpen(true);
  };

  const handleDeleteProfile = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      await deleteProfile(id);
      fetchProfiles(); // Refresh the profiles list after delete
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">User Profile Management</h1>
      <button
        onClick={handleCreateProfile}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md"
      >
        Create Profile
      </button>
      <UserProfileList profiles={profiles} onEditProfile={handleEditProfile} onDeleteProfile={handleDeleteProfile} />
      <UserProfileModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        selectedProfileId={selectedProfileId}
        onProfileSaved={handleProfileSaved}
      />
      <h2 className="text-2xl font-semibold mt-8">Data Table</h2>
      <DataTable data={data}  />
    </div>
  );
};

export default App;
