import { ShowEditForm } from "./showeditform";

export default async function AdminSingleShow({ params }: { params: Promise<{ showID: string }> }) {
  const showID = (await params).showID == "new" ? null : (await params).showID;

  return (
    <div className="container">
      <ShowEditForm showID={showID} />
    </div>
  );
}
