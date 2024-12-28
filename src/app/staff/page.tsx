import { ArtistCard } from "../components/artistcard/ArtistCard";
import { Stinger } from "../components/stinger/Stinger";
import { StaffService } from "../utils/staff.service";

export default async function Staff() {
  const staff = await StaffService.instance.getAllStaff();

  const stingerOptions = {
    url: "",
    title: "Il nostro staff al completo",
    subtitle: "Seguici",
  };

  return (
    <>
      <div className="container mt-2" style={{ marginBottom: "6rem" }}>
        <Stinger options={stingerOptions} />
      </div>
      <div className="container my-5 d-flex justify-content-center gap-3 flex-wrap">
        {staff.map((el, i) => (
          <ArtistCard artist={el} key={`staff-${i}`} />
        ))}
      </div>
    </>
  );
}
