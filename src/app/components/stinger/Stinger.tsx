import { IStinger } from "@/app/models/IStinger";
import "./Stinger.css";
export const Stinger = ({ options }: IStingerProps) => {
  return (
    <div className="container-fluid stinger" style={{ backgroundImage: `url('${options.url}')` }}>
      <h2>{options.title}</h2>
      <h3>{options.subtitle}</h3>
    </div>
  );
};

interface IStingerProps {
  options: IStinger;
}
