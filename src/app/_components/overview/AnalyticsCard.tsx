import { LucideProps, TrendingDown, TrendingUp } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface AnalyticsCardProps {
  title: string;
  value: number | undefined;
  percent: number | undefined;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

export default function AnalyticsCard({
  title,
  value,
  percent,
  Icon,
}: AnalyticsCardProps) {
  return (
    <div className="h- flex items-start justify-between rounded-sm border-neutral-100 bg-white p-4 shadow-md shadow-neutral-100">
      <div className="flex w-full flex-col">
        <div className="flex items-center justify-between">
          <p className="text-sm text-neutral-900 capitalize">{title}</p>
          <Icon className="size-4 text-neutral-500" />
        </div>

        <h5 className="mt-1 text-neutral-800 md:hidden">{value ?? 0}</h5>
        <h4 className="mt-1 hidden text-neutral-800 md:block">{value ?? 0}</h4>
        <p className="flex items-center gap-1 text-[12.5px] text-neutral-500">
          {percent && percent >= 1 ? (
            <span className="flex items-center gap-1 text-green-500">
              <TrendingUp className="size-4 text-green-500" /> +{percent}%
            </span>
          ) : (
            <span className="flex items-center gap-1 text-red-500">
              <TrendingDown className="size-4 text-red-500" /> +{percent}
            </span>
          )}{" "}
          from last month
        </p>
      </div>
    </div>
  );
}
