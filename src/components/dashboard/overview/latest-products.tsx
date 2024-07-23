import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import type { SxProps } from '@mui/material/styles';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { DotsThreeVertical as DotsThreeVerticalIcon } from '@phosphor-icons/react/dist/ssr/DotsThreeVertical';
import dayjs from 'dayjs';

export interface Product {
  id: string;
  image: string;
  name: string;
  updatedAt: Date;
}

export interface LatestProductsProps {
  products?: Product[];
  sx?: SxProps;
}

export function LatestProducts({ products, sx }: LatestProductsProps): React.JSX.Element {
  console.log("...........",products);
  function getProductTitlesAndValues(products) {
    if (products.length === 0) return [];
    
    const titlesAndValues = [];
    
    products.forEach(product => {
      Object.entries(product).forEach(([title, value]) => {
        titlesAndValues.push({ title, value });
      });
    });
    
    return titlesAndValues;
  }
 
  const titlesAndValues = getProductTitlesAndValues(products);
  console.log(titlesAndValues);
  
  return (
    <Card sx={sx}>
      <CardHeader title="Highest Modules Sold" />
      <Divider />
      <List>
      {titlesAndValues.map((product, index) => (
        <ListItem  divider={index < titlesAndValues.length - 1} key={index}>
          <ListItemAvatar>
            <Box
              sx={{
                borderRadius: 1,
                backgroundColor: 'var(--mui-palette-neutral-200)',
                height: '48px',
                width: '48px',
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={product.title}
            primaryTypographyProps={{ variant: 'subtitle1' }}
            
          />
           <ListItemText style={{
              display: 'flex',
              justifyContent: 'center', 
              alignItems: 'center',
              backgroundColor: '#095e63',
              padding: '4px 8px', 
              borderRadius: '24px',
              textAlign: 'center',
              maxWidth: '70px',
              color: '#ffffff',
              fontSize: '30px'
            }}
            primary={product.value}
            secondaryTypographyProps={{ variant: 'body2' }}
          />
          <IconButton edge="end">
            <DotsThreeVerticalIcon />
          </IconButton>
        </ListItem>
      ))}
    </List> 
      <Divider />
    </Card>
  );
}
