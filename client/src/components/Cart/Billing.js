import { Segment, Step, Icon } from "semantic-ui-react";

const Billing = () => {
    return (
        <Segment basic>
            <Step.Group
                attached="top"
                unstackable
                size="mini"
                style={{ marginBottom: "5vh" }}
            >
                <Step completed>
                    <Icon name="truck" />
                    <Step.Content>
                        <Step.Title>Shipping</Step.Title>
                    </Step.Content>
                </Step>
                <Step active>
                    <Icon name="credit card" />
                    <Step.Content>
                        <Step.Title>Billing</Step.Title>
                    </Step.Content>
                </Step>
                <Step disabled>
                    <Icon name="info" />
                    <Step.Content>
                        <Step.Title>Confirm Order</Step.Title>
                    </Step.Content>
                </Step>
            </Step.Group>
        </Segment>
    );
};

export default Billing;
