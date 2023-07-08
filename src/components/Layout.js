import React from "react";

function Layout({ children }) {
  return (
    <div>
      <div className="header">
        <h1>Expense Tracker</h1>
      </div>

      <div className="main">
        <div className="container">{children}</div>
      </div>

      <div className="footer">&copy;Samiul Islam Shibly</div>
    </div>
  );
}

export default Layout;
