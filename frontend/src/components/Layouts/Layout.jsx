import React from "react";

export default function App() {
  return (
    <div className="min-h-screen flex flex-row bg-orange-50">
      {/* Sidebar */}
      <aside className="w-16 md:w-20 lg:w-24 bg-white shadow-lg flex flex-col items-center py-4">
        <button className="my-4">🏠</button>
        <button className="my-4">❤️</button>
        <button className="my-4">🛒</button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white shadow">
          <input
            type="text"
            placeholder="What would you like to eat?"
            className="w-full max-w-md px-4 py-2 border rounded-lg"
          />
          <button className="ml-4">☰</button>
        </header>

        {/* Main Section */}
        <main className="flex flex-1 flex-row p-4 gap-4">
          {/* Banner */}
          <section className="w-full lg:w-2/3 bg-orange-500 text-white p-6 rounded-lg shadow">
            <h1 className="text-3xl font-bold mb-2">30% Off Fitness Meal</h1>
            <p>Order now and enjoy a healthy lifestyle!</p>
          </section>

          {/* Cart Section */}
          <aside className="hidden lg:block w-1/3 bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">My Orders</h2>
            <div className="flex justify-between items-center mb-2">
              <div>
                <p>Burger Mozza XL</p>
                <small>Extra cheese</small>
              </div>
              <p>$39</p>
            </div>
            <div className="border-t mt-4 pt-4">
              <p className="flex justify-between">
                <span>Subtotal</span> <span>$162</span>
              </p>
              <p className="flex justify-between">
                <span>Delivery Fee</span> <span>$9</span>
              </p>
              <button className="w-full mt-4 bg-orange-500 text-white py-2 rounded">
                Check Out
              </button>
            </div>
          </aside>
        </main>

        {/* Products Section */}
        <section className="p-4">
        <ul className="menu bg-base-200 lg:menu-horizontal rounded-box">
  <li>
    <a>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
      Inbox
      <span className="badge badge-sm">99+</span>
    </a>
  </li>
  <li>
    <a>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Updates
      <span className="badge badge-sm badge-warning">NEW</span>
    </a>
  </li>
  <li>
    <a>
      Stats
      <span className="badge badge-xs badge-info"></span>
    </a>
  </li>
</ul>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Product Card */}
            <div className="bg-white rounded-lg shadow p-4">
              <img
                src="https://via.placeholder.com/150"
                alt="Product"
                className="w-full h-32 object-cover rounded-lg"
              />
              <h3 className="text-lg font-bold mt-2">Burger Mozza XL</h3>
              <p className="text-orange-500 font-bold">$39</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
