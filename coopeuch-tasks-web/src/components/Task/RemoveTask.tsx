import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import taskApi from "../../api/task.api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { resetTaskSuccess } from "../../redux/slices/task.slice";
import { white } from "../../theme";

const RemoveTask = ({ id, description, onTaskRemoved }: { id: number, description: string, onTaskRemoved: () => void }) => {

  const task = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const remove = () => {
    dispatch(taskApi.remove(id));
  }

  useEffect(() => {
    return () => {
      if (task.success) {
        dispatch(resetTaskSuccess());
        handleClose();
        onTaskRemoved();
      }
    };
  }, [dispatch, task.success]);

  return (
    <>

      <IconButton
        size="small"
        color="error"

        title="Borrar"
        onClick={() => handleClickOpen()}
      >
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`¿Eliminar tarea ${description}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ color: white }}>
            No podrá recuperarse despues de ser eliminada.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: white }}>Cerrar</Button>
          <Button onClick={remove} autoFocus color='error'>
            eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RemoveTask;