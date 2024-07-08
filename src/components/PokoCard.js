
import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { AspectRatio } from '@mui/joy';


export default function PokoCard({id,name,image,type}) {
  return (
    <Card sx={{ width: 200,margin:'10px' }}>
      <div>
       
        <Typography level="body-xs">{id}</Typography>
    
      </div>
      {/* <AspectRatio minHeight={"150px"} maxHeight={"200px"}> */}
        <img
        style={{width:'100px',AspectRatio:'1',margin:'auto'}}
          src={image}
        
          loading="lazy"
          alt=""
        />
      {/* </AspectRatio> */}
      <CardContent orientation="horizontal">
        <div>
        <Typography level="title-lg">{name}</Typography>
          <Typography fontSize="sm" fontWeight="sm">
           {type}
          </Typography>
        </div>
       
      </CardContent>
    </Card>
  );
}
