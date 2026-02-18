"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4 !== 0) {
    base64 += "=";
  }
  try {
    return atob(base64);
  } catch {
    throw new Error("Invalid Base64 string");
  }
}

interface DecodedJWT {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
}

function decodeJWT(token: string): DecodedJWT {
  const parts = token.trim().split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid JWT: must have 3 parts separated by dots");
  }
  const header = JSON.parse(base64UrlDecode(parts[0]));
  const payload = JSON.parse(base64UrlDecode(parts[1]));
  const signature = parts[2];
  return { header, payload, signature };
}

function formatTimestamp(value: unknown): string | null {
  if (typeof value !== "number") return null;
  const date = new Date(value * 1000);
  if (isNaN(date.getTime())) return null;
  return date.toLocaleString();
}

function hasTimestamps(payload: Record<string, unknown>): boolean {
  return (
    typeof payload.iat === "number" ||
    typeof payload.exp === "number" ||
    typeof payload.nbf === "number"
  );
}

export default function JwtDecoder() {
  const [input, setInput] = useState("");
  const [decoded, setDecoded] = useState<DecodedJWT | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleDecode() {
    try {
      const result = decodeJWT(input);
      setDecoded(result);
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      setDecoded(null);
    }
  }

  function clear() {
    setInput("");
    setDecoded(null);
    setError(null);
  }

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="space-y-2">
        <Label htmlFor="jwt-input">JWT Token</Label>
        <Textarea
          id="jwt-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0..."
          className="h-32 bg-zinc-900 border-zinc-800 text-zinc-200 placeholder:text-zinc-600"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button onClick={handleDecode}>Decode</Button>
        <Button variant="ghost" onClick={clear}>
          Clear
        </Button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-950/40 border border-red-500/20 rounded-lg p-3 text-sm text-red-400">
          <span className="font-semibold">Error:</span> {error}
        </div>
      )}

      {/* Decoded output */}
      {decoded && (
        <Tabs defaultValue="header" className="w-full">
          <TabsList>
            <TabsTrigger value="header">Header</TabsTrigger>
            <TabsTrigger value="payload">Payload</TabsTrigger>
            <TabsTrigger value="signature">Signature</TabsTrigger>
          </TabsList>

          <TabsContent value="header">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Header
                  <Badge variant="info">JOSE</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="max-h-80">
                  <pre className="text-sm font-mono text-zinc-200 whitespace-pre-wrap">
                    {JSON.stringify(decoded.header, null, 2)}
                  </pre>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payload">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Payload
                  {typeof decoded.payload.exp === "number" &&
                    decoded.payload.exp * 1000 < Date.now() && (
                      <Badge variant="destructive">EXPIRED</Badge>
                    )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ScrollArea className="max-h-80">
                  <pre className="text-sm font-mono text-zinc-200 whitespace-pre-wrap">
                    {JSON.stringify(decoded.payload, null, 2)}
                  </pre>
                </ScrollArea>

                {/* Timestamps */}
                {hasTimestamps(decoded.payload) && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <h4 className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">
                        Timestamps
                      </h4>
                      <div className="text-sm space-y-1">
                        {typeof decoded.payload.iat === "number" && (
                          <p className="text-zinc-300">
                            <span className="text-zinc-500">Issued At (iat):</span>{" "}
                            {formatTimestamp(decoded.payload.iat)}
                          </p>
                        )}
                        {typeof decoded.payload.exp === "number" && (
                          <p className="text-zinc-300">
                            <span className="text-zinc-500">Expires (exp):</span>{" "}
                            {formatTimestamp(decoded.payload.exp)}
                            {decoded.payload.exp * 1000 < Date.now() && (
                              <Badge variant="destructive" className="ml-2">
                                EXPIRED
                              </Badge>
                            )}
                          </p>
                        )}
                        {typeof decoded.payload.nbf === "number" && (
                          <p className="text-zinc-300">
                            <span className="text-zinc-500">Not Before (nbf):</span>{" "}
                            {formatTimestamp(decoded.payload.nbf)}
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signature">
            <Card>
              <CardHeader>
                <CardTitle>Signature</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm font-mono text-zinc-400 break-all bg-zinc-900 rounded-lg p-4 border border-zinc-800">
                  {decoded.signature}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
