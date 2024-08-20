import { Container } from "./container";
import { BodyAside } from "./records/body-aside";
import { BodyMain } from "./records/body-main";

export const RecordsBody = () => {
  return (
    <Container background="bg-gray-100">
      <div className="flex w-full justify-between py-6">
        <BodyAside />
        <BodyMain />
      </div>
    </Container>
  );
};
