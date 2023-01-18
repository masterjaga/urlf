import React from "react";

function Nav() {
  return (
    <div>
      <nav className="nav">
        <div className="nav-container">
          <div className="navbar-brand">URL Shortener</div>
          <div className="nav-secondary">
            <a
              href="/instagram/user/accounts/my_accounts/email/login"
              onClick={() => window.localStorage.clear()}
              className="nav-link"
            >
              LogOut
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
