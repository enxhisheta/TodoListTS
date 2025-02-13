interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export { Button };
