"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function format() {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }

  function minify() {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }

  function clear() {
    setInput("");
    setOutput("");
    setError(null);
    setCopied(false);
  }

  function copyOutput() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div className="space-y-6">
        <Tabs defaultValue="format" className="w-full">
          <TabsList>
            <TabsTrigger value="format">Format</TabsTrigger>
            <TabsTrigger value="minify">Minify</TabsTrigger>
          </TabsList>

          <TabsContent value="format">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input */}
              <div className="space-y-2">
                <Label htmlFor="json-input-fmt">Input JSON</Label>
                <Textarea
                  id="json-input-fmt"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder='{"key": "value"}'
                  className="h-80 bg-zinc-900 border-zinc-800 text-zinc-200 placeholder:text-zinc-600"
                />
              </div>

              {/* Output */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="json-output-fmt">Output</Label>
                  {output && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="link"
                          size="sm"
                          onClick={copyOutput}
                          className="text-xs"
                        >
                          {copied ? "Copied" : "Copy"}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Copy formatted JSON</TooltipContent>
                    </Tooltip>
                  )}
                </div>
                <ScrollArea className="h-80 rounded-lg border border-zinc-800 bg-zinc-900">
                  <Textarea
                    id="json-output-fmt"
                    value={output}
                    readOnly
                    placeholder="Formatted output will appear here..."
                    className="h-full min-h-80 border-0 text-emerald-400 bg-transparent placeholder:text-zinc-600 focus-visible:ring-0"
                  />
                </ScrollArea>
              </div>
            </div>

            <Separator className="my-4 bg-zinc-800" />

            <div className="flex gap-3">
              <Button onClick={format}>Format</Button>
              <Button variant="ghost" onClick={clear}>
                Clear
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="minify">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input */}
              <div className="space-y-2">
                <Label htmlFor="json-input-min">Input JSON</Label>
                <Textarea
                  id="json-input-min"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder='{"key": "value"}'
                  className="h-80 bg-zinc-900 border-zinc-800 text-zinc-200 placeholder:text-zinc-600"
                />
              </div>

              {/* Output */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="json-output-min">Output</Label>
                  {output && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="link"
                          size="sm"
                          onClick={copyOutput}
                          className="text-xs"
                        >
                          {copied ? "Copied" : "Copy"}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Copy minified JSON</TooltipContent>
                    </Tooltip>
                  )}
                </div>
                <ScrollArea className="h-80 rounded-lg border border-zinc-800 bg-zinc-900">
                  <Textarea
                    id="json-output-min"
                    value={output}
                    readOnly
                    placeholder="Minified output will appear here..."
                    className="h-full min-h-80 border-0 text-emerald-400 bg-transparent placeholder:text-zinc-600 focus-visible:ring-0"
                  />
                </ScrollArea>
              </div>
            </div>

            <Separator className="my-4 bg-zinc-800" />

            <div className="flex gap-3">
              <Button onClick={minify}>Minify</Button>
              <Button variant="ghost" onClick={clear}>
                Clear
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Error */}
        {error && (
          <div className="bg-red-950/40 border border-red-500/20 rounded-lg p-3 text-sm text-red-400">
            <span className="font-semibold">Error:</span> {error}
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
