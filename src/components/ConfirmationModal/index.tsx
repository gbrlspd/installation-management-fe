import { Modal, Button } from 'react-bootstrap';

type ConfirmModalProps = {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ConfirmationModal(props: ConfirmModalProps) {
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
