import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { useSocket } from "../Context/Socket";
import Prism from "prismjs";
import ChatLoading from "../UI/ChatLoading";
import { toast } from "react-toastify";
import rehypeRaw from "rehype-raw";

const ChatContent = () => {
  const { message } = useSocket();
  const chatEndRef = useRef(null);
  // ! use prism js for synatx highlighting
  useEffect(() => {
    setTimeout(() => {
      Prism.highlightAll(); // Apply syntax highlighting
    }, 0);

    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  // ! copy code

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      toast.success("Copied Code");
    });
  };

  return (
    <div className="h-full cc w-full mt-5">
      <div className="container h-full overflow-y-auto w-full flex flex-col gap-5">
        {message?.map((cur, id) => {
          return (
            <div key={id} className="flex flex-col gap-5">
              <div className="ai flex justify-end">
                <div className="bg-gray-100 text-black py-2 rounded-xl px-5">
                  {cur.question}
                </div>
              </div>

              <div className="user flex justify-center">
                
                <div className="w-full py-4 p-2 text-black">
                  {cur.answer === "Loading..." ? ( 
                    <ChatLoading />
                  ) : (
                    <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      code({ inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <div className="relative">
                            <button
                              className="absolute top-2 right-2 bg-gray-200 text-black text-xs px-4 py-1 rounded"
                              onClick={() => copyToClipboard(children)}
                            >
                              Copy
                            </button>
                            <pre className={className} {...props}>
                              <code className={className}>{children}</code>
                            </pre>
                          </div>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                      img: ({ node, ...props }) => (
                        <img className="max-w-full h-auto rounded-xl mt-4" {...props} />
                      ),
                    }}
                  >
                    {cur.answer}
                  </ReactMarkdown>
                  
                  
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>
    </div>
  );
};

export default ChatContent;
