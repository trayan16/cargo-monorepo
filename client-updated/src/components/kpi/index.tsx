import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import CountUp from 'react-countup';
import { Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material';
const KPIContainer = styled.div`
    font-family: "Anton";
`;
export const KPIChart = (props: any) => {
  const { title, progress, duration, value } = props;
    return (
      <KPIContainer>
        <Card style={{"height": 200}} elevation={10}>
          <CardContent>
            <Grid marginBottom={5} container justifyContent="space-between">
              <Grid item>
                <Typography fontSize={24} className="cardHeader" color="textSecondary" gutterBottom variant="body2">
                  {title}
                </Typography>
                <Typography className="cardHeader" variant="h3">
                  <CountUp end={value} duration={duration} separator="," decimals={0} />
                </Typography>
              </Grid>
            </Grid>
            {progress ? <LinearProgress className='line-progress' color='inherit' value={40} variant="determinate" /> : null}
          </CardContent>
        </Card>
      </KPIContainer>
    );
};

KPIChart.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
};
