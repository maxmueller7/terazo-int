import React, { FC } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';

const AboutUs: FC<{}> = (): JSX.Element => {
  const useStyles = makeStyles((theme?: Theme) => ({
    card: {
      display: 'flex',
      flexFlow: 'row',
      width: '60vw',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
    img: {
      width: '30%',
      height: 'auto',
    },
    title: {
      marginBottom: '2rem',
    },
  }));

  const { card, img, title } = useStyles();

  return (
    <>
      <Typography align='center' variant='h2' className={title}>
        The Honorable Art Vandelay
      </Typography>
      <Card className={card}>
        <CardMedia
          className={img}
          component='img'
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Stanley_Anderson_2007.jpg/320px-Stanley_Anderson_2007.jpg'
          title='Art Vandelay'
        />
        <CardContent>
          <Typography variant='h6'>
            Art was born and raised in Latham, Mass. in October 23, 1939. He
            graduated from Harvard Law in 1962. He professed law for over 35
            years, and acted as a judge in high profile cases including
            Massachusetts v. Seinfeld. Through the years he developed a passion
            for architecture and latex products, and he started successful
            business ventures in both of those industries.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default AboutUs;
