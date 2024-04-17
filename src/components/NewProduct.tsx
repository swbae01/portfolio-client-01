import * as React from 'react';
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const NEW_URL = '/product';

const NewProduct = () => {
  const location = useLocation();

  let initSku = location.state ? location.state.sku : ''
  let initName = location.state ? location.state.name : ''
  let initPrice = location.state ? location.state.price : ''
  let initImg = location.state ? location.state.img : ''
  let initImgName = location.state ? location.state.imgName : ''
  
  const [sku, setSku] = useState(initSku);
  const [name, setName] = useState(initName);
  const [price, setPrice] = useState(initPrice);
  const [img, setImg] = useState(initImg);
  const [imgName, setImgName] = useState(initImgName);
  const navigate = useNavigate(); 
  const { auth }: any = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();

    if (!location?.state) {  
    const formData = new FormData();
    formData.append('file', img);
    formData.append('sku', sku);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('img', img.name);
      try {
        const response = await axios.post(NEW_URL, formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${auth?.accessToken}`
            },
            withCredentials: true
          }
        );
        console.log(JSON.stringify(response?.data));

      } catch (err) {
        console.log(err)
      } finally {
        navigate('/', { replace: true });
      }
    }
    else if (location?.state) {
      console.log("EDIT :" ,sku, name, price, img, imgName)
      try {
        await axios.delete("/product",
          {
            data: { sku:initSku, imgName:initImgName },
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${auth?.accessToken}`
            },
            withCredentials: true
          }).then((response) => {
            const formData = new FormData();
            formData.append('file', img);
            formData.append('sku', sku);
            formData.append('name', name);
            formData.append('price', price);
            formData.append('img', img.name);
            try {
              const response = axios.post(NEW_URL, formData,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${auth?.accessToken}`
                  },
                  withCredentials: true
                }
              );          
            }
            catch (err) {
              console.log(err)
            } finally {
              navigate('/', { replace: true });
            }

          
          })
      } catch (err) {
        console.log(err)
      }
    }
  }

  const onChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const formData = new FormData();

    if(e.target.files) {
      const uploadFile = e.target.files[0]
      formData.append('file',uploadFile)
      setImg(uploadFile)
    }
  }

  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Product Register
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="sku"
                name="sku"
                label="Sku"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                name="name"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="price"
                name="price"
                label="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <div>
                <input
                  accept="image/*"
                  id="img"
                  type="file"
                  onChange={onChangeImg}
                />
              </div>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default NewProduct