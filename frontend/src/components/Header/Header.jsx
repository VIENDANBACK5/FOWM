import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">
      {/* Header */}
      <header className="bg-blue-500 text-white p-4 text-center text-lg sm:text-xl md:text-2xl">
        Responsive Web Header
      </header>

      {/* Hero Section */}
      <section className="flex flex-col sm:flex-row items-center justify-between p-6">
        <div className="text-center sm:text-left sm:w-1/2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Welcome to Quan An -------------------------------------------------------
          </h1>
          <p className="text-base sm:text-lg md:text-xl">
            Build responsive layouts effortlessly using Tailwind CSS and React.- gioi thieue hay loi chao
          </p>
        </div>
        <div className="sm:w-1/2">
          <img
            src="https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1uTZbS.img?w=720&h=480&m=6"
            alt="Responsive example"
            className="rounded-lg w-full max-w-md mx-auto sm:mx-0"
          />
        </div>
      </section>

      {/* Main Content */}
      <main className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Feature 1</h2>
          <p className="text-sm">
            ----------------------------------------------------This is a brief description of the first feature.
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Feature 2</h2>
          <p className="text-sm">
            -----------------------------------------------------This is a brief description of the second feature.
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Feature 3</h2>
          <p className="text-sm">
            --------------------------------------
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-500 text-white text-center p-4 text-sm">
        &copy; 2024 Your Company. All Rights Reserved.
      </footer>
    </div>
  );
}
