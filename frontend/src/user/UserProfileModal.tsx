import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { createProfile, updateProfile, getProfileById } from "../api/users";
import { IUserProfile } from "../types";

interface UserProfileModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedProfileId?: string;
  onProfileSaved: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onRequestClose,
  selectedProfileId,
  onProfileSaved,
}) => {
  const [profile, setProfile] = useState<IUserProfile>({
    name: "",
    email: "",
    age: 0,
    tags: [],
  });

  useEffect(() => {
    if (selectedProfileId) {
      (async () => {
        const fetchedProfile = await getProfileById(selectedProfileId);
        setProfile(fetchedProfile);
      })();
    }
  }, [selectedProfileId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProfileId) {
      await updateProfile(selectedProfileId, profile);
    } else {
      await createProfile(profile);
    }
    setProfile({ name: "", email: "", age: 0, tags: [] });
    onProfileSaved();
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="User Profile Modal"
      className="fixed inset-0 flex items-center justify-center z-50 outline-none focus:outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4">
          {selectedProfileId ? "Edit Profile" : "Create Profile"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Age:</label>
            <input
              type="number"
              name="age"
              value={profile.age}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onRequestClose}
              className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UserProfileModal;
