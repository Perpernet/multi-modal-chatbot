"use client";

import { useState, useRef } from "react";
import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 p-4">
      <h1 className="text-6xl font-extrabold text-center text-white mb-8 mt-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
          Perper.net
        </span>
      </h1>

      <div className="w-full max-w-2xl bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white border-opacity-20">
        <div className="h-[calc(100vh-300px)] overflow-y-auto p-6 space-y-6">
          {messages.map((m) => (
            <div key={m.id}>
              <p>{m.content}</p>
              {m.experimental_attachments
                ?.filter((attachment) => attachment?.contentType?.startsWith("image/"))
                .map((attachment, index) => (
                  <img
                    key={`${m.id}-${index}`}
                    src={attachment.url}
                    width={500}
                    alt={attachment.name}
                  />
                ))}
            </div>
          ))}
        </div>

        <form
          className="p-4 border-t border-white border-opacity-20"
          onSubmit={(event) => {
            handleSubmit(event, {
              experimental_attachments: files,
            });
            setFiles(undefined);
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          }}
        >
          <input
            type="file"
            className="mb-2"
            onChange={(event) => {
              if (event.target.files) {
                setFiles(event.target.files);
              }
            }}
            multiple
            ref={fileInputRef}
          />
          <input
            className="w-full p-2 text-black bg-white bg-opacity-70 rounded"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
          <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Send</button>
        </form>
      </div>
    </div>
  );
}