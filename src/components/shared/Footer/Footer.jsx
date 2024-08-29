import Link from "next/link";

const data = {
  year: 2024,
  companyName: "Made with Love by Alessandrovaru",
  links: [
    { text: "Terms of Service", href: "#" },
    { text: "Privacy", href: "#" }
  ]
};

export const Footer = async () => {
  const { year, companyName, links } = data;

  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t h-[10dvh]">
      <p className="text-xs text-gray-500">© {year} {companyName}. All rights reserved.</p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        {links.map((link, index) => (
          <Link key={index} className="text-xs hover:underline underline-offset-4" href={link.href}>
            {link.text}
          </Link>
        ))}
      </nav>
    </footer>
  );
};