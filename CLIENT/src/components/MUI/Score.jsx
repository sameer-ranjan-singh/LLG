import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 210,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Score({score , maxScore, HandleOnClick}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button 
       variant={"contained"}
       size='large'
       fullWidth={true}
       style={{
            display:"flex",
            justifyContent:"center",
            letterSpacing:4,
            alignItem:"center",
            fontWeight:"bold",
            boxShadow: "0px 5px 10px var(--grey-color)",
            }}
        onClick={()=>{
          handleOpen()
          // navigate("/updateProgress/"+ progressId)
        }
        }>Check Score !
      </Button>
      <Modal
      width={"210px"}
        aria-labelledby="transition-modal-title" 
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2" style={{backgroundColor:"#ff042e",padding:5}}>
              You are doing Great !
            </Typography>
            <Typography id="transition-modal-description" variant="h4" fontWeight={"bold"} sx={{ m: 2 }}>
              Score : {score}/{maxScore}
            </Typography>
            <Button onClick={()=>{HandleOnClick}} variant='contained'>Start Next Challenge</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}