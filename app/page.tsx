"use client";

import { Html5QrcodeResult, Html5QrcodeScanner } from "html5-qrcode";
import { Html5QrcodeError } from "html5-qrcode/esm/core";
import { useState } from "react";

export default function Home() {
  const [qrtext, setQrtext] = useState("");
  const [qrerror, setQrerror] = useState("");

  const onScanSuccess = (
    decodedText: string,
    decodedResult: Html5QrcodeResult
  ) => {
    // handle the scanned code as you like, for example:
    console.log(`Code matched = ${decodedText}`, decodedResult);
    setQrtext(decodedText);
    setQrerror("");
  };

  const onScanFailure = (errorMessage: string, error: Html5QrcodeError) => {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${errorMessage}`);
    setQrtext("");
    setQrerror(errorMessage);
  };

  const startScan = () => {
    setQrtext("");
    setQrerror("");
    let html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
  };

  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-between py-24 px-2">
      <button onClick={startScan} className="border border-black p-2">
        click to scan
      </button>
      <div id="reader" className="w-full"></div>
      <div className="w-full">
        <p className="text-black text-base">{"result: " + qrtext}</p>
        <p className="text-red-500 text-base">{"error: " + qrerror}</p>
      </div>
    </main>
  );
}
