import React from "react";
import {
  Star,
  Server,
  CheckCircle,
  Cpu,
  CirclePower,
  HardDrive,
  Network,
  Globe,
  Database,
  Mail,
} from "lucide-react";

export const StatCard = ({ icon: Icon, label, value }) => (
  <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
    <div className="flex items-center text-blue-400 mb-2">
      <Icon size={18} className="mr-2" />
      <span className="text-sm">{label}</span>
    </div>
    <div className="text-white font-bold">{value}</div>
  </div>
);

export const SpecItem = ({ icon: Icon, spec }) => (
  <div className="text-gray-300 flex items-center py-1.5">
    <Icon size={16} className="text-blue-400 mr-2" />
    {spec}
  </div>
);

export const PlanCard = ({ plan, type }) => (
  <div className="group bg-gradient-to-br from-gray-800/50 via-gray-800/30 to-gray-900/50 rounded-2xl backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 overflow-hidden">
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          {plan.promoTag && (
            <div className="inline-block bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-medium mb-2">
              {plan.promoTag}
            </div>
          )}
          <h3 className="text-2xl font-bold text-white">{plan.title}</h3>
        </div>
        <div className="flex items-center bg-gray-800 rounded-full px-3 py-1">
          <Star size={16} className="text-yellow-400 fill-yellow-400 mr-1" />
          <span className="text-white font-medium">{plan.rating}</span>
        </div>
      </div>

      {plan.badge && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium animate-pulse">
          {plan.badge}
        </div>
      )}

      <div className="space-y-1 mb-6 border-t border-b border-gray-700/50 py-4">
        <SpecItem icon={Cpu} spec={plan.specs.cpu} />
        <SpecItem icon={CirclePower} spec={plan.specs.ram} />
        <SpecItem icon={HardDrive} spec={plan.specs.storage} />
        <SpecItem icon={Network} spec={plan.specs.bandwidth} />
        {type === "web" && (
          <>
            <SpecItem icon={Globe} spec={plan.specs.domains} />
            <SpecItem icon={Database} spec={plan.specs.databases} />
            <SpecItem icon={Mail} spec={plan.specs.email} />
          </>
        )}
        <SpecItem icon={Server} spec={plan.specs.backups} />
      </div>

      <div className="space-y-2 mb-6">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-center text-gray-300">
            <CheckCircle
              size={16}
              className="text-green-500 mr-2 flex-shrink-0"
            />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2">
        <div>
          <div className="text-gray-400 text-sm">Starting at</div>
          <div className="text-2xl font-bold text-white">
            ${plan.price}
            <span className="text-gray-400 text-sm font-normal">/month</span>
          </div>
        </div>
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 font-medium flex items-center">
          <Server size={18} className="mr-2" />
          Deploy Now
        </button>
      </div>
    </div>
  </div>
);
