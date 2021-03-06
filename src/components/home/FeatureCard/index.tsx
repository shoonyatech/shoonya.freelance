import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import React from 'react'

export interface FeatureCardProps {
  title: string
  content: string
  img: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({ content, img, title }) => (
  <Grid item xs={12} sm={6} md={3}>
    <CardMedia className="h-12 w-12 my-0 mx-auto" image={img} title="icon" />
    <CardContent>
      <Typography gutterBottom align="center" variant="h5" component="h2">
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        {content}
      </Typography>
    </CardContent>
  </Grid>
)

export default FeatureCard
