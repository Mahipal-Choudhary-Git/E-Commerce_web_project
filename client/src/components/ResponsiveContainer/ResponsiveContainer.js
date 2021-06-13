import { createMedia } from "@artsy/fresnel";
import DesktopContainer from "./DesktopContainer";
import MobileContainer from "./MobileContainer";

export const { MediaContextProvider, Media } = createMedia({
    breakpoints: {
        mobile: 0,
        tablet: 768,
        computer: 1024,
    },
});

const ResponsiveContainer = ({ children }) => (
    <MediaContextProvider>
        <DesktopContainer>{children}</DesktopContainer>
        <MobileContainer>{children}</MobileContainer>
    </MediaContextProvider>
);

export default ResponsiveContainer;
