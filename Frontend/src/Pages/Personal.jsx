import React, { useEffect, useRef, useState } from "react";
import Header_p from "./../UI/Header_p";
import { useStore } from "../Context/Store";
import { MdOutlineEdit } from "react-icons/md";
import { HiOutlineUser } from "react-icons/hi";
import { FaPhoneVolume } from "react-icons/fa6";

const Personal = () => {
  const { profileData } = useStore();
  const { name, image, number, gender } = profileData?.profile || {};

  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: name || "", // Ensure it’s always a string
    number: number || "", // Ensure it’s always a string
    gender: gender || "Not selected", // Default value
    image: image || "", // Ensure it’s always a string
  });

  //! Load profile data when available
  useEffect(() => {
    if (profileData) {
      setFormData({
        name: name,
        number: number,
        gender: gender,
        image: image,
      });
    }
  }, [profileData]);

  //! Handle file selection
  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  // !Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // !Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-[100dvh] w-screen cc">
      <div className="mobile_Screen md:border md:rounded-md cc overflow-hidden">
        <div className="h-full overflow-hidden">
          <Header_p text="Personal Info" logo={true} />
          <form
            onSubmit={handleSubmit}
            className="overflow-hidden h-full w-full"
          >
            {/*! Profile Image Section */}
            <div className="cc mt-3 relative">
              {formData.image && (
                <img
                  src={formData.image}
                  alt={formData.name || "Profile Image"}
                  className="w-[10rem] rounded-full"
                />
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                name="image"
                className="hidden"
                onChange={handleFileChange}
              />
              <button
                type="button"
                onClick={handleEditClick}
                className="flex cursor-pointer text-lg items-center justify-center gap-1 border px-2 bottom-0 absolute bg-white rounded-sm"
              >
                Edit <MdOutlineEdit className="text-xl" />
              </button>
            </div>

            {/* Name Input */}
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex flex-col gap-2">
                <p className="text-lg font-medium pl-2">Name</p>
                <div className="flex items-center justify-center rounded-lg bg-gray-100 py-3 px-5">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full h-full border-none outline-none text-xl"
                  />
                  <HiOutlineUser className="text-2xl" />
                </div>
              </div>

              {/* !Phone Number Input */}
              <div className="flex flex-col gap-2">
                <p className="text-lg font-medium pl-2">Phone Number</p>
                <div className="flex items-center justify-center rounded-lg bg-gray-100 py-3 px-5">
                  <input
                    type="number"
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    className="w-full h-full border-none outline-none text-xl"
                  />
                  <FaPhoneVolume className="text-xl" />
                </div>
              </div>

              {/* !Gender Selection */}
              <div className="flex flex-col gap-2">
                <p className="text-lg font-medium">Gender</p>
                <div className="flex items-center justify-center rounded-lg bg-gray-100 py-3 px-5">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full h-full outline-none border-none cursor-pointer"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="transgender">Transgender</option>
                    <option value="not selected">Not selected</option>
                  </select>
                </div>
              </div>

              {/*! Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue text-white py-3 rounded-lg mt-4 text-lg cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Personal;
