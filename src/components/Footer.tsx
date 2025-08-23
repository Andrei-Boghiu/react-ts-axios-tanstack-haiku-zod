import { Link, useLocation } from "react-router-dom";
import { humanizeFieldName } from "../utils/humanizeFieldName.util";

const links = {
  info: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Pricing", href: "/pricing" },
  ],
  technical: [
    { label: "Documentation", href: "/docs" },
    { label: "API Reference", href: "/api-docs" },
    { label: "Developer Tools", href: "/tools" },
  ],
  followUs: [
    { label: "Twitter", href: "https://twitter.com/example" },
    { label: "LinkedIn", href: "https://linkedin.com/company/example" },
    { label: "GitHub", href: "https://github.com/example" },
  ],
};

const blacklist = ["/login", "/register"];

export default function Footer() {
  const { pathname } = useLocation();

  if (blacklist.includes(pathname)) return null;

  return (
    <footer className="footer">
      <div>
        <p className="text-center">© {new Date().getFullYear()} MyApp. No rights reserved, only beer reserved.</p>
      </div>

      <nav className="footer-links">
        {(Object.keys(links) as Array<keyof typeof links>).map((category) => (
          <div key={category}>
            <h4>{humanizeFieldName(category)}</h4>
            {links[category].map(({ label, href }) => (
              <Link key={label} to={href} className="block">
                {label}
              </Link>
            ))}
          </div>
        ))}
      </nav>
    </footer>
  );
}
