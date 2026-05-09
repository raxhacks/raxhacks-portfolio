import InfoContainer from "./info-cotainer";

export default function Age() {
    const age = Date.now() - Date.parse("2003-09-28")
    return (
        <InfoContainer>
            {Math.floor(age / 1000 / 60 / 60 / 24 / 365)} y/o
        </InfoContainer>
    );
}