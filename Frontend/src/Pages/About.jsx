import React from "react";
import Header_p from "../UI/Header_p";

const About = () => {
  return (
    <div className="min-h-[100dvh] w-screen cc">
      <div className="mobile_Screen md:border md:rounded-md cc overflow-hidden">
        <div className="h-full overflow-hidden cc w-full">
          <div className="container h-full">
            <Header_p text="About Qubiko AI" logo={false} />
            <div className="w-full space-y-4 overflow-auto h-full pb-[7rem] ">
              {/* Intro Section */}
              <section className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-primary">
                  Meet Qubiko AI — Your Intelligent Digital Assistant
                </h2>
                <p className="text-base leading-relaxed">
                  <strong>Author:</strong> Akash Biswas
                </p>
                <p className="text-base leading-relaxed">
                  <strong>Qubiko AI</strong> is a next-generation,
                  production-ready full-stack AI assistant built for
                  performance, intelligence, and real-world usability. It helps
                  users accomplish complex tasks by delivering accurate and
                  lightning-fast responses powered by AI and real-time systems.
                  Whether you're asking questions, automating workflows, or
                  managing tools — Qubiko has you covered.
                </p>
              </section>

              {/* How It Helps Users */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">
                  🌟 How Qubiko Helps You
                </h3>
                <ul className="space-y-4 text-base break-words">
                  <li>
                    <p className="font-semibold">Fast, Real-time Answers:</p>
                    <p>
                      Get intelligent replies instantly via WebSocket
                      (Socket.io) — no delays, no lags.
                    </p>
                  </li>
                  <li>
                    <p className="font-semibold">AI-Powered Thinking:</p>
                    <p>
                      Uses the latest Google Gemini LLM and LangChain for
                      reasoning, tool use, and natural language understanding.
                    </p>
                  </li>
                  <li>
                    <p className="font-semibold">
                      Context-Aware Conversations:
                    </p>
                    <p>
                      Qubiko remembers context, meaning it can follow up and
                      handle multi-step tasks seamlessly.
                    </p>
                  </li>
                  <li>
                    <p className="font-semibold">Secure & Personal:</p>
                    <p>
                      Built with JWT authentication, secure flows, and OTP-based
                      password resets to protect user data.
                    </p>
                  </li>
                  <li>
                    <p className="font-semibold">Accessible Everywhere:</p>
                    <p>
                      Fully responsive design that works flawlessly across
                      desktops, tablets, and smartphones.
                    </p>
                  </li>
                  <li>
                    <p className="font-semibold">For Developers & Users:</p>
                    <p>
                      Whether you're building with APIs or just chatting —
                      Qubiko is your intelligent co-pilot.
                    </p>
                  </li>
                </ul>
              </section>

              {/* Key Features */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">
                  🚀 Key Features
                </h3>
                <ul className="space-y-4 text-base break-words">
                  <li>
                    <p className="font-semibold">Real-time Communication:</p>
                    <p>
                      Bi-directional messaging with Socket.io ensures instant
                      response and event handling.
                    </p>
                  </li>
                  <li>
                    <p className="font-semibold">AI Tool Calling:</p>
                    <p>
                      Uses LangChain with Google Gemini API to call external
                      tools for more powerful automation.
                    </p>
                  </li>
                  <li>
                    <p className="font-semibold">Conversation Memory:</p>
                    <p>
                      Maintains session context for multi-turn tasks and deeper
                      understanding.
                    </p>
                  </li>
                  <li>
                    <p className="font-semibold">Secure Authentication:</p>
                    <p>
                      Robust JWT login and OTP-based password reset for complete
                      user security.
                    </p>
                  </li>
                  <li>
                    <p className="font-semibold">Clean UI & UX:</p>
                    <p>
                      Modern responsive interface using Tailwind CSS for smooth
                      and accessible design.
                    </p>
                  </li>
                  <li>
                    <p className="font-semibold">Media Support:</p>
                    <p>
                      Image uploads and hosting managed through Cloudinary with
                      seamless integration.
                    </p>
                  </li>
                  <li>
                    <p className="font-semibold">Scalable & Modular Code:</p>
                    <p>
                      Clean folder structure and error handling, built for
                      scaling in production.
                    </p>
                  </li>
                  <li>
                    <p className="font-semibold">Deployed & Live:</p>
                    <p>
                      Frontend on Vercel and Backend on Render — real-time,
                      always available.
                    </p>
                  </li>
                </ul>
              </section>

              {/* Tech Stack */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">
                  🧠 Tech Stack
                </h3>
                <ul className="space-y-4 text-base break-words">
                  <li>
                    <p className="font-semibold">Frontend:</p>
                    <p>React.js, Tailwind CSS for sleek, responsive UI.</p>
                  </li>
                  <li>
                    <p className="font-semibold">Backend:</p>
                    <p>
                      Node.js with Express.js for scalable REST APIs and
                      WebSocket handling.
                    </p>
                  </li>
                  <li>
                    <p className="font-semibold">AI Integration:</p>
                    <p>
                      Google Gemini API and LangChain for natural language
                      reasoning and tool usage.
                    </p>
                  </li>
                  <li>
                    <p className="font-semibold">Real-Time Engine:</p>
                    <p>Socket.io for lightning-fast two-way communication.</p>
                  </li>
                  <li>
                    <p className="font-semibold">Authentication:</p>
                    <p>
                      JWT-based sessions and OTP system for password recovery.
                    </p>
                  </li>
                  <li>
                    <p className="font-semibold">Database:</p>
                    <p>MongoDB for flexible and scalable data storage.</p>
                  </li>
                  <li>
                    <p className="font-semibold">Media Management:</p>
                    <p>Cloudinary for image uploads and optimization.</p>
                  </li>
                  <li>
                    <p className="font-semibold">Deployment:</p>
                    <p>Vercel (Frontend) and Render (Backend).</p>
                  </li>
                  <li>
                    <p className="font-semibold">Version Control:</p>
                    <p>Git and GitHub for collaboration and code management.</p>
                  </li>
                </ul>
              </section>

              {/* Final Note */}
              <section className="space-y-4">
                <p className="text-base leading-relaxed">
                  Qubiko AI isn’t just another chatbot — it’s a scalable digital
                  assistant crafted to meet modern expectations of speed,
                  intelligence, and interactivity. Developed with real-world use
                  cases and production deployment in mind, Qubiko stands as a
                  bold statement in the world of intelligent assistants.
                </p>
                <p className="text-base leading-relaxed">
                  Designed and engineered by <strong>Akash Biswas</strong> with
                  industry-grade standards, Qubiko brings together real-time
                  systems, secure architecture, and deep AI integrations to
                  offer unmatched assistance.
                </p>
                <hr />
                <p className="text-sm italic text-gray-500 cc">
                  © {new Date().getFullYear()} Qubiko AI. Built with passion,
                  and purpose.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
