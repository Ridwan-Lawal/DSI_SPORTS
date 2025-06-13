import { countVisitorsAction } from "@/src/app/_lib/actions/public/visitors";

export function countVisitors() {
  setTimeout(async () => {
    await countVisitorsAction();
  }, 10000);
}
