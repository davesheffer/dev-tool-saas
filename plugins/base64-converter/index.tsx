"use client";

import { useState, useEffect } from "react";

export default function Base64Converter() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState<"encode" | "decode">("encode");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setError(null);
        if (!input) {
            setOutput("");
            return;
        }

        try {
            if (mode === "encode") {
                setOutput(btoa(input));
            } else {
                setOutput(atob(input));
            }
        } catch (e) {
            setError("Invalid input for " + mode);
            setOutput("");
        }
    }, [input, mode]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-100">Base64 Converter</h2>
                <div className="flex space-x-2 bg-gray-800 p-1 rounded-lg">
                    <button
                        onClick={() => setMode("encode")}
                        className={`px-3 py-1 text-sm rounded-md transition-colors ${mode === "encode"
                            ? "bg-blue-600 text-white"
                            : "text-gray-400 hover:text-white"
                            }`}
                    >
                        Encode
                    </button>
                    <button
                        onClick={() => setMode("decode")}
                        className={`px-3 py-1 text-sm rounded-md transition-colors ${mode === "decode"
                            ? "bg-blue-600 text-white"
                            : "text-gray-400 hover:text-white"
                            }`}
                    >
                        Decode
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-400">
                        Input
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full h-64 bg-gray-900 border border-gray-700 rounded-lg p-4 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none font-mono text-sm"
                        placeholder={
                            mode === "encode"
                                ? "Type text to encode..."
                                : "Paste Base64 to decode..."
                        }
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-400">
                        Output
                    </label>
                    <div className="relative">
                        <textarea
                            readOnly
                            value={error || output}
                            className={`w-full h-64 bg-gray-900 border rounded-lg p-4 focus:ring-2 focus:border-transparent outline-none resize-none font-mono text-sm ${error
                                ? "border-red-500 text-red-500 focus:ring-red-500"
                                : "border-gray-700 text-gray-100 focus:ring-blue-500"
                                }`}
                            placeholder="Result will appear here..."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
