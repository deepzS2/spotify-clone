import { Header } from "@/components/Header";

import { AccountContent } from "./components/AccountContent";

const Account = () => {
  return (
    <div className="overflow-hidden overflow-y-auto w-full h-full rounded-lg bg-neutral-900">
      <Header className="from-bg-neutral-900">
        <div className="flex flex-col gap-y-6 mb-2">
          <h1 className="text-3xl font-semibold text-white">
            Account Settings
          </h1>
        </div>
      </Header>
      <AccountContent />
    </div>
  );
};

export default Account;
