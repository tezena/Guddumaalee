"use client";
import React, { useState } from "react";

import ProfileForm from "./UpdateProfile"; // Correct import

const Home: React.FC = () => {
  return (
    <div className="flex">
      <ProfileForm />
    </div>
  );
};

export default Home;
