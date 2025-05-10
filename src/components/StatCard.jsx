/* eslint-disable react/prop-types */
const StatCard = ({ icon, count, label }) => {
  return (
    <div className="w-full border rounded-xl p-6 bg-white shadow-sm hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="rounded-xl bg-orange-100 p-2">
          <img src={icon} alt={label} loading="lazy" className="w-8" />
        </div>
        <h2 className="font-semibold text-2xl">{count}</h2>
      </div>
      <p className="mt-5 font-semibold">{label}</p>
    </div>
  );
};

export default StatCard;
