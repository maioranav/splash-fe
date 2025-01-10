import { StaffEditForm } from "./staffeditform";

export default async function AdminSingleStaff({ params }: { params: Promise<{ staffID: string }> }) {
  const staffID = (await params).staffID == "new" ? null : (await params).staffID;

  return (
    <div className="container">
      <StaffEditForm staffID={staffID} />
    </div>
  );
}
