import React from 'react';

import johnDoeImage from '../../assets/spec03.jpg';
import janeSmithImage from '../../assets/nehaprofilepic.jpeg'; 
import aliceJohnsonImage from '../../assets/spec05.jpg'; 
import michaelBrownImage from '../../assets/spec06.jpg'; 
import emilyDavisImage from '../../assets/spec01.jpg'; 

const teamMembers = [
  {
    id: 1,
    name: "Piyush Singh",
    role: "Founder & CEO",
    image: johnDoeImage, 
    description: "Piyush has over 2 years of experience in the tech industry and is passionate about innovation."
  },
  {
    id: 2,
    name: "Neha Singh",
    role: "Full Stack Developer",
    image: janeSmithImage, 
    description: "The developer responsible for the development of this e-commerce website."
  },
  {
    id: 3,
    name: "Alice Johnson",
    role: "Head of Marketing",
    image: aliceJohnsonImage,
    description: "Alice has a knack for creating compelling marketing strategies that resonate with customers."
  },
  
  {
    id: 4,
    name: "Michael Brown",
    role: "Product Manager",
    image: michaelBrownImage,
    description: "Michael ensures that our products meet customer needs and align with the company's vision."
  },
];

const TeamCard = ({ member }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-lg">
    <img src={member.image} alt={member.name} className="w-full h-32 object-contain " />
    <div className="p-3">
      <h3 className="text-lg font-semibold">{member.name}</h3>
      <p className="text-gray-600 text-sm">{member.role}</p>
      <p className="mt-1 text-gray-800 text-sm">{member.description}</p>
    </div>
  </div>
);

const OurTeam = () => (
  <div className="py-10 bg-gray-100">
    <div className="container mx-auto text-center">
      <h2 className="text-4xl font-bold mb-8 text-[#2d899c]">Meet Our Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers.map(member => (
          <TeamCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  </div>
);

export default OurTeam;
