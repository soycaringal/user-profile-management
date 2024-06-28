import React from "react";
import { IUserProfile } from "../types";

interface UserProfileListProps {
  profiles: IUserProfile[];
  onEditProfile: (id: string) => void;
  onDeleteProfile: (id: string) => void;
}

const UserProfileList: React.FC<UserProfileListProps> = ({ profiles, onEditProfile, onDeleteProfile }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">User Profiles</h2>
      <ul>
        {profiles.map((profile) => (
          <li key={profile._id} className="mb-2 p-2 border rounded-md shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{profile.name}</p>
                <p className="text-sm text-gray-600">{profile.email}</p>
              </div>
              <div className="flex">
                <button
                  onClick={() => onEditProfile(profile._id!)}
                  className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteProfile(profile._id!)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfileList;
