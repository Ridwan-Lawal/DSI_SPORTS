import { bebasNeue } from "@/src/app/_styles/font";

export default function Comments() {
  return (
    <div className="mt-10 space-y-6 bg-white px-4 pt-6 pb-8 shadow-lg shadow-gray-100 sm:px-6 md:px-8 md:pt-8 md:pb-9 lg:mx-auto lg:max-w-[1100px]">
      <div className="">
        <h4 className={`${bebasNeue?.className}`}>Conversations</h4>
        <p className="text-sm text-neutral-500">
          Engage in meaningful conversations with other viewers.
        </p>
      </div>

      <div className="flex h-[100px] items-center justify-center">
        <h5 className="text-gray-400">Coming Soon...</h5>
      </div>
    </div>
  );
}
