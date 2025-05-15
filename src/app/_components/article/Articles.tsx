import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

const invoices = [
  {
    title: "Champions league from the united state to the middle east",
    category: "Champions league",
    status: "published",
    date: "12 aug, 2002",
  },
  {
    title: "Vinicius transfer",
    category: "transfer",
    status: "draft",
    date: "12 aug, 2002",
  },
];

export default function Articles() {
  return (
    <div className="mt-9 overflow-hidden rounded-md border border-neutral-100 text-sm">
      <div className="hidden w-full grid-cols-3 justify-between gap-4 bg-neutral-50 px-3 py-4 md:grid md:grid-cols-4 lg:grid-cols-5">
        <div className="max-w-[200px]">Title</div>
        <div className="justify-self-center">Category</div>
        <div className="justify-self-center">Status</div>
        <div className="justify-self-center">Date</div>
      </div>
      <div className="w-full odd:bg-neutral-100">
        {invoices.map((invoice) => (
          <div
            className="justify-items-between lg:min-h-[80px grid min-h-[100px] w-full grid-cols-3 items-center gap-4 px-3 py-3 text-[13.5px] text-neutral-700 odd:bg-neutral-50 even:bg-white md:grid-cols-4 md:text-sm md:odd:bg-white md:even:bg-neutral-50 lg:grid-cols-5"
            key={invoice?.title}
          >
            <p className="max-w-[200px] break-words whitespace-normal capitalize">
              {invoice?.title}
            </p>
            {/* category and status for mobile */}
            <div className="flex flex-col items-center gap-4 md:hidden">
              <p className="break-words whitespace-normal capitalize">
                {invoice?.category}
              </p>
              <p
                className={`capitalize ${invoice?.status === "published" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"} rounded-xl px-4 py-[3px] text-xs font-medium`}
              >
                {invoice?.status}
              </p>
            </div>

            {/* category and status for desktop */}
            <p className="hidden justify-self-center break-words whitespace-normal capitalize md:block">
              {invoice?.category}
            </p>
            <p
              className={`hidden self-center justify-self-center text-xs capitalize md:block ${invoice?.status === "published" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"} rounded-xl px-4 py-[3px] font-medium`}
            >
              {invoice?.status}
            </p>

            <p className="hidden justify-self-center lg:block">
              {invoice?.date}
            </p>

            <div className="flex h-full flex-col items-end justify-between gap-4 lg:justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer" asChild>
                  <EllipsisVertical className="size-4 cursor-pointer text-neutral-500" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="absolute right-0 mt-2 max-w-[30px] min-w-[6rem] border-neutral-200 bg-white">
                  {["edit", "delete"]?.map((action) => (
                    <DropdownMenuCheckboxItem
                      key={action}
                      className={`${action === "delete" && "text-red-600"} cursor-pointer capitalize transition-colors hover:bg-neutral-100`}
                    >
                      {action}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <p className="lg:hidden">{invoice?.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
