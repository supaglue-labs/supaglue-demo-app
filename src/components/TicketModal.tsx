"use client";

import { useCustomerContext } from "@/hooks/useCustomerContext";
import { getHeadersWithCustomerProvider } from "@/lib/headers";
import { TicketIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";
import { Toast } from "./Toast";

export function TicketModal({ providerName }: { providerName: string }) {
  const activeCustomer = useCustomerContext();
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("Issue created.");
  const [showToast, setShowToast] = useState(false);

  /**
   * Use SWR Mutation to allow your customers to report issues with your application.
   * This edge function will hit api/create-linear-ticket/route.ts.
   */
  const { trigger, error, data, isMutating } = useSWRMutation(
    `/api/create-linear-ticket`,
    async (url, { arg }: { arg: any }) => {
      return await fetch(url, {
        method: "POST",
        headers: getHeadersWithCustomerProvider(
          activeCustomer.id,
          providerName
        ),
        body: JSON.stringify(arg),
      });
    }
  );

  useEffect(() => {
    if (data && data.ok) {
      setMessage("Issue created.");
      setShowToast(true);
    } else if ((data && !data.ok) || error) {
      setMessage("Error.");
      setShowToast(true);
    }
  }, [data, error]);

  return (
    <>
      <button
        className="w-full flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-400 hover:text-white hover:bg-gray-800"
        onClick={() => setShowTicketModal(true)}
      >
        <TicketIcon className="h-6 w-6 shrink-0" />
        <span>Report Issue</span>
      </button>
      <dialog className="modal" open={showTicketModal}>
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Report an issue to Apolla.io</h3>

          {/* title */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </div>

          {/* description */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </div>

          {/* buttons */}
          <div className="modal-action flex justify-between">
            <button
              className="btn"
              onClick={() => {
                setTitle("");
                setDescription("");
                setShowTicketModal(false);
              }}
            >
              Close
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                trigger({
                  title,
                  description,
                });
                setTitle("");
                setDescription("");
                setShowTicketModal(false);
              }}
            >
              Send
            </button>
          </div>
        </form>
      </dialog>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        message={message}
      />
    </>
  );
}
