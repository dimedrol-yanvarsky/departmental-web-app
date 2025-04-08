import React, { useEffect, useState } from 'react';
import cl from './Photogallery.module.css'
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Avatar from "@mui/material/Avatar";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import AlertMessage from '../../components/AlertMessage';
import Button from '@mui/material/Button';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import { styled } from '@mui/material/styles';
import PhotoComment from '../../components/PhotoComment';
import TextField from '@mui/material/TextField';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


function Photogallery({ comments, setComments, personalData, galleryPhotos, setGalleryPhotos, currentUser, isAuth}) {

  let [openAlert, setOpenAlert] = useState(false);
  
  let [bodyAlert, setBodyAlert] = useState('');

  let [typeAlert, setTypeAlert] = useState('');
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1100,
    // height: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    height: 830,
    overflowY: 'auto'
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  let [openModal, setOpenModal] = useState(false);

  let [modalPhoto, setModalPhoto] = useState('');

  let [modalComments, setModalComments] = useState([]);

  let [commentBody, setCommentBody] = useState('');

  let currentPhoto = (id) => {
    
    let currentItem = galleryPhotos.find( f => f.id === id);

    let currUser = personalData.find( f => f.id === currentItem.userID);

    let info = {
      surname: currUser.surname, name: currUser.name,
      avatar: currUser.avatar, photo: currentItem.img, 
      userid: currUser.id, photoid: currentItem.id
    }

    setModalPhoto(modalPhoto = info);

    comments.map( c => {

      if (c.photoID === id) {

        setModalComments(modalComments.push(c))

      }

      return c

    })


    console.log(comments)
    console.log(modalComments)
    if (modalComments.length === 0) { return false }

    let commentatorsID = []

    modalComments.map( c =>

      commentatorsID.push(c.userID)

    )

    commentatorsID.map( c => {

      let user = personalData.find( f => f.id === c);

      console.log('user', c)

      console.log('user',user)

      let comment = modalComments.find( f => f.userID === c);

      // let comment = modalComments.filter( f => f.userID === c);

      comment["name"] = user.name;
      
      comment["surname"] = user.surname;

      comment["avatar"] = user.avatar;

      return c

    }

    )

    setModalComments([...modalComments])

    console.log(comments)

    console.log(modalComments)

  }

  let viewComments = (id) => {

    modalComments = []

    console.log(modalComments)

    console.log(comments)

    comments.map( c => {

      if (c.photoID === id) {

        modalComments.push(c)

      }

      return c

    })

    if (modalComments.length === 0) { return false }


    console.log(modalComments)

    let commentatorsID = []

    modalComments.map( c =>

      commentatorsID.push(c.userID)

    )

    console.log(commentatorsID)

    commentatorsID.map( c => {

      let user = personalData.find( f => f.id === c);

      let comment = modalComments.find( f => f.userID === c);

      // let comment = modalComments.filter( f => f.userID === c);

      comment["name"] = user.name;
      
      comment["surname"] = user.surname;

      comment["avatar"] = user.avatar;

      return c

    })

    setModalComments([...modalComments])
    console.log(modalComments)

  }

  useEffect( () => { viewComments(modalPhoto.photoid) }, [comments] );

  let deletePhoto = (id) => {

    console.log( id )

    setGalleryPhotos( galleryPhotos.filter( f => f.id !== id) )

    setModalComments(modalComments = [])

  }

  let uploadPhoto = (file) => {

    setGalleryPhotos([...galleryPhotos, 
      {
        id: Date.now(),
        userID: currentUser.id,
        img: require(`./${file.name}`)
      }
    ]);

    setOpenAlert(true);

    setTypeAlert("success")

    setBodyAlert("Фотография добавлена!");

  }

  let createComment = (body) => {

    console.log(currentUser)

    let newComment = {

        id: Date.now(),
        userID: currentUser.id,
        photoID: modalPhoto.photoid,
        body: body

    }

    setComments( [...comments, newComment])

}

    return (
      <>
        <Box display="flex" alignItems="center" 
          justifyContent="space-between" sx={{  height: "100px"}}>
          <AlertMessage body={bodyAlert} openAlert={openAlert} setOpenAlert={setOpenAlert} type={typeAlert}/>
          {
            isAuth === true
            ?
              <Button 
                onChange={ e =>  
                  uploadPhoto(e.target.files[0]) 
                } 
                component="label"
                size="medium" variant="outlined" color="primary" 
                sx={{ textTransform: 'none', marginRight: "100px"}}
                endIcon={<AddAPhotoOutlinedIcon />} 
              >
                Добавить фото 
                <VisuallyHiddenInput type="file" />
              </Button>
            :
              <></>
          }
        </Box>
        <Box sx={{ width: 1750 }}>
          <Modal
            className={cl.modal}
            open={openModal}
            onClose={() => {setOpenModal(false); setModalPhoto(''); setModalComments([])}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Card>
                <CardMedia
                  className={cl.media}
                  // sx={{ height: 500 }}
                  image={modalPhoto.photo}
                  // title={modalPhoto.title}
                />
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-evenly">
                    <Box display="flex" alignItems="center" justifyContent="start"
                      flexDirection="row" gap={3}
                      sx={{ 
                        border: 'none', width: '100%'
                      }}
                    >
                      <Avatar
                        alt="Avatar"
                        src={modalPhoto.avatar}
                        sx={{ width: 45, height: 45 }}
                      />
                      <Typography sx={{ fontSize: "18px", fontWeight: 600}} variant="h6" component="div">
                        {modalPhoto.surname + " " +
                        modalPhoto.name}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="center" width="200px">
                      {
                        modalPhoto.userid === currentUser.id || currentUser.status === "Администратор"
                        ?
                          <Button onClick={() => { setOpenAlert(true); setBodyAlert("Фотография удалена!"); setTypeAlert("success"); setOpenModal(false); deletePhoto(modalPhoto.photoid) } } 
                            size="small" variant="outlined" color="error" 
                            sx={{ textTransform: 'none'}}
                          >
                            Удалить фото
                          </Button>
                        :
                          <></>
                      }
                    </Box>
                  </Box>
                </CardContent>
              </Card>
              {

                modalComments.length !== 0
                ?

                  <Box > 
                    
                      <Typography sx={{ fontSize: "18px", fontWeight: 600, padding: "10px", paddingLeft: "20px"}} variant="h6" component="div">
                        Комментарии:
                      </Typography>
                    <TransitionGroup>
                    {

                    modalComments.map( c => 
                      <CSSTransition key={c.key} timeout={500} classNames="item">
                      <PhotoComment
                        id={c.id}
                        userID={c.userID}
                        photoID={c.photoID}
                        name={c.name}
                        surname={c.surname} 
                        avatar={c.avatar}
                        body={c.body}
                        currentUser={currentUser}
                        comments={comments}
                        setComments={setComments}
                        modalComments={modalComments}
                        setModalComments={setModalComments}
                      />
                      </CSSTransition>
                    )
                    }
                   </TransitionGroup>
                  </Box>   
                    
                :
                  <></>
              }
              {  
                  modalComments.find( f => f.userID === currentUser.id) === undefined && isAuth === true && currentUser.status !== 'Администратор'
                  ?
                    <Box my={5} display="flex" flexDirection="row" justifyContent="center" alignItems="center" gap={10}
                      sx={{
                        border: 'none', width: '100%'
                      }}
                    >
                
                      <Box width="60%">

                        <TextField
                          fullWidth label="Добавить комментарий" multiline
                          rows={2} value={commentBody} onChange={e => setCommentBody(e.target.value)}
                        />

                      </Box>

                      <Button onClick={ () => { createComment(commentBody); setCommentBody('') }} size="small" variant="outlined" color="primary" sx={{ width: '20%', textTransform: 'none' }}>
                        Добавить комментарий
                      </Button>

                    </Box>  
                   
                  :
                    <></>
                    }
                </Box>
          </Modal>
          <ImageList sx={{ paddingLeft: '150px' }} variant="masonry" cols={4} gap={50}>
          <TransitionGroup>
            {
            galleryPhotos.map((item) => (
              <CSSTransition key={item.key} timeout={500} classNames="item">
              <ImageListItem onClick={ () => {setOpenModal(true); currentPhoto(item.id) }} className={cl.item} key={item.id}>
                <img
                  className={cl.image}
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                  
                />
                <div className={cl.centered}> <VisibilityIcon/> Просмотреть</div>
              </ImageListItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
          </ImageList>
        </Box>
      </>
    );
  }
  export default Photogallery;