import React, { useEffect, useRef, useState } from "react";
import Header_p from "./../UI/Header_p";
import { useStore } from "../Context/Store";
import { MdOutlineEdit } from "react-icons/md";
import { HiOutlineUser } from "react-icons/hi";
import { FaPhoneVolume } from "react-icons/fa6";
import { useMutation } from "@tanstack/react-query";
import { MdOutgoingMail } from "react-icons/md";
import { EditFrofile } from "../Api/Api";
import imagedefault from "../assets/default.png";
import { toast } from "react-toastify";
import Small_Loader from "./../UI/Small_Loader";

const Personal = () => {
  const { profileData, token, profileRefetch } = useStore();
  const { name, image, number, gender, email } = profileData?.profile || {};

  const fileInputRef = useRef(null);

  const [inputData, setinputData] = useState({
    name: name || "",
    number: number || "",
    email: email || "",
    gender: gender || "Not selected",
    image: image || "",
  });

  // const [isSaved, setIsSaved] = useState(false);

  //! Load profile data when available
  useEffect(() => {
    if (profileData) {
      setinputData({
        name: name,
        number: number,
        gender: gender,
        image: image,
        email: email,
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
      setinputData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setinputData((prev) => ({ ...prev, [name]: value }));
  };

  // ! mutation fuction
  const { mutate, status } = useMutation({
    mutationFn: (formData) => EditFrofile(token, formData),
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
        // !after adding data refetch profile data
        profileRefetch();
      }
    },
    onError: (error) => {
      console.error("Update failed:", error);
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", inputData.name);
    formData.append("number", inputData.number);
    formData.append("email", inputData.email);
    formData.append("gender", inputData.gender);

    if (inputData.image instanceof File) {
      formData.append("image", inputData.image);
    }

    mutate(formData);
  };

  return (
    <div className="min-h-[100dvh] w-screen cc">
      <div className="mobile_Screen md:border md:rounded-md cc overflow-hidden">
        <div className="h-full overflow-hidden cc w-full">
          <div className="container h-full">
            <Header_p text="Personal Info" logo={true} />
            <form
              onSubmit={handleSubmit}
              className="overflow-hidden h-full w-full"
            >
              {/* Profile Image Section */}
              <div className="cc mt-3 relative">
                <img
                  src={
                    inputData.image instanceof File
                      ? URL.createObjectURL(inputData.image)
                      : inputData.image || imagedefault
                  }
                  alt={inputData.name || "Profile Image"}
                  className="w-[7rem] aspect-square object-cover rounded-full"
                />

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
                  className="flex cursor-pointer text-lg items-center justify-center gap-1 border px-2 -bottom-3 absolute bg-white rounded-sm"
                >
                  Edit <MdOutlineEdit className="text-xl" />
                </button>
              </div>

              {/* Form Fields */}
              <div className="flex flex-col gap-4 mt-5">
                {/* Name Input */}
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-medium pl-2">Name</p>
                  <div className="flex items-center rounded-lg bg-gray-100 py-2 px-5">
                    <input
                      type="text"
                      name="name"
                      value={inputData.name}
                      onChange={handleChange}
                      className="w-full text-xl border-none outline-none"
                    />
                    <HiOutlineUser className="text-2xl" />
                  </div>
                </div>

                {/* Phone Input */}
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-medium pl-2">Phone Number</p>
                  <div className="flex items-center rounded-lg bg-gray-100 py-2 px-5">
                    <input
                      type="number"
                      name="number"
                      value={inputData.number}
                      onChange={handleChange}
                      className="w-full text-xl border-none outline-none"
                    />
                    <FaPhoneVolume className="text-xl" />
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-medium pl-2">Email</p>
                  <div className="flex items-center rounded-lg bg-gray-100 py-2 px-5">
                    <input
                      type="email"
                      name="email"
                      value={inputData.email}
                      onChange={handleChange}
                      className="w-full text-lg border-none outline-none"
                    />
                    <MdOutgoingMail className="text-2xl" />
                  </div>
                </div>

                {/* Gender */}
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-medium">Gender</p>
                  <div className="flex items-center rounded-lg bg-gray-100 py-2 px-5">
                    <select
                      name="gender"
                      value={inputData.gender}
                      onChange={handleChange}
                      className="w-full cursor-pointer border-none outline-none"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="transgender">Transgender</option>
                      <option value="Not selected">Not selected</option>
                    </select>
                  </div>
                </div>

                {/*! Submit Button */}
                <button
                  type="submit"
                  className={`w-full cc ${
                    status === "pending" ? "bg-blue-400" : "bg-blue"
                  } text-white py-2 rounded-lg mt-2 text-lg cursor-pointer transition-all duration-300`}
                >
                  {status === "pending" ? <Small_Loader /> : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personal;
