import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import EvStation from "@material-ui/icons/EvStation";
import Info from "@material-ui/icons/Info";
import Security from "@material-ui/icons/Security";
import Gavel from "@material-ui/icons/Gavel";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import NavPills from "components/NavPills/NavPills.jsx";

import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";
import { Timeline } from "react-twitter-widgets";
import CardBodyTweet from "../../components/Card/CardBodyTweet";
import CardWBackground from "components/Card/CardWBackground.jsx";

import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import { fetchNotices } from "utils/apiServices.jsx";

class Boards extends React.Component {
  state = {
    notices: []
  };
  componentDidMount() {
    fetchNotices().then(rep => {
      this.setState({ notices: rep });
    })
  }
  render() {
    const { classes } = this.props;
    const { notices } = this.state;
    const alerts = notices.map((notice) =>
    <SnackbarContent
      key={notice.id} message={<span>{notice.description}</span>}
      color="#FFEBCD" icon={Info}
    />
    );
    return (
      <div>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <NavPills
              color="warning"
              alignCenter
              tabs={[
                {
                  tabButton: "Avisos Generales",
                  tabIcon: Info,
                  tabContent: (
                    <Card>
                      <CardHeader>
                        <h4 className={classes.cardTitle}>Avisos Generales</h4>
                      </CardHeader>
                      <CardBody>
                        <GridContainer justify="center">{alerts}</GridContainer>
                      </CardBody>
                    </Card>
                  )
                },
                {
                  tabButton: "Policía",
                  tabIcon: Security,
                  tabContent: (
                    <CardWBackground>
                      <div style={{display:"flex", width: "95%", marginTop:"20px"}}>
                      <CardBodyTweet style={{background: "#FFEBCD",borderRadius: ".5em", boxShadow: "0 3px 5px 0 rgba(0, 0, 0, 0.14)"}}>
                        <p className="contactInfo">Emergencias llama al: <strong>911</strong></p>
                        <Timeline
                            dataSource={{
                            sourceType: 'profile',
                            screenName: 'PoliciaZapopan'
                            }}
                            options={{
                            username: 'PoliciaZapopan',
                            height: '400'
                            }}
                            />
                        </CardBodyTweet>
                        <CardBodyTweet style={{background: "#FFEBCD",borderRadius: ".5em", boxShadow: "0 3px 5px 0 rgba(0, 0, 0, 0.14)"}}>
                        <p className="contactInfo">Movilidad Jalisco: <strong>(33) 3819-2400</strong></p>
                        <Timeline
                            dataSource={{
                            sourceType: 'profile',
                            screenName: 'Trafico_ZMG'
                            }}
                            options={{
                            username: 'Trafico_ZMG',
                            height: '400'
                            }}
                            />
                      </CardBodyTweet>
                      </div>
                    </CardWBackground>
                  )
                },
                {
                  tabButton: "Servicios Públicos",
                  tabIcon: EvStation,
                  tabContent: (
                    <CardWBackground>
                      <div style={{display:"flex", width: "95%", marginTop:"20px"}}>
                      <CardBodyTweet style={{background: "#FFEBCD",borderRadius: ".5em", boxShadow: "0 3px 5px 0 rgba(0, 0, 0, 0.14)"}}>
                        <p className="contactInfo">Siapa llama al: <strong>3668-2482</strong></p>
                        <Timeline
                            dataSource={{
                            sourceType: 'profile',
                            screenName: 'siapagdl'
                            }}
                            options={{
                            username: 'siapagdl',
                            height: '400'
                            }}
                            />
                        </CardBodyTweet>
                        <CardBodyTweet style={{background: "#FFEBCD",borderRadius: ".5em", boxShadow: "0 3px 5px 0 rgba(0, 0, 0, 0.14)"}}>
                        <p className="contactInfo">CFE llama al: <strong>071</strong></p>
                        <Timeline
                            dataSource={{
                            sourceType: 'profile',
                            screenName: 'CFEmx'
                            }}
                            options={{
                            username: 'CFEmx',
                            height: '400'
                            }}
                            />
                      </CardBodyTweet>
                      </div>
                    </CardWBackground>
                  )
                },
                {
                  tabButton: "Gobierno",
                  tabIcon: Gavel,
                  tabContent: (
                    <CardWBackground>
                      <div style={{display:"flex", width: "95%", marginTop:"20px"}}>
                      <CardBodyTweet style={{background: "#FFEBCD",borderRadius: ".5em", boxShadow: "0 3px 5px 0 rgba(0, 0, 0, 0.14)"}}>
                        <p className="contactInfo">Cabecera Municipal: <strong>3818 2200</strong></p>
                        <Timeline
                            dataSource={{
                            sourceType: 'profile',
                            screenName: 'PabloLemusN'
                            }}
                            options={{
                            username: 'PabloLemusN',
                            height: '400'
                            }}
                            />
                        </CardBodyTweet>
                        <CardBodyTweet style={{background: "#FFEBCD",borderRadius: ".5em", boxShadow: "0 3px 5px 0 rgba(0, 0, 0, 0.14)"}}>
                        <p className="contactInfo">Congreso Jal: <strong>(33) 3679 1515</strong></p>
                        <Timeline
                            dataSource={{
                            sourceType: 'profile',
                            screenName: 'LegislativoJal'
                            }}
                            options={{
                            username: 'LegislativoJal',
                            height: '400'
                            }}
                            />
                      </CardBodyTweet>
                      </div>
                    </CardWBackground>
                  )
                }
              ]}
            />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Boards.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Boards);
