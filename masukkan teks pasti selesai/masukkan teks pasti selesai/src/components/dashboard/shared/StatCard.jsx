import React from 'react';

const StatCard = ({ icon: Icon, title, value, color }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-lg p-5 rounded-xl border border-slate-700/50 flex items-start gap-4">
      <div className={`p-3 rounded-lg bg-${color}-500/10`}>
        <Icon size={24} className={`text-${color}-400`} />
      </div>
      <div>
        <p className="text-sm text-slate-400 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-white">{value}</h3>
      </div>
    </div>
  );
};

export default StatCard;