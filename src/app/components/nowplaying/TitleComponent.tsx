export const TitleComponent = ({ title }: ITitleComponent) => {
  return <>{title}</>;
};

interface ITitleComponent {
  title: string;
}
