import { Dimmer, Loader, Message } from "semantic-ui-react";

export const renderLoader = () => {
    return (
        <Dimmer active>
            <Loader size="large">Loading</Loader>
        </Dimmer>
    );
};

export const renderError = (err) => {
    return (
        <Message color="red" size="massive">
            {err}
        </Message>
    );
};

export const statesArray = [
    "Andaman & Nicobar",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra & Nagar Haveli",
    "Daman & Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu & Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Orissa",
    "Pondicherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Tripura",
    "Uttar Pradesh",
    "Uttaranchal",
    "West Bengal",
];
