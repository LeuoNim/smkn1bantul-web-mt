import React from "react";
import {
  Server,
  Users,
  Trophy,
  Target,
  Cpu,
  Heart,
  Shield,
  Globe,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
const TeamMember = ({ name, role, image, description }) => (
  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group">
    <div className="relative mb-4">
      <img
        src={image}
        alt={name}
        className="w-32 h-32 rounded-full mx-auto object-cover border-2 border-blue-500/50 group-hover:border-purple-500/50 transition-all"
      />
    </div>
    <div className="text-center">
      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
        {name}
      </h3>
      <p className="text-blue-400 text-sm mb-3">{role}</p>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  </div>
);

const Achievement = ({ icon: Icon, title, value }) => (
  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group text-center">
    <Icon className="w-8 h-8 text-blue-400 mb-4 mx-auto group-hover:scale-110 transition-transform" />
    <div className="text-3xl font-bold text-white mb-2 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:text-transparent group-hover:bg-clip-text">
      {value}
    </div>
    <p className="text-gray-400 text-sm">{title}</p>
  </div>
);

const ValueCard = ({ icon: Icon, title, description }) => (
  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group">
    <Icon className="w-8 h-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
      {title}
    </h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

export default function AboutPage() {
  const teamMembers = [
    {
      name: "26BZ",
      role: "Founder & CEO",
      image: "https://placehold.co/150",
      description: "10+ years in gaming infrastructure and cloud solutions",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-gray-900 via-gray-900 to-black py-24 relative overflow-hidden">
      <Helmet>
        <title>About Us | GameHub</title>
        <meta
          name="description"
          content="Deploy a Minecraft server in seconds with MyApp's enterprise-grade hosting."
        />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6 bg-gradient-to-r from-gray-800/50 via-gray-800/30 to-gray-900/50 rounded-full p-1 backdrop-blur-sm border border-gray-700/50">
            <div className="flex items-center space-x-2 px-4 py-2">
              <Heart size={18} className="text-blue-400" />
              <span className="text-gray-300 font-medium">Our Story</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Powering Gaming Dreams
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto font-medium">
            Since 2018, we've been revolutionizing game hosting with
            cutting-edge technology and passionate support
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <Target className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              To empower gamers and communities by providing reliable,
              high-performance hosting solutions that bring people together
              through seamless gaming experiences.
            </p>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <Achievement icon={Server} title="Active Servers" value="5000+" />
          <Achievement icon={Users} title="Happy Customers" value="50k+" />
          <Achievement icon={Trophy} title="Industry Awards" value="15+" />
          <Achievement icon={Globe} title="Data Centers" value="20+" />
        </div>

        {/* Company Values */}
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Our Values
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <ValueCard
            icon={Shield}
            title="Reliability First"
            description="We prioritize uptime and performance above all else, ensuring your games stay online 24/7."
          />
          <ValueCard
            icon={Heart}
            title="Community Focused"
            description="Built by gamers for gamers, we understand and support our community's needs."
          />
          <ValueCard
            icon={Cpu}
            title="Technical Excellence"
            description="Cutting-edge infrastructure and continuous innovation drive our services."
          />
        </div>

        {/* Team Section */}
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Meet Our Team
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
}
