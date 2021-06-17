import { Button, Container, Header, Icon, Segment } from "semantic-ui-react";

const HomepageHeading = ({ mobile }) => (
    <Segment inverted vertical textAlign="center">
        <Container text>
            <Header
                as="h1"
                inverted
                style={{
                    fontSize: mobile ? "2em" : "4em",
                    fontWeight: "normal",
                    marginBottom: 0,
                    marginTop: mobile ? "1.5em" : "1em",
                }}
            >
                <Icon name="autoprefixer" />
            </Header>
            <Header
                inverted
                style={{
                    fontSize: mobile ? "2em" : "4em",
                    fontWeight: "normal",
                    marginBottom: 0,
                }}
            >
                Amazona <br />
                <h3>Expect more. Pay less</h3>
            </Header>
            <Header
                as="h2"
                content="Whatever you’ve got in mind, we’ve got inside"
                inverted
                style={{
                    fontSize: mobile ? "1.5em" : "1.7em",
                    fontWeight: "normal",
                    marginTop: mobile ? "0.5em" : "1.5em",
                    marginBottom: mobile ? "0.5em" : "1.5em",
                }}
            />
            {/* <Button
                style={{
                    marginTop: mobile ? "0.2em" : "0.5em",

                    marginBottom: mobile ? "1.5em" : "2.5em",
                }}
                primary
                size="huge"
            >
                Get Started
                <Icon name="right arrow" />
            </Button> */}
        </Container>
    </Segment>
);

export default HomepageHeading;
