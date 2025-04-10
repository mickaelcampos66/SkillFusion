type IconsProps = React.HTMLAttributes<SVGElement>

export const Icons = {
  menu: (props: IconsProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="size-8"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 9h16.5m-16.5 6.75h16.5"
      />
      <title>Ouvrir/Fermer le menu</title>
    </svg>
  ),
}
