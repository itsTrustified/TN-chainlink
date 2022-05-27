import { Card, Container, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import { AppNewUsers, AppTotalAgreement } from 'src/sections/@dashboard/app';
import Page from "../components/Page";
import { alpha, styled } from "@mui/material/styles";
import { CodeBlock, dracula } from "react-code-blocks";


const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: "none",
    display: "flex",
    alignItems: 'center',
    justifyContent: 'start',
    padding: theme.spacing(5, 0),
    color: theme.palette.primary.main,
}));

const code = `<a href="http://trustified.network/Test1/product%201" 
target="_blank" rel="nofollow" title="trustifiednetwork"></a>
`

const IconWrapperStyle = styled("div")(({ theme }) => ({
    margin: "20px",
    display: "flex",
    borderRadius: "50%",
    alignItems: "center",
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: "center",
    marginBottom: theme.spacing(3),
    color: theme.palette.primary.main,
    backgroundImage: `linear-gradient(135deg, ${alpha(
        theme.palette.primary.main,
        0
    )} 0%, ${alpha(theme.palette.primary.dark, 0.24)} 100%)`,
}));

function ProductIntegration() {

    return (
        <Page title="Agreement |  Trustified Network">
            <Container pl={0} pr={0}>
                <Typography variant="h4" gutterBottom>
                    Product Integration
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={6}>
                        <RootStyle>
                            <IconWrapperStyle>
                                <img src="/images/npm-logo.png" />
                            </IconWrapperStyle>
                            <a
                                href="https://www.npmjs.com/package/trustified_escrow_agreement_package"
                                target="_blank"
                                rel="noreferrer"
                                style={{ textDecoration: 'none' }}
                            >
                                <Typography variant="h4" color="#000">
                                    Trustified Escrow NPM Package
                                </Typography>
                            </a>


                        </RootStyle>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <RootStyle>
                            <IconWrapperStyle>
                                <img src="/images/trustified.png" />
                            </IconWrapperStyle>

                            <div>
                                <h3>Trustified Widgets</h3>
                            <CodeBlock
                                text={code}
                                language="javascript"
                                showLineNumbers={false}
                                onCopy
                            /> 

                            </div>
                        </RootStyle>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    )
}

export default ProductIntegration