"use client";

interface TravelReport {
  destination: string;
  travel_month: string;
  total_budget_estimate: string;
  flight_summary: string;
  flight_price_range: string;
  hotel_summary: string;
  hotel_price_range: string;
  weather_summary: string;
  weather_rating: string;
  visa_summary: string;
  visa_required: boolean;
  top_activities: string[];
  insider_tip: string;
  overall_recommendation: string;
}

interface ReportCardProps {
  report: TravelReport;
}

function InfoCard({
  icon,
  title,
  summary,
  detail,
  colorClass,
}: {
  icon: string;
  title: string;
  summary: string;
  detail: string;
  colorClass: string;
}) {
  return (
    <div
      className={`p-4 rounded-xl border bg-dark-700/50 animate-slide-up ${colorClass}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{icon}</span>
        <h4 className="font-heading font-semibold text-sm text-gray-200">
          {title}
        </h4>
      </div>
      <p className="text-gray-400 text-xs font-mono leading-relaxed mb-2">
        {summary}
      </p>
      <p className="text-xs font-mono font-semibold text-gray-300">{detail}</p>
    </div>
  );
}

export default function ReportCard({ report }: ReportCardProps) {
  const weatherColor =
    report.weather_rating === "Great"
      ? "text-green-400"
      : report.weather_rating === "Good"
        ? "text-blue-400"
        : report.weather_rating === "Fair"
          ? "text-yellow-400"
          : "text-red-400";

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Hero Card */}
      <div className="p-6 rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/20">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-1">
              Destination
            </p>
            <h2 className="font-heading text-2xl font-bold text-white">
              {report.destination}
            </h2>
            <p className="text-gray-400 font-mono text-sm mt-1">
              {report.travel_month}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-1">
              Est. Budget
            </p>
            <p className="font-heading text-2xl font-bold text-white">
              {report.total_budget_estimate}
            </p>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <InfoCard
          icon={"\u2708\uFE0F"}
          title="Flights"
          summary={report.flight_summary}
          detail={report.flight_price_range}
          colorClass="border-blue-500/20"
        />
        <InfoCard
          icon={"\u{1F3E8}"}
          title="Hotels"
          summary={report.hotel_summary}
          detail={report.hotel_price_range}
          colorClass="border-purple-500/20"
        />
        <InfoCard
          icon={"\u2600\uFE0F"}
          title="Weather"
          summary={report.weather_summary}
          detail={`Rating: ${report.weather_rating}`}
          colorClass="border-cyan-500/20"
        />
        <InfoCard
          icon={"\u{1F4C4}"}
          title="Visa"
          summary={report.visa_summary}
          detail={report.visa_required ? "Visa Required" : "No Visa Required"}
          colorClass="border-orange-500/20"
        />
      </div>

      {/* Activities */}
      <div className="p-4 rounded-xl border border-green-500/20 bg-dark-700/50 animate-slide-up">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">{"\u{1F3AF}"}</span>
          <h4 className="font-heading font-semibold text-sm text-gray-200">
            Top Activities
          </h4>
        </div>
        <ul className="space-y-2">
          {report.top_activities.map((activity, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-gray-400 font-mono text-xs"
            >
              <span className="text-green-400 mt-0.5">{"\u25B8"}</span>
              {activity}
            </li>
          ))}
        </ul>
      </div>

      {/* Insider Tip */}
      <div className="p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 animate-slide-up">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">{"\u{1F4A1}"}</span>
          <h4 className="font-heading font-semibold text-sm text-yellow-300">
            Insider Tip
          </h4>
        </div>
        <p className="text-gray-300 font-mono text-xs leading-relaxed">
          {report.insider_tip}
        </p>
      </div>

      {/* Overall Recommendation */}
      <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 animate-slide-up">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-lg ${weatherColor}`}>{"\u2713"}</span>
          <h4 className="font-heading font-semibold text-sm text-emerald-300">
            Recommendation
          </h4>
        </div>
        <p className="text-gray-300 font-mono text-xs leading-relaxed">
          {report.overall_recommendation}
        </p>
      </div>
    </div>
  );
}
