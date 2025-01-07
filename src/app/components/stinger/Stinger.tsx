import { IStinger } from "@/app/models/IStinger";
import "./Stinger.scss";
export const Stinger = ({ options }: IStingerProps) => {
  return (
    <div
      className="container-fluid stinger"
      style={options.url ? { backgroundImage: `url('${options.url}')` } : { height: "unset", marginBlock: "unset", background: "transparent" }}
    >
      <h2>{options.title}</h2>
      <h3>{options.subtitle}</h3>
    </div>
  );
};

interface IStingerProps {
  options: IStinger;
}
