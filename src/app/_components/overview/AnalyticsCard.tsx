import { LucideProps, TrendingDown, TrendingUp } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface AnalyticsCardProps {
  title: string;
  value: number | undefined;
  percent?: number | undefined;
  uniqueVisitors?: number | undefined;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

export default function AnalyticsCard({
  title,
  value,
  percent,
  uniqueVisitors,
  Icon,
}: AnalyticsCardProps) {
  return (
    <div className="h- flex items-start justify-between rounded-sm border-neutral-100 bg-white p-4 shadow-md shadow-neutral-100">
      <div className="flex w-full flex-col">
        <div className="flex items-center justify-between">
          <p className="text-sm text-neutral-900 capitalize">{title}</p>
          <Icon className="size-4 text-neutral-500" />
        </div>

        <div className="flex items-end justify-between">
          <div>
            <h5 className="mt-1 text-neutral-800 md:hidden">{value ?? 0}</h5>
            <h4 className="mt-1 hidden text-neutral-800 md:block">
              {value ?? 0}
            </h4>
            {percent !== undefined && (
              <p className="flex items-center gap-1 text-[12.5px] text-neutral-500">
                {percent === 0 ? (
                  <span className="flex items-center gap-1 text-neutral-500">
                    ___ {percent}%
                  </span>
                ) : percent && percent >= 1 ? (
                  <span className="flex items-center gap-1 text-green-500">
                    <TrendingUp className="size-4 text-green-500" /> +{percent}%
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-red-500">
                    <TrendingDown className="size-4 text-red-500" /> {percent}%
                  </span>
                )}{" "}
                from last month
              </p>
            )}
          </div>
          {uniqueVisitors !== undefined && uniqueVisitors >= 0 && (
            <div>
              <p className="text-xs font-medium text-neutral-900 capitalize">
                <span className="md:hidden">Unique V.</span>

                <span className="hidden md:block">UnQ V.</span>
              </p>

              <h6 className="mt-1 text-right text-base text-neutral-800">
                {uniqueVisitors ?? 0}
              </h6>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
