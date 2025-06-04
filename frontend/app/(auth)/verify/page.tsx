"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { axiosInstance } from "@/utils/axiosIntance";

export default function VerificationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");
  const [status, setStatus] = useState<
    "idle" | "verifying" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string>("");
  console.log(token, "toke");
  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Verification token is missing.");
      return;
    }

    async function verifyToken() {
      setStatus("verifying");
      try {
        const res = await axiosInstance.post("/verify", { token });
        if (res.data.success) {
          setStatus("success");
          setMessage("Your email has been successfully verified!");
          setTimeout(() => router.push("/login"), 3000);
        } else {
          setStatus("error");
          setMessage(res.data.message || "Verification failed.");
        }
      } catch (error: any) {
        setStatus("error");
        setMessage(
          error?.response?.data?.message ||
            "An error occurred during verification."
        );
      }
    }

    verifyToken();
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-4">
      <div className="bg-white rounded-lg shadow-md max-w-md w-full p-6 text-center">
        {status === "idle" && (
          <p className="text-gray-700">Waiting for verification...</p>
        )}
        {status === "verifying" && (
          <p className="text-blue-600 font-semibold">Verifying your email...</p>
        )}
        {status === "success" && (
          <div>
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Verified!</h2>
            <p className="text-gray-700">{message}</p>
            <p className="mt-4 text-sm text-gray-500">
              Redirecting to login...
            </p>
          </div>
        )}
        {status === "error" && (
          <div>
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Verification Failed
            </h2>
            <p className="text-gray-700">{message}</p>
            <button
              onClick={() => router.push("/signup")}
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Try Signing Up Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
