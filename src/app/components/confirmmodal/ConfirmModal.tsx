import "./ConfirmModal.scss";

interface IConfirmModal {
  confirm: () => void;
  cancel: () => void;
  status?: "error" | "loading" | "success";
  title: string;
  description: string;
}

export const ConfirmModal = (props: IConfirmModal) => {
  return (
    <div className="custom-modal-container">
      <div className="confirm-modal">
        <h5>{props.title}</h5>
        <p>{props.description}</p>
        {props.status && props.status == "error" && <div className="alert alert-danger">Impossibile eseguire l&apos;operazione</div>}
        <div className="custom-modal-btns">
          <button type="button" onClick={props.cancel}>
            Annulla
          </button>
          <button type="button" onClick={props.confirm} disabled={props.status == "loading" ? true : false}>
            {props.status == "loading" ? <span className="spinner-border spinner-border-sm" aria-hidden="true"></span> : "Conferma"}
          </button>
        </div>
      </div>
    </div>
  );
};
