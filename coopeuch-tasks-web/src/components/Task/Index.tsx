import AddIcon from "@mui/icons-material/Add";
import { Container, Fab, Grid, Tooltip, Typography } from '@mui/material';

import IndexTable from './IndexTable';

const title = 'Tareas';

const Index = () => {
    return (
        <>
            <Container maxWidth="xl">
                <Grid container item spacing={4} justifyContent={"center"}>
                    <Grid item xs={10} sm={10} md={11} lg={11} xl={11} textAlign="left">
                        <Typography variant="h1">{title}</Typography>
                    </Grid>
                    <Grid item xs={2} sm={2} md={1} lg={1} xl={1}>
                        <Tooltip title="Crear" style={{ float: "right" }}>
                            <Fab color="secondary" aria-label="add" href="/create" data-testid='create-task-btn'>
                                <AddIcon />
                            </Fab>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={12} textAlign="center">
                        <Grid item xs={12}>
                            <IndexTable />
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Index;