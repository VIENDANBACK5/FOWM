import { useState } from 'react'

import Header from './components/Header/Header.jsx'
import ThemeSwitch from './components/Controllers/Theme/ThemeSwitch.jsx'
import Layout from './components/Layouts/Layout.jsx'
import './index.css';
import { transform } from 'framer-motion';


function App() {
  return (
    <>
    <div>
      <img src="ai-generated-8991813_1920.jpg" alt="yhythythyt" />
      <img src="ai-generated-8991813_1920.jpg" alt="" 
      style={{
        perspective: "20px",
        transformStyle: "preserve-3d",
        transform: "translateZ(-10px) scale(1.)",
        transform: "translateZ(-10px)"  
      }}
      />
    </div>
    <div>
      <table
          style={{
            width: "100%",
            height: "auto",
            border: "none",
            borderCollapse: "collapse",
            tableLayout: "fixed",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  border: "none",
                  padding: "0px",
                  textAlign: "center",
                }}
              >
                <Header/>
              </th>
              <th style={{
                width: "20%", // Chiều rộng của ô
                height: "200px", // Chiều cao của ô
                textAlign: "center", // Căn giữa theo chiều ngang
                verticalAlign: "middle", // Căn giữa theo chiều dọc
                backgroundColor: "transparent", // Màu nền (nếu cần)
                padding: "0px", // Khoảng cách giữa nội dung và viền ô
                border: "none", // Viền ô (tuỳ chọn)
              }}>
                <Layout/>
                <ThemeSwitch/>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div>
        <h1>Bảng Full Chiều Ngang Màn Hình</h1>
        <table
          style={{
            width: "100%",
            height: "auto",
            border: "none",
            borderCollapse: "collapse",
            tableLayout: "fixed",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  border: "none",
                  textAlign: "center",
                }}
              >
                <img
                  src="https://placehold.co/600x400/red/blue/?text=Hello+World"
                  alt="Placeholder"
                  style={{ width: "100%", height: "auto" }}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{
                  border: "none",
                  padding: "0px",
                  textAlign: "center",
                }}
              >
                <img
                  src="https://placehold.co/600x400/red/blue/?text=Hello+World"
                  alt="Placeholder"
                  style={{ width: "100%", height: "auto" }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
