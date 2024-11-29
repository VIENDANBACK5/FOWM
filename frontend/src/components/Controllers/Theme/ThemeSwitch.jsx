import React, { useState, useEffect } from 'react';
import "./ThemeSwitch.css";



function ThemeSwitch() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'default');

  useEffect(() => {
    document.documentElement.classList.remove('default', 'retro', 'cyberpunk', 'valentine', 'aqua');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme); // Lưu theme vào localStorage
  }, [theme]);

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  return (
    <div>
      <div className="form-control">
        <label className="label cursor-pointer gap-4">
          <span className="label-text">Default</span>
          <input
            type="radio"
            name="theme-radios"
            className="radio theme-controller"
            value="default"
            checked={theme === 'default'}
            onChange={handleThemeChange}
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer gap-4">
          <span className="label-text">Retro</span>
          <input
            type="radio"
            name="theme-radios"
            className="radio theme-controller"
            value="retro"
            checked={theme === 'retro'}
            onChange={handleThemeChange}
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer gap-4">
          <span className="label-text">Cyberpunk</span>
          <input
            type="radio"
            name="theme-radios"
            className="radio theme-controller"
            value="cyberpunk"
            checked={theme === 'cyberpunk'}
            onChange={handleThemeChange}
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer gap-4">
          <span className="label-text">Valentine</span>
          <input
            type="radio"
            name="theme-radios"
            className="radio theme-controller"
            value="valentine"
            checked={theme === 'valentine'}
            onChange={handleThemeChange}
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer gap-4">
          <span className="label-text">Aqua</span>
          <input
            type="radio"
            name="theme-radios"
            className="radio theme-controller"
            value="aqua"
            checked={theme === 'aqua'}
            onChange={handleThemeChange}
          />
        </label>
        <label className="swap text-6xl">
  <div className="swap-on">🥵</div>
  <div className="swap-off">🥶</div>
</label>
<label className="swap swap-active text-6xl">
  <div className="swap-on">🥳</div>
  <div className="swap-off">😭</div>
</label>
      </div>
    </div>
  );
}

export default ThemeSwitch;
