import { Modal, Button } from 'react-bootstrap';

type DeleteModalProps = {
  show: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export default function DeleteModal(props: DeleteModalProps) {
  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header>
        <Modal.Title>
          Deletion Confirmation
          <i aria-hidden={true} className='fas fa-exclamation-triangle ms-2'></i>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={props.onClose}>
          Cancel
        </Button>
        <Button variant='danger' onClick={props.onConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
