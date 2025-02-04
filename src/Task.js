import React, { useEffect, useState } from "react";
import { Layout, Input, Button } from "antd";
import "animate.css";
import "./Task.css";

const { Header, Content } = Layout;

const Task = () => {
  const [overlayActive, setOverlayActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = async () => {
    const input = document.querySelector(".styled-input").value;

    try {
      const response = await fetch("http://localhost:8000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: input }),
      });

      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const inputBox = document.querySelector(".styled-input");
    const button = document.querySelector(".animated-btn");

    if (inputBox) {
      inputBox.addEventListener("focus", () => setOverlayActive(true));
      inputBox.addEventListener("blur", () => setOverlayActive(false));
    }

    if (button) {
      button.addEventListener("click", () => {
        button.classList.add("clicked");
        setTimeout(() => button.classList.remove("clicked"), 500);
      });
    }

    return () => {
      if (inputBox) {
        inputBox.removeEventListener("focus", () => setOverlayActive(true));
        inputBox.removeEventListener("blur", () => setOverlayActive(false));
      }
      if (button) {
        button.removeEventListener("click", () => {});
      }
    };
  }, []);

  return (
    <Layout className={`dark-theme ${overlayActive ? "overlay-active" : ""}`}>
      {/* Navbar */}
      <Header className="navbar animate__fadeInDown">
        <div className="logo">Logo</div>
      </Header>

      {/* Input & Button Section */}
      <Content className="content">
        <div className="input-container animate__animated animate__zoomIn">
          <Input
            placeholder="Enter your text..."
            className="styled-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            onClick={handleSubmit}
            type="primary"
            className="animated-btn"
          >
            Submit
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default Task;
