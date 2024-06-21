interface ICard extends React.HTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
  bgColor?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}
