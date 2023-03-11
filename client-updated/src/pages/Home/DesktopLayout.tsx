import Grid from "@mui/material/Grid";
import { BasicTable } from "../../components/BasicTable";
import { Card, Typography, CardContent, Box } from '@mui/material';
import {KPIChart} from "../../components/kpi";
import styled from "styled-components";
const VinCard = styled.div`
`
export const DesktopLayout = () => {
    const cards = [
        {
            title: 'ORDERS',
            value: 55,
            difference: 'Orders',
            duration: 1.25,
        },
        {
            title: 'TOTAL VEHICLES',
            value: 65,
            duration: 1.5,
        },
        {
            title: 'COMPLETED ORDERS',
            value: 40,
            progress: true,
            duration: 1.75,
        },
        {
            title: 'Containers',
            value: 40,
            duration: 2.25,
        },
        ];
  return (
    <>
      <Grid container spacing={4}>
        {cards.map((item, index) => {
          return (
            <Grid key={item.title + index} item lg={3} sm={6} xl={3} xs={12}>
              <KPIChart {...item} />
            </Grid>
          );
        })}
      </Grid>
      <Grid marginTop={2} container spacing={4}>
      <Grid item xs={12} lg={8}>
        <Card elevation={10}>
            <CardContent>
                <BasicTable />
            </CardContent>
        </Card>
      </Grid>
      <Grid item lg={4} sm={12} xl={4} xs={12}>
        <Card sx={{ p: 1 }} elevation={10}>
          <VinCard>
          <Typography fontSize={24} className="cardHeader" color="textSecondary" gutterBottom>Search by vin here</Typography>
          </VinCard>
          {/* <Typography fontSize={24} className="cardHeader" color="textSecondary" gutterBottom>Search by vin here</Typography>
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <div>Search form</div>
            <Box
              component="img"
              sx={{
                height: 233,
                width: 350,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
              }}
              alt="The house from the offer."
              src={vinLogo}
            />
          </div> */}

        </Card>
      </Grid>
      </Grid>
    </>      
  );
};
