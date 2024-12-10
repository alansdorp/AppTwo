import { render } from "@testing-library/react";
import Root from "./AppTwo";
import React from "react";

describe("Root component", () => {
  const PubSubFunctions = {
    subscribeLib: () => {},
  };
  it("should be in the document", () => {
    const { getByText } = render(<Root PubSubFunctions={PubSubFunctions} />);
  });
});
